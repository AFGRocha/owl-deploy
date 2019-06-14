//const connectL = require('./connect');
const BookSugestion = require('../Models/bookSuggestion.model.js')

async function get(req, res) {
    try {
        return res.send(await BookSugestion.find())
    } catch (err) {
        return res.status(400).send({ error: `Could not get bookSuggestion: ${err}` })
    }
}


async function post(req, res) {
    try {
        BookSugestion.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create bookSuggestion: ${err}` })

    }
}


async function del(req, res) {
    const _id = req.params.id
    try {
        console.log(_id)
        await BookSugestion.findByIdAndDelete(_id)
        console.log("removed")
        return res.send("removed")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove bookSuggestion: ${err}` })

    }
}


async function put(req, res) {
    try {
        console.log("edited")
        BookSugestion.findByIdAndUpdate(
            req.params.id,
            { $inc: { "suggestNumber" : 1} },
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not increment suggestNumber: ${err}` })
                }
            }
        )
        //console.log(Book.find())
        return res.send("edited")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not increment suggestNumber: ${err}` })

    }
}



module.exports = { get, post, del, put}