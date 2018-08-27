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
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events,
      aspectRatio: 2,
      height: "parent"
    });    
};


function parseEvents(events){
    const parser_events = [];

    events.map(x => {
        let event = {
            title: x.event_title,
            start: x.event_start_date,
            end: x.event_end_time,
            color:"#55bddb",
            allDay : false
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

        //console.log("day " + day + " month " + month + " year " + year + " ");

        //console.log(start_date_hour)

        const start_date = new Date(year,month,day,hour,minutes);
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
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


$(function() {
    getEvents();
});