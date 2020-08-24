'use strict';

app.forgotPwd = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

app.login = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

app.contact = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

app.about = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.signup = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.terms = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

app.localization.registerView('forgotPwd');
app.localization.registerView('terms');
app.localization.registerView('signup');
app.localization.registerView('login');
app.localization.registerView('contact');
app.localization.registerView('about');


(function (parent) {
    var
        forgotPwdModel = kendo.observable({
        });

    parent.set('forgotPwdModel', forgotPwdModel);


    parent.set('onShow', function (e) {

    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.forgotPwd);


(function (parent) {
    var
        loginModel = kendo.observable({
        });

    parent.set('loginModel', loginModel);


    parent.set('onShow', function (e) {

    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.login);



(function (parent) {
    var
        aboutModel = kendo.observable({
            isAbout:true,
            isBlog:false,
            isCareer:false,
            isPress:false,
            isCompany:false,
            allfalse:()=>{
                aboutModel.set("isBlog",false)
                aboutModel.set("isPress",false)
                aboutModel.set("isAbout",false)
                aboutModel.set("isCompany",false)
                aboutModel.set("isCareer",false)
            },
            blog:()=>{
                aboutModel.allfalse()
                $(".aboutuscss").find("a").removeClass("active");
                $($(".aboutuscss").find("a")[1]).addClass("active")
                aboutModel.set("isBlog",true)
                
            },
            about:()=>{$(".aboutuscss").find("a").removeClass("active");
                $($(".aboutuscss").find("a")[0]).addClass("active")
                aboutModel.allfalse()
                aboutModel.set("isAbout",true)
            },
            careers:()=>{
                $(".aboutuscss").find("a").removeClass("active");
                $($(".aboutuscss").find("a")[3]).addClass("active")
                aboutModel.allfalse()
                aboutModel.set("isCareer",true)
            },
            company:()=>{$(".aboutuscss").find("a").removeClass("active");
            $($(".aboutuscss").find("a")[2]).addClass("active")
            aboutModel.allfalse()
            aboutModel.set("isCompany",true)},
            press:()=>{$(".aboutuscss").find("a").removeClass("active");
            $($(".aboutuscss").find("a")[4]).addClass("active")
            aboutModel.allfalse()
            aboutModel.set("isPress",true)},
        });

    parent.set('aboutModel', aboutModel);


    parent.set('onShow', function (e) {
        aboutModel.set("isBlog",false)
        aboutModel.set("isPress",false)
        aboutModel.set("isAbout",true)
        aboutModel.set("isCompany",false)
        aboutModel.set("isCareer",false)
        if ($("#aboutScreen").find("footer").length == 0) {
            $("#aboutScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.about);


'use strict';



(function (parent) {
    var
        signupModel = kendo.observable({
        });

    parent.set('signupModel', signupModel);


    parent.set('onShow', function (e) {

    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.signup);


(function (parent) {
    var
        termsModel = kendo.observable({
        });

    parent.set('termsModel', termsModel);


    parent.set('onShow', function (e) {

    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.terms);


(function (parent) {
    var
        contactModel = kendo.observable({
        });

    parent.set('contactModel', contactModel);


    parent.set('onShow', function (e) {
        if ($("#contactScreen").find("footer")) {
            $("#contactScreen").append($("#footerTemplate").html())
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtYm9sIiwiYSI6ImNqdm03bzYydDE2cW00YWwyeHprd3FqamcifQ.HBy4R4sRcXgbgn2OteqFkQ';
        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        mapboxClient.geocoding.forwardGeocode({
            query: 'Tiruvannamalai, India',
            autocomplete: false,
            limit: 1
        })
            .send()
            .then(function (response) {
                if (response && response.body && response.body.features && response.body.features.length) {
                    var feature = response.body.features[0];

                    var map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [79.080099, 12.231480],
                        zoom: 10
                    });

                    new mapboxgl.Marker()
                        .setLngLat(feature.center)
                        .addTo(map);
                }

                // Add zoom and rotation controls to the map.
                map.addControl(new mapboxgl.NavigationControl());
            });

    });

    parent.set('afterShow', function (e) {

    });

    parent.set('init', function (e) {

    });
})(app.contact);
