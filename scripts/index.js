(function () {
    var global = {};

    window.googleapisService = function () {
        var pHeader = { "alg": "RS256", "typ": "JWT" };
        var sHeader = JSON.stringify(pHeader);

        var pClaim = {};
        pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
        pClaim.iss = "1075942469255-rahtil667s666gbdkg3d24ndp749eojc@developer.gserviceaccount.com";
        pClaim.sub = "mdavis@mrpkedu.org";
        pClaim.scope = "https://www.googleapis.com/auth/script.send_mail https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/spreadsheets";
        pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
        pClaim.iat = KJUR.jws.IntDate.get("now");

        var sClaim = JSON.stringify(pClaim);

        var key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDy/+mtpc7mW8rJ\ngCbUs1g/r2JtAUweXjIuDBvUwPfzyMC3pT4PRvTVZ3jkv2qAM2eRVd8FyF4F6IAp\nWOfiUytcTSHnx0bgU1e3k8JqdyvKufRGgWOypkrtCdH9hntHGOkt0JojyfpWoJ4s\n84MygrCD5xBb7D7Sw5wjugmCjhg3UWnM6JRHdxlcInWm8+0zLBMPlzNPGvkhKvkf\nm+KENIXAo4aCvd7s7OWLEUdEfm2kla4Cj8VOs775a40IuRlYCZWIvJHYJpxmR/tY\nTJGKdKQ/wsEhfZlRRaa5ehAUTQLOBaZHUjamPm8012eh/zQNBVy6ePwnWXlvCUyb\nXO9ME0eTAgMBAAECggEAEEu/NQj4jhQ7zjWM5Ri94090r1C19RdmEBZ5y1PBjRS6\nb9ZiCg49Hw6YWebIUp6f5Gw4z593Rrgn2B4BNvlS4BbAHlYL18FfEY2ULSWexzKf\nQhctQ27JeYn+Dh11qPfvs0XZAGtsIWEWGneeJcYD5mSZgUCfmezKTM8OEjZLQ3JN\nymQURnHNCcNBMfCKxfZOQTLOfbrfaTnPd08y3bclTk7muHjvMpaVz9F59n7Dng3U\n/PQ8YvggnwiiX2UNMJ9qwhyYuFJ1YMKgiK+hDOtYIxgINVkMt0CadFfE9hHxCgWT\nFpznssMpdH2mJhaO+deP+KsQFJXIldUMEvuEU3Ob0QKBgQD/2k4u1rgO7zuGdHe5\nQ94CZ9laFyOLT9JC/zNUH71WqHPquXV3OGmkO7EWCX57X9R7E7OnJp6QlLRX0Mq6\nxRI/AXwfLQ3aV6ymeo7l4wjPo2vnrN26XsvCExEo0ReDnUhkTpCL1TZpsxp8Syvf\ndlMcdlJ1S5tL0/SPc3ejPEAXWQKBgQDzI7a5Z04+lTFRzL2/pHOfVWAWWQe67rDM\n5QPVzzvFDoE2Ws5z9wtqaN8goaYQKQ+KQl/a3kCoeMvcvPHjdO7erm6XE/2wr7hw\nOXjWM4r9asKmHe+5pp5fnV5I1llfCiSzIvyYmrGvb7u3km4mX+lsOuMXGdfbCFFD\nlyxXevJkywKBgDaru1Ee6K2oSRvt/zdDXUk+T5+Emj/GirNuPNWZAqhlzn81qfgT\nwd8qMij3VmOekpTKHPV2tyNF41NwdiF6wu9brd4rjm49ldLtFWPiI5va28/hjG+q\nmfeag2wpYdDp5vIoJ5L5uGrVrq8okPNrIU9PqUcPJNwLKpMMpV/oG/nhAoGAfURI\nLwuHZ3zsNQ28MRFkNJIC+GCUN/4j/tx69lxXmfYYIk30khCUxBUV6DUAXtEY3Y3G\n3vek7meV+LssEJk9PGM4PQQirzZJWyBxHkLd+CRZ9sXzrX2nmPF2EybEUs/iCp0a\n8PC6XP2/BBwgPgsqMwW/3DYHXSTS4XTwdn20hrMCgYAtCYOjVYzOSW6MF3EpDi3s\nNNyyV/GZOZHu8+4X3s72zIdkkp729IgB2Iprh80fY18TTvxcak1vU7m71ZRrCYgc\n2Cd4l6/+U0BePyElB0hfP/2E1aF7+ZqIfuIk/kW5cpalFgqts0cwQ/dOPWuCXf3i\nJ6ciiLsr65DnFz0Es3NnXw\u003d\u003d\n-----END PRIVATE KEY-----\n";

        var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);

        var XHR = new XMLHttpRequest();
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];

        urlEncodedDataPairs.push(encodeURIComponent("grant_type") + '=' + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer"));
        urlEncodedDataPairs.push(encodeURIComponent("assertion") + '=' + encodeURIComponent(sJWS));
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        XHR.addEventListener('load', function (event) {
            var response = JSON.parse(XHR.responseText);
            global['oauth-token'] = response["access_token"];

            gapi.auth.authorize({
                client_id: '1075942469255-2tlk0uhhpemjl4g4mstj789pu7f2ql9u.apps.googleusercontent.com',
                scope: "https://www.googleapis.com/auth/script.send_mail https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/spreadsheets",
                immediate: true
            }, buildObjects);
        });

        XHR.addEventListener('error', function (event) {
            console.log('Oops! Something went wrong.');
        });

        XHR.open('POST', 'https://www.googleapis.com/oauth2/v3/token');
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData);
    };

    window.buildObjects = function () {
        var container = '<div id="container" class="ui-widget-header" style="text-align: center; display: none; font-size: 12px; border: 1px solid rgb(128, 128, 128);">';
        container += '<h5> </h5>';
        container += '<div style="margin: 5%;"><center>';
        container += '<img style="display: block; margin-top: 8px;" class="ui-corner-all ui-widget-content ui-widget" src="images/gears-animation1.gif"></center>';
        container += '<p>Please wait while we process your request.</p>';
        container += '<div style="text-align: center">';
        container += '<button id="close-container" class="ui-button ui-state-default ui-corner-all" style="display: none;">Close</button>';
        container += '</div></div></div>';
        var growl = '<div class="growlUI" style="display: none; cursor: default;"></div>';

        $("body").append(container);
        $("body").append(growl);
    }

    window.postFormData = function (data, callback) {
        var scriptId = 'MX4ev5IFFXUd7DRHOn8f7c2uZymsaB7IG';
        var payload = {
            'function': data.function,
            'parameters': data.payload,
            'devMode': true
        };

        var req = gapi.client.request({
            'root': 'https://script.googleapis.com/',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'headers': { Authorization: 'Bearer ' + global['oauth-token'] },
            'body': payload
        });

        req.execute(function (res) {
            $("div#container").on("click", "#close-container", function () {
                $.unblockUI({ onUnblock: callback });
            });
            if (res.error) {
                $("div#container h5").text("Error");
                $("div#container p").val("The following error occured while processing your request:  \n" + json.error);
            } else {
                var json = $.parseJSON(res.response.result);
                if (!json.hasError) {
                    $("div#container h5").text("Success!");
                    $("div#container p").val("Your request was processed Successfully.");
                } else {
                    $("div#container h5").text("Error");
                    $("div#container p").val("The following error occured while processing your request:  \n" + json.message);
                }
            }
            $("div#container button").show();
        });
    };
})();
