const { crawlPage } = require('./crawl')
function main() {
    if (process.argv.length < 3) {
        console.log("No Website provided");
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("Too many Command Line Args");
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log("Starting Crawl of", baseURL)
    crawlPage(baseURL)
}



main()