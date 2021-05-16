$(document).ready(function () {


    $('#searchbtn').click(function () {

        var searchfield = $('#SearchTitle').val();
        if(searchfield ===""){
            alert(searchfield);
        }
        else{

            $('#searchForm').submit();
        }
            
        
    });    
        
});