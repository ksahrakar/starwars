// Dependencies
// ==========================================================
var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;

// Data parsing setup
// ===========================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// ===========================================================
var guys =[
  {route: "yoda",
  name: "Yoda",
  role: "Jedi Master",
  age: 900,
  forcePoints: 2000},

  {route:"darthmaul",
  name: "Darth Maul",
  role: "Sith Lord",
  age: 200,
  forcePoints: 1200},

  {route: "obiwankenobi",
  name: "Obi Wan Kenobi",
  role: "Idiot",
  age: 34,
  forcePoints: 1250}
];

// Routes
// ===========================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});


app.get("/api/guys", function(req, res) {
  return res.json(guys);
});

app.get("/api/guys/:guy", function(req, res) {
  var theOne = req.params.guy;
  for (j=0;j<guys.length;j++){
    if (theOne==guys[j].route) {return res.json(guys[j])}
    else {return res.json(false)}
  }
   
});

app.post("/api/guys", function(req,res){
  var newGuy = req.body;
  newGuy.route=newGuy.name.replace(/\s+/g,"").toLowerCase();
  guys.push(newGuy);
  res.json(newGuy);
})


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
