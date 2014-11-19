var org_id = "541cfdd5965fe2d683000187";
var ac_tkn = "e6404d1cbaa268dcc4c53fac190f97be831d9d987af97aeeab6561702aa65033";
var usrProvEndpt = "https://api.validic.com/v1/organizations/" + org_id + "/users.json";

$(document).ready(function () {

    var userAppDBID;

    $('#btn_reg').on('click', function() {
        $.ajax({
            url: '/validic_register/',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                userAppDBID = response['uid'];
                getValidicAccess(userAppDBID);

            }
        });

        //send validic an userid to generate access_token and an id
        //User Provisioning
        function getValidicAccess(uID){
            var data = {"user": {"uid": uID},"access_token": ac_tkn};
            $.ajax({
                url: usrProvEndpt,
                type: "POST",
                data: data,
                dataType: "json",
                success: function(response){
                    console.log(response);
                    var user_access_key = response.user.access_token;
                    //send response to django to save access_token
                    saveUserValidicInfo(response, user_access_key);
                },
                error: function(response){
                    console.log(response);
                }
            });
        }

        function saveUserValidicInfo(repsonseObj, uak){
            var userInfo = JSON.stringify(repsonseObj);
            $.ajax({
                url: '/validic_save_info/',
                type: 'POST',
                data: userInfo,
                dataType: "text",
                success: function(response){
                    //store access_token to postgres, build endpoint to app marketplace

                    var appmrketplace = "https://app.validic.com/" + org_id + "/" + uak;
                    window.open(appmrketplace);
                    console.log(response);
                },
                error: function(response){
                    console.log(response);
                }
            })
        }
    });
});