const { Deepgram } = require('@deepgram/sdk');
// require('dotenv').config();

export function transcribeAudio(audio) {
    return new Promise(resolve => {
        let deepgramApiKey = process.env.API_DEEPGRAM;  
        let deepgram = new Deepgram(deepgramApiKey);

        console.log('audio', audio);
        const audioUrl = URL.createObjectURL(audio.audioBlob);
        let source = { url: audio.audioUrl };

        deepgram.transcription.preRecorded(
            source,
            {
                punctuate: true
            }
        )
        .then((response) => {
            console.log('response', response);
            // console.dir(response, {depth: null});
            // console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
        })
        .catch((err) => {
            console.log(err);
        })
        // resolve(response);
    });
};
