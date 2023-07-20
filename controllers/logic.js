const { json } = require("express");
const employees = require("../models/emsSchema");




//logic to register new employees
exports.employeeRegister =async (req,res)=>{
    const file = req.file.filename
    const{fname,laname,email,phone,mobile,gender,status,location}=req.body
    if(!fname ||!laname ||!email || !phone  || !mobile || !gender || !status || !location || !file){
            res.status(406).json("all the inputs are required")
    }

 try {  const preEmployee=await employees.findOne({email})
        if(preEmployee){
            res.status(403).json('employee already exist')
        }
        else{
            const newEmployee=new employees({
                fname,laname,email,phone,mobile,gender,status,profile:file,location
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }

}
 catch (error){
     res.status(401).json(error)
 }






}

 //to get all the employees

 exports.getAllEmployees=async(req,res)=>{

    // access the query parameter from req
    const searchKey=req.query.search

    //create regular expression to match with fname
    const query={
        fname:{$regex:searchKey,$options:'i'} //'i'=case in-sensitive
    }

    try{
        const allemployees=await employees.find(query)
        res.status(200).json(allemployees)

    }
    catch(err){
       res.status(200).json(err)
    }

 }

//to view single employee

 exports.getProfile=async   (req,res)=>{
const {id}=req.params
try{
    const preuser=await employees.findOne({_id:id})
    res.status(200).json(preuser)
}
catch{
    res.status(401).json("employee not found")

}
 }

 //to delete

 exports.deletedata=async (req,res)=>{
    const{id}=req.params

try{
   const user= await employees.findByIdAndDelete({_id:id})
   res.status(200).json(user)
}
catch{
    res.status(403).json('user not found')

}


 }


 //to edit employee

 exports.editUser=async(req,res)=>{
    const{id}=req.params

    const{fname,laname,email,phone,mobile,gender,status,location,userprofile}=req.body

    const file = req.file?req.file.filename:userprofile

    try{
       const user=await employees.findOne({_id:id})

       if(user){
        user.fname=fname
        user.laname=laname
        user.email=email
        user.phone=phone
        user.mobile=mobile
        user.gender=gender
        user.status=status
        user.location=location
        user.profile=file


       await user.save()
       res.status(200).json(fname)
       }
       
    }
    catch(err){
    res.status(401).json(err)


    }




 }


