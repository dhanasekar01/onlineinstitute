'use strict';

app.categories = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('categories');


(function (parent) {
    var
        categoriesModel = kendo.observable({
        });

    parent.set('categoriesModel', categoriesModel);


    parent.set('onShow', function (e) {
        if ($("#categoriesScreen").find("footer").length == 0) {
            $("#categoriesScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.categories);
