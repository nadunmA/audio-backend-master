import Rewview from "../models/review.js";

export function addReview(req,res) {

    if(req.user == null) {
        res.status(401).json({
            message : "Please login try again"
        });
        return;
    }

    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePic = req.user.profilePic;
    data.email = req.user.email;

    const newReview = new Rewview(data)

    newReview.save().then (() => {
        res.json({message : "Review added sucessful"});

    }).catch((error) => {
        res.status(500).json({error : "Review added failed"})
    });
}



export function getReviews(req, res){
    const user = req.user;

    if(user == null || user.role != "admin"){

        Rewview.find({isApproved : true}).then((reviews) => {
            res.json(reviews);

        })
        return

    }

    if(user.role == "admin") {
        Rewview.find().then((reviews) => {
            res.json(reviews);
        })
    }
}


export function deleteReview(req, res) {
    const email = req.params.email;


    if(req.user == null) {
        res.status(401).json
        ({message : "please login and try agin"});
        return
    }

    if(req.user.role == "admin"){

        Rewview.deleteOne
        ({email:email}).then(() => {
        res.json({message : "Review deleted success"})

    }).catch(() => {
        ({error : "Review added fail"});
    })
    return

    }


    if(req.user.role == "customer") {

        if(req.user.email == email){

            Rewview.deleteOne
            ({email:email}).then(() => {
                res.json({message : "Review deleted success"})
    
            }).catch(() => {
                res.status(500).json
                ({error : "Review added fail"});
            });

        }else{
            res.status(403).json({message : "Youre not authorized to perform this action"});
        }

    }


    
}

export function approveReview(req,res){
    const email = req.params.email;

    if(req.status(401).json
    ({message : "please login and try again"})){
        return
    }

    if(req.user.role == "admin"){
        Rewview.updateOne({

            email : email
            
        },
        {
            isApproved: true
        }
      ).then(() => {
        res.json({message : "Review approved sucess"});

      }).catch(() => {
        res.status(500).json({error : "Review approvel fialed"})
      }) 

    }else{
        res.status(403).json({message : "You are not admin. only admins can approve the review"})
    }
}