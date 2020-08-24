'use strict';

app.savedcourse = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('savedcourse');


(function (parent) {
    var
        savedcourseModel = kendo.observable({
        });

    parent.set('savedcourseModel', savedcourseModel);


    parent.set('onShow', function (e) {
        if ($("#savedcourseScreen").find("footer").length == 0) {
            $("#savedcourseScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.savedcourse);
