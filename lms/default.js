'use strict';

app.landing = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('landing');


(function (parent) {
    var
        landingModel = kendo.observable({
        });

    parent.set('landingModel', landingModel);


    parent.set('onShow', function (e) {
        if ($("#landingScreen").find("footer").length == 0) {
            $("#landingScreen .wrapper").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
        app.utils.loadMenu();
    });

    parent.set('init', function (e) {
       
    });
})(app.landing);

app.explore = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('explore');


(function (parent) {
    var
    exploreModel = kendo.observable({
        });

    parent.set('exploreModel', exploreModel);


    parent.set('onShow', function (e) {
        if ($("#exploreScreen").find("footer").length == 0) {
            $("#exploreScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.explore);

'use strict';

app.comingsoon = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('comingsoon');


(function (parent) {
    var
        comingsoonModel = kendo.observable({
        });

    parent.set('comingsoonModel', comingsoonModel);


    parent.set('onShow', function (e) {
        var count = new Date("july 31,2020 00:00:00").getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            var d = count - now;
            var days = Math.floor(d / (1000 * 60 * 60 * 24));
            var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((d % (1000 * 60)) / 1000);
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
            if (d <= 0) {
                clearInterval(x);
            }
        }, 1000);

    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.comingsoon);


app.feedback = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('feedback');


(function (parent) {
    var
        feedbackModel = kendo.observable({
        });

    parent.set('feedbackModel', feedbackModel);


    parent.set('onShow', function (e) {
        if ($("#feedbackScreen").find("footer").length == 0) {
            $("#feedbackScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.feedback);


'use strict';

app.settings = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('settings');


(function (parent) {
    var
        settingsModel = kendo.observable({
        });

    parent.set('settingsModel', settingsModel);


    parent.set('onShow', function (e) {
        if ($("#settingsScreen").find("footer").length == 0) {
            $("#settingsScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.settings);
