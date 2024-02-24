const express=require("express");
const router= express.Router();
const wrapAsync =require("../utils/wrapAsync.js"); 
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
   isLoggedIn,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(listingController.createlistings)
   );
//NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.showlistings))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updatelistings))
.delete( isOwner, isLoggedIn,wrapAsync(listingController.deletlistings));

router.get("/search",listingController.searchlistings);

//Edit Route
router.get("/:id/edit", isOwner,isLoggedIn,wrapAsync(listingController.editlistings));
module.exports=router;