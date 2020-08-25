'use strict';

app.mycourses = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('mycourses');


(function (parent) {
    var
        mycoursesModel = kendo.observable({
        });

    parent.set('mycoursesModel', mycoursesModel);


    parent.set('onShow', function (e) {
        if ($("#mycoursesScreen").find("footer").length == 0) {
            $("#mycoursesScreen").append($("#studentfooterTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
     
    });

    parent.set('init', function (e) {
       
    });
})(app.mycourses);
