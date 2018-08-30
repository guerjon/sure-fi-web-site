'use strict';

const events_url = "http://admin.sure-fi.com/api/get_upcoming_events";
let events = null;
const ALL = "all";
const CONVENTIONS = "conventions";
const WEBINAR = "webinar";
const PRESENTATIONS = "presentations";

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
            console.log("events",events)
            updateEvents(events)
            showList()
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
    if(event.id == null || event.id == undefined){
        let results = events.filter(x => x.event_id == event);
        let parse_events = parseEvents(results)
        event = parse_events[0]
        event.start = moment(event.start)
        event.end = moment(event.end)    
    }    

    const modal = $("#modal");
    
    try{
        $(".modal-title").text(event.title)
        $(".description").text(event.description)
        if(event.event_url){
            $(".url").attr("href",event.event_url)
            if(event.type == "webinar"){
                $(".url").text("Join now")
                $(".time").text(event.start.format('MMMM Do , h:mm a') + " - " + event.end.format("h:mm a"))
            }else if(event.type == "presentation" || event.type == "convention"){
                $(".url").text("See Event Website");
                $(".time").append("<p>From : " + event.start.format("MM-DD-YYYY") + "<br>  To : " + event.end.format("MM-DD-YYYY") + "</p>")
            }
            
        }
        if(event.event_location){
            $(".location").text(event.location)
        }

        if(event.event_logo){

            $(".img-event").attr("src", event.event_logo);
            //$(".img-event").attr("src", "images/" + event.type + ".png");
            //$(".img-event").attr("src", "images/" + event.type + ".png");
        }

        
        modal.modal()

    }catch(e){
        console.log(e)
    }
}

function eventRender(event,element){
    element.find(".fc-content").empty();
    element.find(".fc-content").addClass("fc-title-personalize")
    let logo = ""
    
    if(event.event_logo){
        console.log("event.log",event.event_logo)
        logo = ("<div class='image-in-calendar'>" +
                    "<div style='width:100%;'>" +
                        "<img class='responsive' src='" + event.event_logo + "'/>" +
                    "</div>" +
                "</div>")
    }

    element.find('.fc-content').append(
        "<div> "+
            logo + 
            "<div class='event-type'>" + 
                event.type.toUpperCase() + 
            "</div>" +
        "</div>" 
    ); 
    
}


function appendEventsOnCalendar(events){
    var today = getToday();
    let parser_events = parseEvents(events)
    
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
        events: parser_events,
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
            description : x.event_description,
            event_url: x.event_url,
            type: x.event_type,
            event_logo: x.event_logo
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

function parseHour(time){
        const split_start_date = time.split(" ");
        const start_date_date = split_start_date[0].split("-").map(x => parseInt(x));
        const start_date_hour = split_start_date[1].split(":").map(x => parseInt(x));
        
        let day = start_date_date[2]
        const month = start_date_date[1] - 1
        const year = start_date_date[0]
        const hour = start_date_hour[0]
        let minutes = start_date_hour[1]

        if(day < 10){
            day = "0" + day;
        }

        if(minutes < 10){
            minutes = "0" + minutes
        }

    return {
        minutes : minutes,
        hour: hour,
        day: day,
        month: month,
        year: year,
    }

}

function appendEvents(events){
    var container = $('.event');

    container.empty();
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
        

        const start_date =  moment(event.event_start_date) ;
        
        const end_date = moment(event.event_end_time);

        var click = "eventClick(" + event.event_id + ")";
        var date = start_date.format("h:mm a ") + " - " + end_date.format("h:mm a");

        if(event.event_type == "convention" || event.event_type == "presentation"){
            date = "From: " + start_date.format("MM/DD/YYYY") + "<br>  To: " + end_date.format("MM/DD/YYYY");
        }

        container.append(
            '<a onClick="' + click + '" class="simple-button">' +
                '<div class="row" style="margin-bottom:20px;">' + 
                    '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-1">' +
                        '<div class="event-date"> ' +
                            '<div class="event-stick">' +
                            '</div>' +
                            '<div style="width:200px;">' +
                                '<h1> '+ event.event_start_date.split(" ")[0].split("-")[2] + '</h1>' +
                                '<h5>'+ months[start_date.format("M") - 1].substring(0,3) + '</h5>' +
                                "<small>" + 
                            '</div>' + 
                        '</div>' + 
                    '</div>' +
                    '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">' + 
                        '<div>' + 
                            '<h4>' + event.event_title + '</h4>' + 
                            '<h6>Time : ' + date + '</h6>' +
                            '<div>' +
                                '<div>' +
                                    '<p>' +
                                        event.event_description +
                                    '</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'+
                '</div>' +
            '</a>'
        );
    }
}


function filterByType(events,type){
    
    let filter_events = events;
    if(type != "all") {
        filter_events = filter_events.filter(x => x.event_type == type)
    }

    updateEvents(filter_events);

}


function filterEventsByStatus(events){
    let events_actived_status = 1;
    let filter_events = events.filter(x => parseInt(x.event_status) == events_actived_status);

    return filter_events;

}

function updateEvents(events){
    if(events.length > 0){
        $("#calendar-list-buttons-container").show()
        $("#no-results-container").hide();
    }else{
        $("#calendar-list-buttons-container").hide()
        $("#no-results-container").show();
    }
    const website_location =  window.location.href;
    const production_url = "http://sure-fi.com/events.html";
    if(website_location === production_url){
        events = filterEventsByStatus(events);
    }

    appendEvents(events);
    appendEventsOnCalendar(events);

}


$(function() {
    $(".event-link").click(function(data,event) {
        const type = $(this).attr("type")
        $(".event-type-active").removeClass("event-type-active");
        $("#" + type).addClass("event-type-active");     
        filterByType(events,type)
    });
        

    getEvents();
});