//const connectL = require('./connect');
const Book = require('../Models/book.model.js')
//const Tag = require('../Models/tag.model.js')


async function get(req, res) {
    const book = req.query
    try {

        if(book.id){
            return res.send(await Book.find({_id: book.id}))
        }
        //Searches mongodb for books
        else{
            return res.send(await Book.find())
        }


    } catch (err) {
        return res.status(400).send({ error: `Could not get book(s): ${err}` })
    }
}

async function post(req, res) {
    try {
        Book.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create book: ${err}` })

    }
}


async function put(req, res) {
    // const book = req.query
    try {
        console.log("edited " + req.params.id )
        Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not edit book: ${err}` })
                }
            }
        )
        //console.log(Book.find())
        return res.send("edited")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not edit book: ${err}` })

    }
}


async function del(req, res) {
    const _id = req.params.id
    try {
        console.log(_id)
        await Book.findByIdAndDelete(_id)
        console.log("removed")
        return res.send("removed")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove book: ${err}` })

    }
}


module.exports = { get, post, put, del }