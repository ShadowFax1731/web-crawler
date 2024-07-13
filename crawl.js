const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')

    for (const link of links)
        if (link.href.slice(0, 1) === '/') {
            //relative 

            try {
                const url = new URL(`${baseURL}${link.href}`)
                urls.push(url.href)
            } catch (error) {
                console.log("Error with relative URL", error.message)
            }

        } else {
            //absolute URL
            try {
                const url = new URL(link.href)
                urls.push(url.href)
            } catch (error) {
                console.log("Error with absolute URL", error.message)
            }
        }

    return urls
}

function normalizeURL(urlString) {

    const url = new URL(urlString)

    const hostPath = `${url.hostname}${url.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}