//$(document).ready(function () {
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
//
////    var user_id = "jeff = 4, julian = 3, pat = 541cfbfd965fe2e60500017e";
////    var data = {"user": {"uid": 2},"access_token": ac_tkn};
////    var data = {"uid": "541cfbfd965fe2e60500017e","access_token": ac_tkn};
//
////    $('.import_test').on('click', function() {
////            $.ajax({
////            url: vendpoint,
////            type: "POST",
////            data: data,
////            dataType: "json",
////            success: function(response){
////                console.log(response);
////            }
////        });
//
//    $('.import_test').on('click', function() {
//            $.ajax({
//            url: orgEndPoint,
//            type: "GET",
//            dataType: "json",
//            success: function(response){
//                console.log(response);
//            }
//        });
//
//    });
//    $("#show_weight_loss").hide();
//    $("#show_fitness").hide();
//    $('input[type="radio"]').click(function(){
//        if($(this).attr("value")=="show_health"){
//            $("#show_weight_loss").hide();
//            $("#show_fitness").hide();
//            $("#show_health").show();
//        }
//        if($(this).attr("value")=="show_weight_loss"){
//            $("#show_health").hide();
//            $("#show_fitness").hide();
//            $("#show_weight_loss").show();
//        }
//        if($(this).attr("value")=="show_fitness"){
//            $("#show_weight_loss").hide();
//            $("#show_health").hide();
//            $("#show_fitness").show();
//        }
//    });
//
//
//});