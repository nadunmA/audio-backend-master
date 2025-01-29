import express from "express";
import { addInquiry, deleteInquariy, getInquiries, updateInquiary } from "../controllers/inquirtController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", addInquiry)
InquiryRouter.get("/", getInquiries)
InquiryRouter.delete("/:id", deleteInquariy)
InquiryRouter.put("/:id", updateInquiary)


export default InquiryRouter;