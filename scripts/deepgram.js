const { Deepgram } = require('@deepgram/sdk');
import fs from 'fs';

export function transcribeAudio(audio) {
    const deepgramApiKey = process.env.local.API_DEEPGRAM;    
    require('dotenv').config();
    let deepgram = new Deepgram(deepgramApiKey);
    console.log('transcribeAudio');
    let source = { url: audio };

    deepgram.transcription.preRecorded(
    source,
    {
        punctuate: true
    }
    )
    .then((response) => {
    console.dir(response, {depth: null});

    console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
    })
    .catch((err) => {
    console.log(err);
    })
};