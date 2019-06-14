//const connectL = require('./connect');
const Requistion = require('../Models/requisition.model.js')

async function get(req, res) {
    const id = req.query
    try {
        if (id.userId) {
            return res.send(await Requistion.find({userId: id.userId}))
        } else {
            return res.status(400).send({ error: `Could not get requisitions: ${err}` })
        }
    } catch (err) {
        return res.status(400).send({ error: `Could not get requisitions: ${err}` })
    }
}


async function post(req, res) {
    try {
        Requistion.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not make requisition: ${err}` })

    }
}

async function put(req, res) {
    try {
        console.log(req.body)
        Requistion.findByIdAndUpdate(
            req.params.id,
            { $set: { "active" : false, deliveryDate: req.body.deliveryDate}, },
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not update requisition status: ${err}` })
                } else{
                    return res.send("edited")
                }
            }
        )
        //console.log(Book.find())
       
    }

    catch (err) {
        return res.status(400).send({ error: `Could not update requisition status: ${err}` })

    }
}



module.exports = { get, post, put }