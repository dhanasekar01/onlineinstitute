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
