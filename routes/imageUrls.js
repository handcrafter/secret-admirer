const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Images extracting function
async function getImageURL(page) {
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
                        }, 500);
                    } catch (error) {
                        reject(error);
                    }
                })
        );
    } catch (error) {
        console.error('- Error while scrolling:', error);
    } finally {
        console.error('- Scrolling finished.');
    }
}

// Images extracting function
async function getMoreImageURL(page) {
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
                        }, 800);
                    } catch (error) {
                        reject(error);
                    }
                })
        );
    } catch (error) {
        console.error('- Error while scrolling:', error);
    } finally {
        console.error('- Scrolling finished.');
    }
}

// Images extracting function
async function extractUrls(imageName) {
    const googleUrl = `https://www.google.com/search?q=${imageName}&tbm=isch`;    
    
    console.log('- Launching browser.');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    
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
    await getImageURL(page);
    await browser.close();
    return imagesUrls;
}

async function extractMoreUrls(imageName) {
    const googleUrl = `https://www.google.com/search?q=${imageName}&tbm=isch`;
    
    console.log('- Launching browser.');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    
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
    await getMoreImageURL(page);
    await browser.close();
    return imagesUrls;
}

router.post('/getImageUrl', urlencodedParser, async(req, res) => {
    try {
        const target = [req.body.target];
        if (target.length === 0) {
            res.status(400).send("Invalid search target: target must not be empty");
        } else {
            const [imageName] = target;
            console.log(`- Looking for '${imageName}'.`);
            var urls = await extractUrls(imageName);
            
            // Prevent returning 0 images
            while (urls.length === 0) {
                urls = await extractUrls(imageName);
            }

            console.log('- Retrived images:', urls.length);
            res.send(urls);
        }
    }
    catch (error) {
        console.error(error, 'Error occur during Image extraction process');
    }
})

router.post('/getMoreImageUrl', urlencodedParser, async(req, res) => {
    try {
        const target = [req.body.target];
        if (target.length === 0) {
            res.status(400).send("Invalid search target: target must not be empty");
        } else {
            const [imageName] = target;
            console.log(`- Looking for '${imageName}'.`);
            var urls = await extractMoreUrls(imageName);

            console.log('- Retrived images:', urls.length);
            res.send(urls);
        }
    }
    catch (error) {
        console.error(error, 'Error occur during Image extraction process');
    }
})

module.exports = router;
