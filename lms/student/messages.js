'use strict';

app.messages = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('messages');


(function (parent) {
    var
        messagesModel = kendo.observable({
        });

    parent.set('messagesModel', messagesModel);


    parent.set('onShow', function (e) {
        if ($("#messagesScreen").find("footer").length == 0) {
            $("#messagesScreen").append($("#studentfooterTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {


    });

    parent.set('init', function (e) {

    });
})(app.messages);
