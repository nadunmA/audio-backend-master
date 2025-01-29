import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req, res){

    console.log(req.user)

    if(req.user == null){
        res.status(401).json({
            message : "Please login try again"
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perfrom this action"
        })
    }

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save()

    .then(() => {
        res.json({message : "Product add sucessfully"});
    })
    .catch((error) => {
        res.status(500).json({error : "Product addition failed"});
    });

}


export async function getProduct(req,res) {

    try {

        if(isItAdmin(req)){
            
            const product = await Product.find;
            ({availability : true});
            res.json(product);
            return;

        }else {

            const product = await Product.find();
            res.json(product);
            return;

        }
        
    } catch (error) {

        res.status(500).json({
            message : "failed to get product"
        })
        
    }
    
}


export async function updateProduct(req, res) {

    try {

        if(isItAdmin(req)){

            const key = req.params.key;
            const data = req.body

            await Product.updateOne({key:key}, data)

            res.json({
                message : "product update sucess"
            })
            return;

        }else{
            res.status(403).json({
                message : "you are not authrized to perofem this action"
            })
        }

        
    } catch (e) {

        res.status(500).json({
            message : "failed to update product"
        })
        
    }
    
}

export async function deleteProduct(req,res) {

    try{

        if(isItAdmin(req)){

            const key = req.params.key;
        
            await Product.deleteOne({key:key})

            res.json({
                message : "product delete sucess"
            })

        }else{

            res.status(403).json({
                message : "you cannot delete"
            })
            return;
        }
            

    }catch(error){

        res.status(500).json({
            message : "fialed to delete product"
        })

    }
    
}