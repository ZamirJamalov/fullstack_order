const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const keys=require('../config/keys')

module.exports.login=async function(req,res){
	const candidate=await User.findOne({email:req.body.email})

	if (candidate){
		//check password
		const passwordResult=bcrypt.compareSync(req.body.password, candidate.password)
		if (passwordResult){
			//create token
			const token=jwt.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt,{expiresIn: 60*60})

			res.status(200).json({
				token:`Bearer ${token}`
			})
		} else {
			//no password match
			res.status(401).json({
				message:'no password match'
			})
		}

	} else {
		//no user found error
		res.status(404).json({
			message:'no user found'
		})
	}
}

module.exports.register= async function(req,res){
	const candidate=await User.findOne({email:req.body.email})

	if (candidate){
		//user exiasts return error
		res.status(409).json({
			message:'Email exists'
		})
	} else {
		//nees create user
		const salt=bcrypt.genSaltSync(10)
		const password=req.body.password
		const user=new User({
			email: req.body.email,
			password: bcrypt.hashSync(password,salt)
		})
		try {
			await user.save()	
			res.status(201).json(user)
		} catch(e){
			//erroru emal etmak

		}
		
	}
}