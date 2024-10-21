const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;




const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String,
        //default: "https://www.istockphoto.com/photo/wodden-dice-on-a-table-form-the-words-chance-and-change-gm1174954917-326979555 ",
        // type:String,
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" :v,
    },
    price: Number,
    location: String,
    country:String,
    reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    ],
    owner: 
       {
        type: Schema.Types.ObjectId,
        ref: "User",
       },
    
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing) {
       await review.deletMany({_id: {$in: listing.reviews}});
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
