import { json } from "body-parser";
import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {

    try {

        if(isItCustomer(req)){
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;

            const inqiuiry = await Inquiry.find().sort({id:-1}).limit(1);

            if(inqiuiry.length == 0){
                id = 1;

            }else{
                id = inqiuiry[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message : "inquiry added succesfully",
                id : response.id
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "failed to add inqiuiry"
        })
        
    }
    
}


export async function getInquiries(req, res) {
    try {
        if(isItCustomer(req)){
            const inqiuiry = await Inquiry.find({email:req.user.email});
            res.json(inqiuiry);
            return;

        }else if(isItAdmin(req)){
            const inqiuiry = await Inquiry.find();
            res.json(inqiuiry);
            return;

        }else{
            res.status(403).json({
                message : "not access"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message : "failed to get inquirys"
        })
        
    }
}

export async function deleteInquariy(req,res) {

    try {

        if(isItAdmin(req)){
            const id = req.params.id;

            await Inquiry.deleteOne({id:id})
            res.json({
                message : "Inquary delete sucessfully"
            })
            return;

        }else if(isItCustomer(req)){
            const id = req.params.id;

            const inqiuiry = await Inquiry.findOne({id:id});

            if(inqiuiry == null){
                res.status(404).json({
                    message : "Inquairy not found"
                })
                return;

            }else{

                if(inqiuiry.email == req.user.email){
                    await Inquiry.deleteOne({id:id})
                    res.json({
                        message : "Inquariy delete successfully"
                    })
                    return;

                }else{
                     res.status(403).json({
                        message : "You are not authorized to perform this action"
                     })
                     return;

                }

            }
        }else{

            res.status(403).json({
                message : "You are not authorized to perform this action"
             })
             return;

        }

        
    } catch (error) {
        res.status(500).json({
            message : "Failed delete inquary"
        })
        
    }
    
}

export async function updateInquiary(req,res) {
    try {
        if(isItAdmin(req)){
            const id = req.params.id;
            const data = req.body;

            await Inquiry.updateOne({id:id},data)
            res.json({
                message : "Inquiry updated successfully"
            })

        }else if(isItCustomer(req)){

            const id = req.params.id;
            const data = req.body;

            const inqiuiry = await Inquiry.findOne({id:id});
            if(inqiuiry == null){
                res.status(404).json({
                    message : "Inquariy not found"
                })
                return;

            }else{
                if(inqiuiry.email == req.user.email){



                    await Inquiry.updateOne({id:id},{message : data.message})
                    res.json({
                        message : "Inquiary updated successfully"
                    })
                    return;

                }else{
                    res.status(403).json({
                        message : "you are not authorized to perform this action"
                    })
                    return;
                }

            }

        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
        }

        
    } catch (error) {
        res.status(500).json({
            message : "Failed to update inquiry"
        })
    }
    
}