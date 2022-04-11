const axios = require('axios').default;
  
export function recordAudio() {
    console.log('recordAudio');

    return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];
    
            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });
    
            const start = () => {
                console.log('start');
              mediaRecorder.start();
            };
    
            const stop = () => {
                console.log('stop');
              return new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                  const audioBlob = new Blob(audioChunks);
                  const play = () => {
                    audio.play();
                  };

                  let formdata = new FormData(); 
                  formdata.append('soundBlob', audioBlob, 'record.wav'); 
                  var serverUrl = 'http://localhost:3030/upload'; 
                  var httpRequestOptions = {
                    method: 'POST',
                    body: formdata , 
                    headers: new Headers({
                      'enctype': 'multipart/form-data',
                    })
                  };

                  axios.post(serverUrl, formdata, httpRequestOptions)
                    .then(function (response) {
                      if (response.status === 200) {
                        var transcription = response.data;
                        resolve({ play, isUploaded: true, transcription });
                      } else {
                        resolve({ play, isUploaded: false });
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                      resolve({ play, isUploaded: false });
                    });
                });
    
                mediaRecorder.stop();
              });
            };
    
            resolve({ start, stop });
          });
      });
}