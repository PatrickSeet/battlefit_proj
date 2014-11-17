$(document).ready(function () {

//      //this is for making the edit profile image as the upload button
    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });

    var jeff_id = "5469261984626bf36100024d";
    var julian_id = "5469267684626b2fe00002a5";
    var pat_id = "546929a284626bf361000253";
    var org_id = "541cfdd5965fe2d683000187";

    var ac_tkn = "e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";
    var vendpoint = "https://api.validic.com/v1/organizations/" + org_id + "/users.json";

    //OrgEndPoint retrieve all users in org, from routine object
    var orgEndPoint = "https://api.validic.com/v1/organizations/541cfdd5965fe2d683000187/routine.json?access_token=e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";


    //For Jeff, no views needed, just match up the button id on click, match up the table or div id where u want to populate it
    //retrieve our data from Validic based on Organizaion ID
    $('.import_test').on('click', function() {
            $.ajax({
            url: orgEndPoint,
            type: "GET",
            dataType: "json",
            success: function(response){
                var result = response.routine;
                for( var i=0;i<result.length;i++){

                    //$('#calories_burned').append("<tr><td>" + result[i].source_name + " " + result[i].calories_burned + "</td></tr>");
                    if (result[i].user_id == pat_id){
                        console.log("Pat: steps taken: " + result[i].steps + " Device: " + result[i].source_name + " Calories burned: " + result[i].calories_burned)
                    }
                    else if (result[i].user_id == julian_id){
                        console.log("Julian: steps taken: " + result[i].steps + " Device: " + result[i].source_name + " Calories burned: " + result[i].calories_burned)
                    }
                    else if (result[i].user_id == jeff_id){
                        console.log("Jeff: steps taken: " + result[i].steps + " Device: " + result[i].source_name + " Calories burned: " + result[i].calories_burned)
                    }

                }
            }
        });

    });



    $("#show_weight_loss").hide();
    $("#show_fitness").hide();
    $('input[type="radio"]').click(function(){
        if($(this).attr("value")=="show_health"){
            $("#show_weight_loss").hide();
            $("#show_fitness").hide();
            $("#show_health").show();
        }
        if($(this).attr("value")=="show_weight_loss"){
            $("#show_health").hide();
            $("#show_fitness").hide();
            $("#show_weight_loss").show();
        }
        if($(this).attr("value")=="show_fitness"){
            $("#show_weight_loss").hide();
            $("#show_health").hide();
            $("#show_fitness").show();
        }
    });


});