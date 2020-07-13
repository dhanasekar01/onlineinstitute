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
        });

    parent.set('aboutModel', aboutModel);


    parent.set('onShow', function (e) {
        
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
        
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.contact);
