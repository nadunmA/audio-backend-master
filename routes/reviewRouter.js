import express from "express";
import { addReview, approveReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/", addReview)

reviewRouter.get("/:name" ,(req, res) => {
    console.log(req.params.name);
})

reviewRouter.delete(":email", deleteReview)

reviewRouter.get("/:email", (req, res) =>{
    console.log("This is email route")
})

reviewRouter.get("/approved", (req, res) => {
    console.log("This is approved route")
})

reviewRouter.put("/approve/email", approveReview)

export default reviewRouter;