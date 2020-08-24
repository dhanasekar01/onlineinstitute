'use strict';

app.livestream = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('livestream');


(function (parent) {
    var
        livestreamModel = kendo.observable({
        });

    parent.set('livestreamModel', livestreamModel);


    parent.set('onShow', function (e) {
        if ($("#livestreamScreen").find("footer").length == 0) {
            $("#livestreamScreen").append($("#footerTemplate").html())
        }
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.livestream);

'use strict';

app.liveoutput = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('liveoutput');


(function (parent) {
    var
        liveoutputModel = kendo.observable({
        });

    parent.set('liveoutputModel', liveoutputModel);


    parent.set('onShow', function (e) {
        
    });

    parent.set('afterShow', function (e) {
      
    });

    parent.set('init', function (e) {
       
    });
})(app.liveoutput);
