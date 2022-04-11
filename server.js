const express = require('express'); 
const app = express(); 
const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 
const port = '3030';
const cors = require('cors');
const { Deepgram } = require("@deepgram/sdk");

app.use(cors({origin: '*'}));

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname 
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 

  console.log('uploadLocation', uploadLocation);
  const deepgramApiKey = '03b2845e8725320cf161fe51d695c0dfcec4b38e';
  const file = uploadLocation;
  const mimetype = 'audio/wav';
  const deepgram = new Deepgram(deepgramApiKey);
  const audio = fs.readFileSync(file);

  source = {
    buffer: audio,
    mimetype: mimetype
  }
  
  deepgram.transcription.preRecorded(
    source,
    {
      punctuate: true
    }
  )
  .then((response) => {
    res.send(response.results.channels[0].alternatives[0].transcript);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
})

app.use(express.static('public'))

app.listen(port, function(){
  console.log("app listening on port " + port);
})