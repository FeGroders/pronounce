const { Deepgram } = require('@deepgram/sdk');
// require('dotenv').config();

export function transcribeAudio(audio) {
    return new Promise(resolve => {
        // let deepgramApiKey = process.env.API_DEEPGRAM;  
        // let deepgram = new Deepgram(deepgramApiKey);
        let deepgram = new Deepgram('03b2845e8725320cf161fe51d695c0dfcec4b38e');

        console.log('audio', audio);
        // const audioUrl = URL.createObjectURL(audio.audioBlob);
        let source = { url: audio.audioUrl };
        console.log('source', source);
        // let source = { url: audioUrl };

        deepgram.transcription.preRecorded(
            {
                buffer: audio.audioBlob,
                mimetype: 'audio/wav',
            },
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
