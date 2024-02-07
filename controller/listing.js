const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    let allListings = await Listing.find();
    res.render("listings/index.ejs",{allListings})
};

module.exports.shownewform = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showlisting = async (request,response)=>{
    let {id} = request.params;
    const listing = await Listing.findById(id).populate({path : "reviews", populate: { path: "author"} }).populate("owner");
    if (!listing) {
        request.flash("error","Listing Does Not Exit");
        response.redirect("/listings");
    };
    response.render("listings/show.ejs",{listing});
};

module.exports.postCreate = async (req,res,next)=>{
   let response = await  geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
    // let {title,description,image,price,country,location} = request.body;
// let newlisting = request.body.listing;
   let url = req.file.path;
   let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url , filename };
  newListing.geometry = response.body.features[0].geometry;
   let savedListing =  await newListing.save();
   console.log(savedListing);
  req.flash("success","Listing Successfull Created");
  res.redirect("/listings");
};

module.exports.editform = async (request,response)=>{
    let {id} = request.params;
    const listing = await Listing.findById(id);
    if (!listing) {
     request.flash("error","Listing Does Not Exit");
     response.redirect("/listings");
 };
    let orignalImageUrl = listing.image.url;
    orignalImageUrl = orignalImageUrl.replace("/upload","/upload/h_100,w_150");
    response.render("listings/edit.ejs",{listing,orignalImageUrl});
 };

 module.exports.editformupdate = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing });
    if(typeof req.file !="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url , filename };
      await listing.save();
    }
    req.flash("success","Listing Successfull Upadeted");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (request,response)=>{
    let {id}= request.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
      request.flash("success","Listing Successfull Deleted");
      response.redirect("/listings");
      console.log(deletedListing);
};