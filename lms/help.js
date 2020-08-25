'use strict';

app.help = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('help');


(function (parent) {
    var
        helpModel = kendo.observable({
        });

    parent.set('helpModel', helpModel);


    parent.set('onShow', function (e) {
        if ($("#helpScreen").find("footer").length == 0) {
            $("#helpScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.help);
