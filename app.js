var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    app             = express();

app.use(bodyParser.urlencoded({extended:true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));



app.get("/", function(req, res){
   res.render("home");
})
app.get("/courses", function(req, res){
   res.render("courses");
})
app.get("/projects", function(req, res){
   res.render("projects");
})
app.get("/contact", function(req, res){
   res.render("contact");
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Started!");
});