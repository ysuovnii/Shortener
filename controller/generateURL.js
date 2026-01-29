const urlSchema = require('../model/urlSchema')
const validator = require('validator')
const {nanoid} = require('nanoid')

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

async function generateURL(req, res) {
    try {

        const url = req.body.url 
        if(!url) {
            return res.status(400).json({"error" : "URL is required"})
        }

        const normalizedUrl = url.startsWith('http') ? url : `http://${url}`;

        if(!validator.isURL(url)) {
            return res.status(400).json({"error" : "Invalid URL"})
        }
        
        const id = nanoid(8)
        
        await urlSchema.create({
            shortID : id,
            redirectURL : url, 
        })
        
        return res.json({
            "shortURL" : `${BASE_URL}/${id}`,
            "RedirectURL" : url,
        })
    }
    catch(err) {
        console.log("error: ", err)
        return res.status(500).json({"error" : "Something went wrong"})
    }
}

module.exports = {generateURL}