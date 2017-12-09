function register() {
  $("button").click(function(){
    $.ajax({url: "register.html", success: function(result){
        $("#main").html(result);
    }});
});
}

function blog() {
  $("button").click(function(){
    $.ajax({url: "blog.html", success: function(result){
        $("#main").html(result);
    }});
});
}

function schedule() {
  $("button").click(function(){
    $.ajax({url: "schedule.html", success: function(result){
        $("#main").html(result);
    }});
});
}
