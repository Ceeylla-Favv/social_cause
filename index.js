const express = require('express'); 
const port = 2000;
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const connectDb = require('./db/connectDb')
const fileUpload = require('express-fileupload');
const hotelModel = require('./model/hotel');
const { message } = require('antd');

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
app.post('/api/v1/createHotel', async(req,res)=>{
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
      fileName = '/uploads/' + new Date().getTimezoneOffset() + hotelImage.name
    
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

    for(let i=0; i < req.files.otherImage.filePath; i++){
        const otherImage = req.files.otherImage[1]
        let otherImagePath = __dirname + '/uploads/' + otherImage.name

        await new Promise((resolve)=>{
            otherImage.mv(otherImagePath, (err)=>{
                if (err) throw err;
                console.log(otherImage)
                if(!err) otherImage.push(`uploads${otherImage.name}`);
                resolve(true)
            })
        })
    }

    const {hotelName, address, price} = req.body

    const createHotel = new hotelModel({image: fileName, otherImage: otherImage, hotelName, address, price})
    if(!createHotel){
        res.status(500).json({error: "unable to upload new estate"})
    }
    res.json({message: "hotel added successfully", createHotel})


})

// getting all apartment uploaded
app.get( '/api/v1/getAll', async(req,res)=>{
    const getAll = await hotelModel.find()
    if(!getAll){
        res.status(404).json({error: "unable to get all apartment"})
    }
    res.json({getAll})
})

// to get one apartment uploaded
    app.get('/api/v1/getOne/:hotelName', async(req,res)=>{
        const {hotelName} = req.params
        const findHotel = await hotelModel.findOne({hotelName})
        if(!findHotel){
            res.status(404).json({error: "this hotel is not available"})
        }
        res.json({findHotel})
    } )

    // delete an uploaded apartment 
    app.delete('/api/v1/delete/:hotelName', async(req,res)=>{
        const {hotelName} =req.params
        const deleteHotel = await hotelModel.findOneAndDelete({hotelName})
        if(!deleteHotel){
            res.json({error: "unable to delete apartment"})
        }
        res.json({message: "apartment was deleted successfully"})
    })
    // update request
    app.patch('/api/v1/update/:hotelName', async(req,res)=>{
        const {hotelName} = req.params;
        const updateHotel = await hotelModel.findOneAndUpdate({hotelName}, req.body, {runValidator: true , new: true})
        if(!updateHotel){
            res.json({error: "unable to update"}, req.body, {runValidator: true , new: true})
        }
        res.json({message: "apartment was updated successfully", updateHotel})
    })

app.listen(port, async()=>{
    console.log(`app is runnning on port ${port}`)
    await connectDb()
})

