const express = require('express'); 
const app = express(); 
const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 
const port = '3030';
const cors = require('cors');
const { Deepgram } = require("@deepgram/sdk");

function transcribeAudio(filePath) {
  const deepgramApiKey = '03b2845e8725320cf161fe51d695c0dfcec4b38e';
  const file = './public/uploads/record.wav';
  const mimetype = 'audio/wav';

  // Initialize the Deepgram SDK
  const deepgram = new Deepgram(deepgramApiKey);

  const audio = fs.readFileSync(file);

  // Set the source
  source = {
    buffer: audio,
    mimetype: mimetype
  }
  
  // Send the audio to Deepgram and get the response
  deepgram.transcription.preRecorded(
    source,
    {
      punctuate: true
    }
  )
  .then((response) => {
    // console.dir(response, {depth: null});
    console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
    return response.results.channels[0].alternatives[0].transcript, { depth: null };
  })
  .catch((err) => {
    console.log(err);
  })
}

app.use(cors({
  origin: '*'
}));

app.get('/upload', (req, res) => {
  var msg = transcribeAudio('/home/groders/Documentos/Projetos/pronounce2/public/uploads/record.wav');
  // res.sendStatus(200); 
  res.send(msg);
});

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname 
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 

  console.log('uploadLocation', uploadLocation);
  var msg = transcribeAudio(uploadLocation);
  res.sendStatus(200); 
  // res.send(msg);
})

app.use(express.static('public'))

app.listen(port, function(){
  console.log("app listening on port " + port);
})