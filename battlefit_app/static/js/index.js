$(document).ready(function () {

//      //this is for making the edit profile image as the upload button
    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });


    var vendpoint = "https://api.validic.com/v1/organizations/51aca5a06dedda916400002b/weight.json?access_token=ENTERPRISE_KEY&start_date=2014-04-01";
//Enterprise bulk data: Weight
    var user_ids = [];
    var user_data = [];
    var user_pk = $('#user_pk').html();
    var user_key = ["", "538c9054f1f70eb3a3000006", "526bafa36dedda5bff000001", "5427156884626bc6b3000001", "53611913f1f70ef82c0000e7", "53fcf61484626bf9d8000006"];
    $('.import_userData').on('click', function() {
            $.ajax({
            url: vendpoint,
            type: "GET",
            dataType: "json",
            success: function(data){
//                user_id = data.weight[user_pk].user_id;
//        user_id = user_key[user_pk];
                user_id = data.weight[0].user_id;
            console.log(data.weight[0].user_id);
                get_user_calories_consume(user_id);
                get_user_calories_burned(user_id);
                get_user_body_fat(user_id);
            }
        });

        function get_user_calories_consume(user_id) {
            //get calories consumed data of specific user
            //Nutrition
            $.ajax({
                url: "https://api.validic.com/v1/organizations/51aca5a06dedda916400002b/users/" + user_id + "/nutrition.json?access_token=ENTERPRISE_KEY&start_date=2014-04-01",
                type: "GET",
                dataType: "json",
                success: function(data){
                    var calories_consume = [];
                    for (i=0; i<data.nutrition.length; i++) {
                        calories_consume.push({
                            activity_type: "meal",
                            activity_title: data.nutrition[i].meal,
                            calories_consumed: data.nutrition[i].calories,
                            date: data.nutrition[i].last_updated
                        })
                    }
                    saveit(calories_consume);
                }
            });
            function saveit(calories_consume){
                a = JSON.stringify(calories_consume);
                    $.ajax({
                        url: '/new_calories_consume/',
                        type: 'POST',
                        dataType: 'json',
                        data: a,
                        success: function (data) {
                            console.log(data)
                        },
                        error: function (data) {
                            console.log(data)
                        }
                    });
            }
        }
        function get_user_calories_burned(user_id) {
            //get calories burned data of specific user
            var calories_burned = [];
            $.ajax({
                url: "https://api.validic.com/v1/organizations/51aca5a06dedda916400002b/users/" + user_id + "/fitness.json?access_token=ENTERPRISE_KEY&start_date=2014-04-01",
                type: "GET",
                dataType: "json",
                success: function(data){
                    for (i=0; i<data.fitness.length; i++) {
    //                    console.log("source_name: " + data.fitness[i].source_name + " ,calories: " + data.fitness[i].calories);
                        calories_burned.push({
                            activity_type: "exercise",
                            activity_title: data.fitness[i].source_name,
                            calories_burned: data.fitness[i].calories,
                            date: data.fitness[i].last_updated
                        })
                    }
                    saveit(calories_burned);
                }
            });
            function saveit(calories_burned){
                a = JSON.stringify(calories_burned);
                    $.ajax({
                        url: '/new_calories_burned/',
                        type: 'POST',
                        dataType: 'json',
                        data: a,
                        success: function (data) {
                            console.log(data)
                        },
                        error: function (data) {
                            console.log(data)
                        }
                    });
            }
        }

        function get_user_body_fat(user_id) {
            //get body fat data of specific user
            //get a random body_fat from 15 ~ 30
            var body_fat = Math.floor(Math.random() * 300 + 150)*0.001;
            saveit(body_fat);
            function saveit(body_fat){
                a = JSON.stringify(body_fat);
                    $.ajax({
                        url: '/new_body_fat/',
                        type: 'POST',
                        dataType: 'json',
                        data: a,
                        success: function (data) {
                            console.log(data)
                        },
                        error: function (data) {
                            console.log(data)
                        }
                    });
            }
        }

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