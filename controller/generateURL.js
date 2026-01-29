const urlSchema = require('../model/urlSchema');
const validator = require('validator');
const { nanoid } = require('nanoid');

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function generateURL(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.render('index', { error: "URL is required" });
        } 

        const normalizedUrl = url.startsWith('http') ? url : `http://${url}`;

        if (!validator.isURL(normalizedUrl)) {
            return res.render('index', { error: "Invalid URL" });
        } 

        const id = nanoid(8);

        await urlSchema.create({ shortID: id, redirectURL: normalizedUrl });

        const shortUrl = `${BASE_URL}/${id}`; 

        return res.render('result', { shortUrl, originalUrl: normalizedUrl });
    } catch (err) {
        console.error("Error:", err);
        return res.render('index', { error: "Something went wrong" });
    }
}

module.exports = { generateURL };
