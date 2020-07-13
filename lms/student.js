'use strict';

app.student = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('student');


(function (parent) {
    var
        studentModel = kendo.observable({
        });

    parent.set('studentModel', studentModel);


    parent.set('onShow', function (e) {
        
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.student);
