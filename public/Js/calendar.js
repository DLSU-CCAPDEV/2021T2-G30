document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap',
        initialView: 'dayGridMonth',
        navLinks: true,


        navLinkDayClick: function(date, jsEvent) {
            var dateClicked = new Date(date);
            var month = dateClicked.toLocaleString('default', { month: 'long' });
            var day = dateClicked.getDate();
            var year = dateClicked.getFullYear();
            var dateString = "Entries from " + month + " "  + day + ", " + year;
            
            $.get('/getEntries', {date: dateClicked}, function(result) {
                document.querySelector('.modal-title').innerHTML = dateString;
                if(result) {
                    //console.log(result);
                    $('#entryfield').append(result);
                    $('#dateEntry').modal("show");
                    
                } else { //no entries returned
                    document.querySelector('.modal-body').innerHTML = "You do not have entries for this day.";
                    $('#dateEntry').modal("show");
                }                    
            });
            
        }

        
    });
    calendar.render();
});

$(document).ready(function (){
    $(".modal").on("hidden.bs.modal", function(){
        $(".modal-body").html("");
    });
});

// $(document).ready(function() {
//     var calendar = $('#calendar').fullCalendar({
//         themeSystem: 'bootstrap',
//         headerToolBar: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,dayGridWeek,timeGridDay'
//         },
//         initialView: 'dayGridMonth',
//         navLinks: true,

//         dateClick: function(info) {
//             var d = new Date(info.dateStr);
//             // alert('Clicked on: ' + info.dateStr);
//             // alert('Datatype: ' + typeof(info.dateStr));
            
//             // alert('Date: ' + d);
//             // alert('Date: ' + typeof(d));
//             // change the day's background color just for fun
//             $(this).css('cursor', 'pointer');
//             info.dayEl.style.backgroundColor = 'red';
//         },
//         navLinkDayClick: function(date, jsEvent) {
//             alert('day: ' +  date);
//             alert('coords: ' +  jsEvent.pageX, jsEvent.pageY);
//         }
//     });
// });