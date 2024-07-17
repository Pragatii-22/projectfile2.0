const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust"

main().then(() =>{
    console.log("connected to DB");
})
.catch(ree =>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", (req,res) =>{
    res.send("hi, I am root")
});

//Index route
app.get("/Listings", async (req, res) =>{
    const allListings = await Listing.find({});
        res.render("listings/index.ejs", {allListings});
    });

    //New Route 
app.get("/listings/new", (req,res) =>{
    res.render("listings/new.ejs");
 }); 

// Show RouteS
app.get("/Listings/:id", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", {listing});
});

// create Route
app.post("/listings/new", async (req,res) => {
    const newListing =new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // let listing = req.body;
    // console.log(listing);
});

 // Edit Route

 app.get("/listings/:id/edit", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//Update Route
app.put("/listings/:id/edit", async (req, res) =>{
     let {id} = req.params;
    // const id = req.params.id;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect('/listings/${id}');
    
});  

//Delete Route
app.delete("/listings/:id/edit", async (req, res) =>{
    let {id} = req.params;
    // const id = req.params.id;
    let deletedListing = await Listing.findByIdAndUpdate(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


// app.get("/testListing", async (req,res) =>{
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "by the beach ",
//     image: "https://www.istockphoto.com/photo/wodden-dice-on-a-table-form-the-words-chance-and-change-gm1174954917-326979555 "
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India"
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen(8080, () =>{
    console.log("server is listening to port 8080")
});         