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
app.post("/contact/send", function(req, res) {
   var smtpTransport = nodemailer.createTransport({
       service: 'Gmail', 
       auth: {
         user: 'youremail@domain.com',
         pass: process.env.GMAILPW
       }
   });
    
   var mailOptions = {
       from: 'Your Name <youremail@domain.com>',
       to: 'youremail@domain.com',
       replyTo: req.body.email,
       subject: 'Website Submission',
       text: 'You have a submission with the following details... Name: '+ req.body.name + ' Phone: ' + req.body.phone + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
       html: '<h3>You have a submission with the following details...</h3><ul><li>Name: ' + req.body.name + ' </li><li>Phone: ' + req.body.phone + ' </li><li>Email: ' + req.body.email + ' </li></ul><p>Message: <br/><br/>     ' + req.body.message + ' </p>'
   };
   
   smtpTransport.sendMail(mailOptions, function(err, info){
     if(err) {
       req.flash("error", "Something went wrong");
       console.log(err);
       res.redirect("/contact");
     } else {
       req.flash("success", "Your email has been sent, we will respond within 24 hours.");
       console.log("Message sent " + info.response);
       res.redirect("/campgrounds");
       
     }
   });
   
});

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))