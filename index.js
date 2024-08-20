const express = require('express'); 
const port = 2000;
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const connectDb = require('./db/connectDb')
const fileUpload = require('express-fileupload');
const hotelModel = require('./model/hotel');

// exxpress to json
app.use(express.json())
// use express file upload
app.use(fileUpload())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req,res)=>{
    console.log("app is running fine")
})


// create new reak estate
app.post('/api/v1/createHotel', (req,res)=>{

    // to upload the main image
    let hotelImage;
    let filePath;
    let fileName;
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
      }
    
      console.log('req.files >>>', req.files);
    
      hotelImage = req.files.image;
      fileName = '/uploads/' + new Date().getTimezoneOffset() + hotelImage.image
    
      filePath = __dirname + '/uploads/' + fileName.name;
    
      hotelImage.mv(filePath, function(err) {
        if (err) {
            return res.status(500).send(err);
          }
      })

    //   to upload other images 
    const otherImage = []
    req.files.otherImage = !req.files.otherImage.length
    ? [req.files.otherImage]
    :req.files.otherImage

    for(let i=0; i < req.files.otherImage.filePath)
    



    const {hotelName, address, price} = req.body

    const createHotel = new hotelModel({image: hotelImage, hotelName, address, price})
    if(!createHotel){
        res.status(500).json({error: "unable to upload new estate"})
    }
    res.json({message: "hotel added successfully"})


})

app.listen(port, async()=>{
    console.log(`app is runnning on port ${port}`)
    await connectDb()
})

