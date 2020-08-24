'use strict';

app.createcourse = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('createcourse');


(function (parent) {
    var
        createcourseModel = kendo.observable({
        });

    parent.set('createcourseModel', createcourseModel);


    parent.set('onShow', function (e) {
        if ($("#createcourseScreen").find("footer").length == 0) {
            $("#createcourseScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
        $('#add-course-tab').steps({
            onFinish: function () {
              alert('Wizard Completed');
            }
          });
    });

    parent.set('init', function (e) {
       
    });
})(app.createcourse);
