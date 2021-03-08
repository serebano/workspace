const express = require('express')
const dotenv = require('dotenv')
const puppeteer = require('puppeteer-core')
const debug = require('debug')('scrapp:api')

dotenv.config()

const PORT = process.env.PORT || 7733
const BROWSER_WS_ENDPOINT = process.env.SCRAPP_BROWSER_WS_ENDPOINT
const api = express()

async function fun(handle, ...args) {
    const page = await api.browser.newPage()
    const ctx = { fun, page }

    try {
        await fun(ctx, ...args)
    } catch(e) {
        debug(`${e.message}`)
        throw e
    }
}

api.get('*', (req, res) => {
    debug(`[GET] ${req.path} [${JSON.stringify(req.query)}]`)

    res.json({
        path: req.path,
        args: req.query
    })
})


puppeteer.connect({
    browserWSEndpoint: BROWSER_WS_ENDPOINT
}).then(browser => {
    api.browser = browser
    debug(`Browser Connected [${BROWSER_WS_ENDPOINT}]`)
})

api.listen(PORT, () => {
    debug(`API @ ${PORT}`)
})