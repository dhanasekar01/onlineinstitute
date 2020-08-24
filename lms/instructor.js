'use strict';

app.instructor = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('instructor');


(function (parent) {
    var
        instructorModel = kendo.observable({
        });

    parent.set('instructorModel', instructorModel);


    parent.set('onShow', function (e) {
        if ($("#instructorScreen").find("footer").length == 0) {
            $("#instructorScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.instructor);
