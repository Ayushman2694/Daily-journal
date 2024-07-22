const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");


const app = express();

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const posts = [];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.render("home",{homeContent:homeStartingContent,posts:posts});
});


app.get("/contact",(req,res)=>{
    res.render("contact",{contactContent:contactContent});
});

app.get("/about",(req,res)=>{
    res.render("about",{aboutContent:aboutContent});
});

app.get("/compose",(req,res)=>{
    res.render("compose");
});

app.get("/post/:postName",(req,res)=>{
let requestedTitle = _.lowerCase(req.params.postName)
posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        postBody: post.body
      });
    }
  });
    

})

app.post("/compose",(req,res)=>{
    
    let post={
        title : req.body.postTitle,
        body : req.body.postBody
    };

    posts.push(post);
    res.redirect("/")
    
});



app.listen(port,()=>{
    console.log("server is listenig to port "+ port );
})
