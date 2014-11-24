$(document).ready(function () {

//      //this is for making the edit profile image as the upload button
    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });

    // hehe
    var jeffEndPoint = "https://api.validic.com/v1/fitness.json?authentication_token=5n7T9btWJ_kCbDxA9jsc";
    var patEndPoint = "https://api.validic.com/v1/routine.json?authentication_token=yrgxx6nKXmpR2jmPyHiQ";
    var julEndPoint = "https://api.validic.com/v1/routine.json?authentication_token=qLm2maaWbR5ghzMtUxFz";


    $('.import_test').on('click', function() {
        // I think from the demo we saw that you need to clear out $('#calories_burned) everytime this button is clicked
        // before adding more results
        
        // This ajax block could also be put into a function that you call with each person's name and endpoint for reusability
        $.ajax({
            url: patEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var result = response.routine[0];
                $('#calories_burned').append("<tr><td>Pat</td>" + "<td align='center' valign='middle'><span id='device'>" + result.source_name + "</span></td><td><span id='calories'>" + result.calories_burned + "</span></td></tr>")
            }

        });

        $.ajax({
            url: julEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var result = response.routine[0];
                $('#calories_burned').append("<tr><td>Julian</td>" + "<td align='center' valign='middle'><span id='device'>" + result.source_name + "</span></td><td><span id='calories'>" + result.calories_burned + "</span></td></tr>")
            }
        });

        $.ajax({
            url: jeffEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var new_calories = parseInt(response.fitness[0].calories);
                $('#calories_burned').append("<tr><td>Jeff</td>" + "<td align='center' valign='middle'><span id='device'>" + response.fitness[0].source_name + "</span></td><td><span id='calories'>" + new_calories + "</span></td></tr>")
            }
        });
        //generate ajax
        //could be different endpoint
    });

    $("#show_fitness").show();
});
