require('dotenv').config()
const { Storage }= require('@google-cloud/storage')
const format = require('util').format;

const storage = new Storage({
    projectId : 'e-commerce-222212',
    keyFilename : './keyfile.json'
})
const bucket = storage.bucket(process.env.BUCKET_NAME)

module.exports = {
    uploadSingle : (req, res, next) =>{
        if( !req.file ){
            res.status(400).json({ message : 'file tidak ada!'})
            return
        }else{
            console.log('file ada !')
        }
        const blob = bucket.file(req.file.originalname)
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
        blobStream.on('error', err => {
            console.log('ini error :', err )
          next(err)
        });
        
        blobStream.on('finish', () => {
          
        // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
           req.publicUrl = publicUrl
           next()
        });
        blobStream.end(req.file.buffer);
    }    
}
