const express=require('express')
const { employeeRegister, getAllEmployees, getProfile, deletedata, editUser } = require('../controllers/logic')
const upload = require('../multerConfig/storageConfig')



//create an obejct for router class in express

const router= new express.Router()

//router for registering an employee

router.post('/employees/register',upload.single('userprofile'),employeeRegister)

//get all the employees
router.get('/employees/getEmployees',getAllEmployees)


//get a single employee
router.get('/employees/getProfile/:id',getProfile)

//to delete
router.delete('/employees/delteProfile/:id',deletedata)

//router for registering an employee

router.post('/employees/editProfile/:id',upload.single('userprofile'),editUser)


module.exports=router