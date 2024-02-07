const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isReviewAuthor} = require("../middlewares.js");
const reviewController = require("../controller/review.js");

// Review create Route
router.post("/",isLoggedIn,wrapAsync (reviewController.reviewcreate));
   
// Review Delete Route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroy));

 module.exports = router;