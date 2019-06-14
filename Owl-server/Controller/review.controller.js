//const connectL = require('./connect');
const Review = require('../Models/review.model.js')

async function get(req, res) {
    const id = req.query
    console.log(id)
    try {
        if (id.bookId){
            console.log("true")
            return res.send(await Review.find({bookId: id.bookId}))
        } else {
            return res.send(await Review.find())
        }
        
    } catch (err) {
        return res.status(400).send({ error: `Could not get reviews: ${err}` })
    }
}

async function post(req, res) {
    try {
        Review.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create review: ${err}` })

    }
}

async function del(req, res) {
    const _id = req.params.id
    try {
        console.log(_id)
        await Review.findByIdAndDelete(_id)
        console.log("removed")
        return res.send("removed")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove review: ${err}` })

    }
}


async function put(req, res) {
    // const book = req.query
    try {
        console.log("edited " + req.params.id )
        Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not edit review: ${err}` })
                }
            }
        )
        //console.log(Book.find())
        return res.send("edited")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not edit review: ${err}` })

    }
}


module.exports = { get, post , del, put}