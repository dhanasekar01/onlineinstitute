'use strict';

app.membership = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('membership');


(function (parent) {
    var
        membershipModel = kendo.observable({
        });

    parent.set('membershipModel', membershipModel);


    parent.set('onShow', function (e) {
        if ($("#membershipScreen").find("footer").length == 0) {
            $("#membershipScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.membership);
