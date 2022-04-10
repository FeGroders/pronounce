const { Deepgram } = require('@deepgram/sdk');
// import fs from 'fs';
const { fs } = require('fs');
// require('dotenv').config();

export function transcribeAudio() {
    return new Promise(resolve => {
        // let deepgramApiKey = process.env.API_DEEPGRAM;  
        // let deepgram = new Deepgram(deepgramApiKey);
        let deepgram = new Deepgram('03b2845e8725320cf161fe51d695c0dfcec4b38e');
        const file = '../public/uploads/record.wav';
        const audio = fs.readFileSync(file);

        source = {
            buffer: audio,
            mimetype: 'audio/wav',
        }

        deepgram.transcription.preRecorded(
            source,
            {
                punctuate: true
            }
        )
        .then((response) => {
            console.dir(response, {depth: null});
            // console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
            resolve(response);
        })
        .catch((err) => {
            console.log(err);
        })
        // resolve(response);
    });
};
