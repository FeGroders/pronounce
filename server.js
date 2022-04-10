const express = require('express'); 
const app = express(); 
const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 
const port = '3030';
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.get('/upload', (req, res) => {
  res.send('Server is running');
});

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname 
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 
  res.sendStatus(200); 
})

app.use(express.static('public'))

app.listen(port, function(){
  console.log("app listening on port " + port);
})