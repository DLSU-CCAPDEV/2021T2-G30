$(document).ready(function () {

    $('#searchbtn').click(function () {
        var searchfield = $('#SearchTitle').val();
        if(searchfield !== ""){
            $('#searchForm').submit();
        }
    });    
});