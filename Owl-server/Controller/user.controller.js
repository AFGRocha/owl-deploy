//const connectL = require('./connect');
const User = require('../Models/user.model.js')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 1;
    return jwt.sign(user, "baconpancakes", {
        expiresIn: ONE_WEEK
    })
}

async function register(req, res) {
    console.log(req.body)
    let newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        ableToRequest: true,
        type: "user",
        nRequisitionsNow: 0,
        photo: "https://i.imgur.com/6NIOn6z.jpg",
        points: 0,
        favTags:[]
    })
    newUser.save((error) => {
        if (error) {
            console.log(error)
            return
        }
        else {
            res.status(201).send({ success: "Register izipizi" })
        }

    })
}

async function validate(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body.email)
        console.log("entrou")

        const user = await User.findOne({ email: email }).lean()

        if (!user) {
            console.log("user not found")
            return res.status(403).send({ error: "User not found" })
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (!passwordValid) {
            console.log("invalid password")
            return res.status(403).send({ error: "Password invalid" })
        }
        res.status(200).send({ Yey: "U got it", user, token: jwtSignUser(user) })
        console.log("logged in")
        

    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong" })

    }

}

async function get(req, res) {
    const user = req.query

    try {
        if(user.id){
            return res.send(await User.find({_id: user.id}))
        }
        else{
            return res.send(await User.find().lean())
        }
       
    } catch (err) {
        return res.status(400).send({ error: `Could not get users: ${err}` })
    }
}

async function post(req, res) {
    try {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required()

        })

        // Return result.
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({ error: `Something went wrong}` })
            //You should send all errors ;)
        }
        else {

            User.create(req.body)
            return res.status(201).send({ yey: "Regist done with ponkiponki"})

        }
        // result.error === null -> valid


    }

    catch (err) {
        return res.status(400).send({ error: `Could not create user: ${err}` })

    }
}

async function put(req, res) {
    try {
        console.log("edited")
        console.log(req.params.id)
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not edit book: ${err}` })
                }
            }
        )
        return res.send("edited " + req.params.id)
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove books: ${err}` })

    }
}


async function del(req, res) {
    const _id = req.params.id
    try {
        console.log(_id)
        await User.findByIdAndDelete(_id)
        console.log("removed")
        return res.send("removed")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove books: ${err}` })

    }
}


module.exports = { get, post, put, del, register, validate }