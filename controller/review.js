const Listing = require("../models/listing");
const Review = require("../models/reviews");


module.exports.reviewcreate  = async (req,res)=>{
    let listing =  await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","Successfull Review Added");
     res.redirect(`/listings/${listing._id}`)
   }

module.exports.destroy = async(req,res)=>{
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
   req.flash("success","Successfull Review Deleted");
   res.redirect(`/listings/${id}`);
};