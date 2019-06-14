//const connectL = require('./connect');
const Tag = require('../Models/tag.model.js')

async function get(req, res) {
    try {
        return res.send(await Tag.find())
    } catch (err) {
        return res.status(400).send({ error: `Could not get tags: ${err}` })
    }
}


async function post(req, res) {
    try {
        Tag.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create tag: ${err}` })

    }
}

async function del(req, res) {
    const _id = req.params.id
    try {
        console.log(_id)
        await Tag.findByIdAndDelete(_id)
        console.log("removed")
        return res.send("removed")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not remove tag: ${err}` })

    }
}
async function put(req, res) {
    // const book = req.query
    try {
        console.log("edited " + req.params.id )
        Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not edit tag: ${err}` })
                }
            }
        )
        //console.log(Book.find())
        return res.send("edited")
    }

    catch (err) {
        return res.status(400).send({ error: `Could not edit tag: ${err}` })

    }
}


module.exports = { get, post, del, put }