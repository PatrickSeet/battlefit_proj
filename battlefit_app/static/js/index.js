$(document).ready(function () {

//      //this is for making the edit profile image as the upload button
    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });

    var jeffEndPoint = "https://api.validic.com/v1/fitness.json?authentication_token=5n7T9btWJ_kCbDxA9jsc";
    var patEndPoint = "https://api.validic.com/v1/routine.json?authentication_token=yrgxx6nKXmpR2jmPyHiQ";
    var julEndPoint = "https://api.validic.com/v1/routine.json?authentication_token=qLm2maaWbR5ghzMtUxFz";

    var calorieArray = {"2":'', "3":'', "4":''};
    var idArray = {"resultPat":'2', "resultJul":'3', "resultJeff":'4'};

        $.ajax({
            url: patEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var resultPat = response.routine[0];
                resultPat.push(calorieArray);
                $('#calories_burned').append("<tr><td>Pat</td>" + "<td align='center' valign='middle'><span id='device'>" + resultPat.source_name + "</span></td><td><span id='calories'>" + resultPat.calories_burned + "</span></td></tr>")
            }

        });

        $.ajax({
            url: julEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var resultJul = response.routine[0];
                resultJul.push(calorieArray);
                $('#calories_burned').append("<tr><td>Julian</td>" + "<td align='center' valign='middle'><span id='device'>" + resultJul.source_name + "</span></td><td><span id='calories'>" + resultJul.calories_burned + "</span></td></tr>")
            }
        });

        $.ajax({
        url: jeffEndPoint,
        type: "GET",
        dataType: "json",
        success: function(response){
                   var resultJeff = parseInt(response.fitness[0].calories);
                   resultJeff.push(calorieArray);
                   $('#calories_burned').append("<tr><td>Jeff</td>" + "<td align='center' valign='middle'><span id='device'>" + response.fitness[0].source_name + "</span></td><td><span id='calories'>" + resultJeff + "</span></td></tr>")

            }
        });

        pat = 2;
        Julian = 3;
        Jeff = 4;

        calorieArray.sort();

        var notifyMember = function (calorieArray, data) {
            console.log(length(calorieArray));
            if (idArray[2] === data){

            }  else {

            }
            for (var i = 0; i < length(memberArray); i++) {
                ;
            }
            memberArray = [];
        };
        setTimeout((notifyMember), 10000);
    });

    $('.import_test').on('click', function() {

        e.preventDefault();
        $.ajax({
            url: '/user_dashboard/',
            data: ['id'],
            type: 'GET',
            success: function(data) {
                initialize(data);
            },
            error: function(error) {
                console.log("Error message from python view: " + error);
            }
    });

    $("#show_fitness").show();
});



// Here is the old JS we were using
// just in case we need it:


//$(document).ready(function () {
//
////      //this is for making the edit profile image as the upload button
//    $("#upfile1").click(function () {
//        $("#file1").trigger('click');
//    });
//
//    var jeff_id = "5469261984626bf36100024d";
//    var julian_id = "5469267684626b2fe00002a5";
//    var pat_id = "546929a284626bf361000253";
//    var org_id = "541cfdd5965fe2d683000187";
//
//    var ac_tkn = "e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";
//    var vendpoint = "https://api.validic.com/v1/organizations/" + org_id + "/users.json";
//
//    //OrgEndPoint retrieve all users in org, from routine object
//    var orgEndPoint = "https://api.validic.com/v1/organizations/541cfdd5965fe2d683000187/routine.json?access_token=e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";
//    var jeffEndPoint = "https://api.validic.com/v1/fitness.json?authentication_token=5n7T9btWJ_kCbDxA9jsc";
//
//
//    //For Jeff, no views needed, just match up the button id on click, match up the table or div id where u want to populate it
//    //retrieve our data from Validic based on Organizaion ID
//    $('.import_test').on('click', function() {
//            $.ajax({
//            url: orgEndPoint,
//            type: "GET",
//            dataType: "json",
//            success: function(response){
//                var result = response.routine;
//                for( var i=0;i<result.length;i++){
//
////                    $('#calories_burned').append("<tr><td>" + " " + result[i].user_id + " " + result[i].source_name + " " + result[i].calories_burned + "</td></tr>");
//                    if (result[i].user_id == pat_id){
//                        $('#calories_burned').append("<tr><td>Pat</td>" + "<td align='center' valign='middle'><span id='device'>" + result[i].source_name + "</span></td><td><span id='calories'>" + result[i].calories_burned + "</span></td></tr>")
//                    }
//                    else if (result[i].user_id == julian_id){
//                        $('#calories_burned').append("<tr><td>Julian</td>" + "<td align='center' valign='middle'><span id='device'>" + result[i].source_name + "</span></td><td><span id='calories'>" + result[i].calories_burned + "</span></td></tr>")
//                    }
////                    else if (result[i].user_id == jeff_id){
////                        $('#calories_burned').append("<tr><td>Jeff</td>"  + "<td align='center' valign='middle'><span id='device'>" + result[i].source_name + "</span></td><td><span id='calories'>" + result[i].calories_burned + "</span></td></tr>")
////                    }
//
//                }
//            }
//        });
//
//            $.ajax({
//            url: jeffEndPoint,
//            type: "GET",
//            dataType: "json",
//            success: function(response){
//                       var new_calories = parseInt(response.fitness[0].calories);
//                        $('#calories_burned').append("<tr><td>Jeff</td>" + "<td align='center' valign='middle'><span id='device'>" + response.fitness[0].source_name + "</span></td><td><span id='calories'>" + new_calories + "</span></td></tr>")
//
//                }
//            });
//
//
//    });
//
//    $("#show_fitness").show();
//
//});