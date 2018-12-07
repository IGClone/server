// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFileName: './keyfile-vision'
});

class VisionController {
    static detectTags (req, res, next) {
        let url = req.publicUrl
        client
            .labelDetection(url)
            .then(results => {
                const labels = results[0].labelAnnotations;
                let tags = []
                labels.forEach(label => tags.push(label.description))
                req.labels = tags
                console.log(tags)
                next()
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}


module.exports = VisionController