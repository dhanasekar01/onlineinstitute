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
        $('.live_stream').owlCarousel({
            items:10,
            loop:false,
            margin:10,
            nav:true,
            dots:false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:3
                },
                1000:{
                    items:3
                },
                1200:{
                    items:5
                },
                1400:{
                    items:6
                }
            }
        })
        
        // Featured Courses home
        $('.featured_courses').owlCarousel({
            items:10,
            loop:false,
            margin:20,
            nav:true,
            dots:false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:1
                },
                1200:{
                    items:2
                },
                1400:{
                    items:3
                }
            }
        })
        
        // Featured Courses home
        $('.top_instrutors').owlCarousel({
            items:10,
            loop:false,
            margin:20,
            nav:true,
            dots:false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:1
                },
                1200:{
                    items:2
                },
                1400:{
                    items:3
                }
            }
        })
        
        // Student Says
        $('.Student_says').owlCarousel({
            items:10,
            loop:false,
            margin:30,
            nav:true,
            dots:false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                },
                1200:{
                    items:3
                },
                1400:{
                    items:3
                }
            }
        })
        
        // features Careers
        $('.feature_careers').owlCarousel({
            items:4,
            loop:false,
            margin:20,
            nav:true,
            dots:false,
            navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                },
                1200:{
                    items:1
                },
                1400:{
                    items:1
                }
            }
        })
        
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
