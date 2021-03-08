const express = require('express')
const puppeteer = require('puppeteer-core')

const PORT = process.env.PORT || 7733
const api = express()

api.get('*', (req, res) => {
    res.send({
        path: req.path,
        args: req.query
    })
})


api.listen(PORT, () => {
    console.log(`App listening @@ ${PORT}`)
})