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
        help: function(){
            app.navigation.openCategory("help");
        },
        comingsoon: function(){
            app.navigation.openCategory("comingsoon");
        },
        student: function(){
            app.navigation.openCategory("student");
        },
        contact: function(){
            app.navigation.openCategory("contact");
        },
        home: function(){
            app.utils.loading();            
            app.mobileApp.navigate("lms/");
            app.utils.loading(false);
        },
        feedback: function(){
            app.navigation.openCategory("feedback");
        },
        settings:function(){
            app.navigation.openCategory("settings");
        },
        explore:function(){
            app.navigation.openCategory("explore");
        },
        livestream: function(){
            app.navigation.openCategory("livestream");
        },
        liveoutput:function(){
            app.navigation.openCategory("liveoutput");
        },
        categories:()=>{
            app.navigation.openCategory("categories");
        },
        createcourse:()=> {
            app.navigation.openCategory("createcourse");
        },
        savedcourse:()=>{
            app.navigation.openCategory("savedcourse");
        },
        allinstructor:()=>{
            app.navigation.openCategory("allinstructor");
        },
        teacherDashboard:()=>{
            app.navigation.openCategory("instructor_dashboard");
        },
        instructor:()=>{
            app.navigation.openCategory("instructor");
        }
    }

}());