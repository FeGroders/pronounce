const { Deepgram } = require('@deepgram/sdk');
// import fs from 'fs';
// require('dotenv').config();

export function transcribeAudio(audio) {
    return new Promise(resolve => {
        // let deepgramApiKey = process.env.API_DEEPGRAM;  
        // let deepgram = new Deepgram(deepgramApiKey);
        let deepgram = new Deepgram('03b2845e8725320cf161fe51d695c0dfcec4b38e');

        let sla = '';

        const source = {
            buffer: sla,
            mimetype: 'audio/wav', 
        };

        // let source = { URL: audio };

        deepgram.transcription.preRecorded(
            source,
            {
                punctuate: true
            }
        )
        .then((response) => {
            console.log('response', response);
            resolve(response);
            // console.dir(response, {depth: null});
            // console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
        })
        .catch((err) => {
            console.log(err);
        })
        // resolve(response);
    });
};
