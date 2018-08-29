'use strict';

const events_url = "http://admin.sure-fi.com/api/get_upcoming_events";
let events = null;

function getEvents(){

    let data = {
        method : "POST",
        headers :{
        'Accept': 'application/json',
        },
    }
    
    fetch(events_url ,data)
    .then(response => response.text())
    .then(contents =>  {
        let result = JSON.parse(contents)
        
        if(result.status == 200){
            events = result.data;
            
            appendEvents(events);
            appendEventsOnCalendar(events);
            showList(events)

        }else{
            $("#events").hide();
        }

    }).catch(error => {
        console.error(error)
    })
}

function getToday(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if(month < 10){
        month = "0" + month;
    }

    if(day < 10){
        day = "0" + day;
    }

    return year + "-" + month + "-" + day

}

function eventClick(event,jsEvent,view){
    const modal = $("#modal");
    
    $(".modal-title").text(event.title)
    $(".description").text(event.description)
    $(".time").text(event.start.format('MMMM Do , h:mm:ss a'))
    modal.modal()

}

function eventRender(event,element){
    element.find('.fc-title').append("<div style='word-break: break-all;width:100px;'>" + event.description + "</div>" ); 
    element.height(100)
}


function appendEventsOnCalendar(events){
    var today = getToday();
    events = parseEvents(events)

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultDate: today,
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: false, // allow "more" link when too many events
        events: events,
        height: "parent",
        eventClick: eventClick,
        eventRender: eventRender
    });    
};



/*
*
*
event_description: String
event_end_time :  String "2018-10-10 13:00:00"
event_id : "7"
event_location : null
event_start_date:"2018-10-10 13:00:00"
event_title:"Sure-Fi Webinar Oct 10 - HVAC"
*/
function parseEvents(events){
    const parser_events = [];
    events.map(x => {
        let event = {
            title: x.event_title,
            start: x.event_start_date,
            end: x.event_end_time,
            color:"#FFFFFF",
            allDay : false,
            id: x.event_id,
            description : x.event_description
        }
        parser_events.push(event);
    });

    return parser_events;
}

function showCalendar(){
    $("#show-list-button").addClass("button-unactivated");
    $("#show-calendar-button").removeClass("button-unactivated");
    $("#calendar").show();
    $(".event").hide();
}

function showList(){
    $("#show-list-button").removeClass("button-unactivated");
    $("#show-calendar-button").addClass("button-unactivated");

    $(".event").show();
    $("#calendar").hide();
}


function appendEvents(events){
    var container = $('.event');
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    for(let i = events.length; i--;){
        const event =  events[i]
        
        const split_start_date = event.event_start_date.split(" ");
        
        const start_date_date = split_start_date[0].split("-").map(x => parseInt(x));
        const start_date_hour = split_start_date[1].split(":").map(x => parseInt(x));
        
        let day = start_date_date[2]
        const month = start_date_date[1] - 1
        const year = start_date_date[0]
        const hour = start_date_hour[0]
        const minutes = start_date_hour[1]

        if(day < 10){
            day = "0" + day;
        }

        const start_date = new Date(year,month,day,hour,minutes);
        const end_date = new Date(event.event_end_date);

        
        container.append(
            '<div class="row" style="margin-bottom:20px;">' + 
                '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-1">' +
                    '<div class="event-date"> ' +
                        '<div class="event-stick">' +
                        '</div>' +
                        '<div style="width:50px;">' +
                            '<h1> '+ day + '</h1>' +
                            '<h5>'+ months[start_date.getMonth()].substring(0,3) + '</h5>' +
                            "<small>" + 
                        '</div>' + 
                    '</div>' + 
                '</div>' +
                '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">' + 
                    '<div>' + 
                        '<h4>' + event.event_title + '</h4>' + 
                        '<div>' +
                            '<div>' +
                                '<p>' +
                                    event.event_description +
                                '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'+
            '</div>'
        );
    }
}


function hideOrShowSection(){
    var w = window.innerWidth;
   
    if(w < 780){
        $(".hidden-sm").hide();
    }else{
        $(".hidden-sm").show();
    }

}


$(function() {
    $( window ).resize(function() {
        hideOrShowSection()

    });

    hideOrShowSection();
    getEvents();
});