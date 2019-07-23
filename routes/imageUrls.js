const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Images extracting function
async function scrollDown(page) {
    try {
        await page.evaluate(
            async () =>
                new Promise((resolve, reject) => {
                    try {
                        let maxIntervals = 25;
                        const interval = setInterval(() => {
                            const offset = document.body.offsetHeight;
                            const { scrollY, screen: { height } } = window;
                            window.scrollBy(0, offset);
                            if (maxIntervals > 0 && offset - scrollY > height) {
                                maxIntervals -= 1;
                            } else {
                                clearInterval(interval);
                                resolve();
                            }
                        }, 1500);
                    } catch (error) {
                        reject(error);
                    }
                })
        );
    } catch (error) {
        console.log('- Error while scrolling:', error);
    } finally {
        console.log('- Scrolling finished.');
    }
}

// Images extracting function
async function extracUrls(imageName) {
    const googleUrl = `https://www.google.com/search?q=${imageName}&tbm=isch`;
    
    console.log('- Launching browser.');
    const browser = await puppeteer.launch({ headless: true });
    
    console.log('- Launching page.');
    const page = await browser.newPage();

    console.log('- Going to:', googleUrl);
    await page.goto(googleUrl);
    
    const imagesUrls = [];
    
    page.on('response', (interceptedResponse) => {
        const request = interceptedResponse.request();
        const resource = request.resourceType();
        if (resource === 'image') {
            const url = request.url();
            if (url.indexOf('images') > 0) {
                imagesUrls.push(url);
            }
        }
    });
      
    await scrollDown(page);
    await browser.close();
    return imagesUrls;
}

router.post('/getImageUrl', urlencodedParser, async(req, res) => {
    try {
        const target = [req.body.target];
        if (target.length) {
            const [imageName] = target;
            console.log(`- Looking for '${imageName}'.`);
            var urls = await extracUrls(imageName);

            console.log('- Retrived images:', urls.length);
            console.log('- Done.')
            res.send(urls);
        }
        res.status(400).send("An 'imageName' argument is required.");
    }
    catch (error) {
        console.error(error, 'Error occur during Image extraction process');
    }
})

module.exports = router;
