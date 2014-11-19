/**
 * Created by j3dev on 11/17/14.
 */


var org_id = "541cfdd5965fe2d683000187";
var ac_tkn = "e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";
var vendpoint = "https://api.validic.com/v1/organizations/" + org_id + "/routine.json?access_token=" + ac_tkn;

var fetchRoutine = function(vendpoint) {
    console.log("hello");
    console.log(vendpoint);
    $.ajax({
        url: vendpoint,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log("success");
            //                setTimeout(fetchRoutine(vendpoint), 10000);
        },
        error: function (response) {
            console.log("error");
            //                setTimeout(fetchRoutine(vendpoint), 10000);
        },
        complete: function () {
            console.log("complete");
            setTimeout(function () {
                console.log(vendpoint);
                fetchRoutine(vendpoint);
            }, 10000);
        }
    });
};

fetchRoutine(vendpoint);
