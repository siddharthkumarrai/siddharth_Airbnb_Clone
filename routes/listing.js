const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middlewares.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.postCreate));

//new route
router.get("/new", isLoggedIn,listingController.shownewform);

router
.route("/:id")
.get(wrapAsync (listingController.showlisting))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync (listingController.editformupdate))
.delete(isLoggedIn,isOwner,wrapAsync( listingController.destroy));

// edit-rout
router.get("/:id/edit",isLoggedIn,isOwner ,wrapAsync (listingController.editform));

module.exports = router;