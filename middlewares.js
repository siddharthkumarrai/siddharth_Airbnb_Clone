const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js")
const Review = require("./models/reviews.js");




module.exports.validateListing = (request,response,next)=>{
    let { error } =listingSchema.validate(request.body)
    if(error){
        let errormsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errormsg);
    }else{
        next();
    }
};


module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login")
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id) ) {
        req.flash("error","you are not the owner of this listings")
       return  res.redirect(`/listings/${id}`)
    };
    next();
};

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id) ) {
        req.flash("error","you are not the author of this review")
       return  res.redirect(`/listings/${id}`)
    };
    next();
};