const express=require('express')
const router =express.Router()
const controller=require('../controllers/analytcs')

router.get('/overview',controller.overview)
router.get('/analytcs',controller.analytcs)
module.exports=router