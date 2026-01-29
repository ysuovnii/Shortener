const urlSchema = require('../model/urlSchema')
const {nanoid} = require('nanoid')

async function generateURL(req, res) {
    url = req.body.url 
    if(!url) {
        return res.status(400).json({"error" : "URL is required"})
    }

    id = nanoid(8)

    await urlSchema.create({
        shortID : id,
        redirectURL : url, 
    })

    return res.json({"shortID" : id})
}

module.exports = {generateURL}