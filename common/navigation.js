(function () {

    app.navigation = app.navigation || {}


    app.navigation = {
        back: function () {
            app.mobileApp.navigate('#:back');
            app.utils.loading(false);
        },
        openCategory : function(category,params){
            app.utils.loading();            
            app.mobileApp.navigate("lms/" + category+".html" + app.utils.queryParam(params));
            app.utils.loading(false);
        },
        forget: function(){
            app.navigation.openCategory("forget");
        },
        signup: function(){
            app.navigation.openCategory("signup");
        },
        about: function(){
            app.navigation.openCategory("about");
        },
        terms: function(){
            app.navigation.openCategory("terms");
        },
        login: function(){
            app.navigation.openCategory("login");
        },
        student: function(){
            app.navigation.openCategory("student");
        },
    }

}());