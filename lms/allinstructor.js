'use strict';

app.allinstructor = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('allinstructor');


(function (parent) {
    var
        allinstructorModel = kendo.observable({
        });

    parent.set('allinstructorModel', allinstructorModel);


    parent.set('onShow', function (e) {
        if ($("#allinstructorScreen").find("footer").length == 0) {
            $("#allinstructorScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.allinstructor);
