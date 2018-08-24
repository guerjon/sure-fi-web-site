'use strict';

const events_url = "http://admin.sure-fi.com/api/get_upcoming_events";

function getEvents(){
    console.log("getting events")
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
            let events = result.data;
            
            appendEvents(events)    
            $("#events").show();
        }else{
            $("#events").hide();
        }

    }).catch(error => {
        console.error(error)
    })
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
        
        const day = start_date_date[2]
        const month = start_date_date[1] - 1
        const year = start_date_date[0]
        const hour = start_date_hour[0]
        const minutes = start_date_hour[1]
 
        console.log("day " + day + " month " + month + " year " + year + " ");

        console.log(start_date_hour)

        const start_date = new Date(year,month,day,hour,minutes);
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
        const end_date = new Date(event.event_end_date);

        container.append(
            '<div class="row" style="margin-bottom:20px;">' + 
                '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                    '<div class="event-date"> ' +
                        '<div class="event-stick">' +
                        '</div>' +
                        '<div style="width:50px;">' +
                            '<h1> '+ start_date.getDate() + '</h1>' +
                            '<h5>'+ months[start_date.getMonth()].substring(0,3) + '</h5>' +
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