const { JSDOM } = require('jsdom')


async function crawlPage(currentURL) {
    console.log("Actively Crawling:", currentURL)

    try {

        const response = await fetch(currentURL)

        if (response.status > 399) {
            console.log("Error in fetch with status code:", response.status, "on page:", currentURL)
            return;
        }

        const contentType = response.headers.get('content-type')

        if (!contentType.includes('text/html')) {
            console.log("Non HTML Response, Content Type:", contentType, "on page:", currentURL)
            return

        }

        console.log(await response.text());
    } catch (error) {
        console.log("Error in fetch:", error.message, "on page:", currentURL)
    }

}

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
    getURLsFromHTML,
    crawlPage
}