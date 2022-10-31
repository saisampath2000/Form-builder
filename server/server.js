const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db= require('./firebase.js')
const uuid = require('uuid')
const cors =require('cors')

app.use(bodyParser.json());

app.use(cors())

//get form
app.get("/form",(req,res) => {
        db.collection("forms").get().then((querySnapshot, error) => {
            if (error) {
                return res.status(500).json(error.message)
            }
            const result = [];
            querySnapshot.forEach(doc => result.push(doc.data()));
            return res.status(200).json(result);
        })
} )

//create form
app.post("/form",(req,res) =>{
    const{name,createdBy,fields,createdAt}=req.body
    console.log(req.body,"data");
    try{
        const id=uuid.v4()
        const updatedAt= "N/A"
        const obj={id,updatedAt,...req.body}
        const docRef=db.collection("forms").doc(id)
        docRef.set({data:obj})
        res.send("api posted successfully")
        res.status(200)
    } catch(e){
        res.send(e.message)
        res.status(500)
    }
})

//update form
app.put("/form/:formId",async(req,res) => {
    const {formId}=req.params;
    const{name,fields,updatedAt}=req.body;
    try{        
        const docRef=db.collection("forms").doc(formId);
        const data = await docRef.get()
        const obj = data.data() 
        console.log(obj)
        obj["data"]["name"]=name;
        obj["data"]["fields"]=fields;
        obj["data"]["updatedAt"]=updatedAt;
        //obj["data"]["updatedBy"]=updatedBy;
        console.log(obj)
        docRef.set(obj)
        res.send(obj)
        res.status(200)
    } catch(e){
        res.send(e.message)
        res.status(500)
    }
})


//delete form
app.delete("/form/:formId",async(req,res) => {
    const {formId}=req.params;
        db.collection("forms").doc(formId).delete().then((data) => {
            res.status(200).json({ status: 'success' });
        }).catch(err => {
            res.status(500).json({ 
                status: 'error',
                err: err.message 
            });
        })
})

//parse single form
app.get("/form/:formId",async(req,res) => {
    const {formId}=req.params;
    console.log(formId)
    try{        
        const docRef=db.collection("forms").doc(formId);
        const data = await docRef.get()
        res.send(data.data())
        res.status(200)
    } catch(e){
        res.send(e.message)
        res.status(500)
    }

})

//submit forms
app.post("/submit/:formId",(req,res) =>{
    const {formId}=req.params;
    console.log(req.body.data)
    //{"field_1":"value_1","field_2":"value_2"}
    //const{name,createdBy,fields,createdAt}=req.body
    try{
        const docRef=db.collection("forms").doc(formId).collection("submitted").doc(uuid.v4());
        docRef.set({data:req.body.data})
        res.send("form submitted successfully")
        res.status(200)
    } catch(e){
        res.send(e.message)
        res.status(500)
    }
})

app.listen(8080, () => {
    console.log("running at 8080")
})

// class form:
//     name
//     fields=[{},{}]
//     Id
//     created at
//     created by
//     updated at
//     updated by
//     submitted=collection


//Pending
// validate string/number field input

