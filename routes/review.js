const express=require("express");
const router= express.Router({mergeParams:true});
const wrapAsync =require("../utils/wrapAsync.js"); 
const { validateReview, isLoggedIn ,isReviewAuthor} = require("../middleware.js");
const reviewController=require("../controller/review.js");


//create review
 router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createreview) );
    
//DELETE REVIEWROUTE
router.delete( "/:reviewId", isLoggedIn, isReviewAuthor,wrapAsync(reviewController.deleteReview));
    
 module.exports=router;
