const axios = require('axios').default;

// async function uploadAudio(audioBlob) {
//   await postAudio(audioBlob).then((response) => {
//     console.log('respoxta', response);
//     if (response === true) {
//       console.log('audio enviado');
//       return true;
//     } 
//     return false;
//   });
// };

// function postAudio(audioBlob) {
  // return new Promise(resolve => {
  //   let formdata = new FormData(); 
  //   formdata.append('soundBlob', audioBlob, 'record.wav'); 
  //   var serverUrl = 'http://localhost:3030/upload'; 
  //   var httpRequestOptions = {
  //     method: 'POST',
  //     body: formdata , 
  //     headers: new Headers({
  //       'enctype': 'multipart/form-data',
  //     })
  //   };

  //   axios.post(serverUrl, formdata, httpRequestOptions)
  //     .then(function (response) {
  //       if (response.status === 200) {
  //         resolve(true);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   });

  // };

  
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

                  // var isUploaded = await uploadAudio(audioBlob);
                  // console.log('isUploaded', isUploaded);
                  // resolve({ audioBlob, play, isUploaded });


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
                        resolve({ audioBlob, play, isUploaded: true });
                      } else {
                        resolve({ audioBlob, play, isUploaded: false });
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                      resolve({ audioBlob, play, isUploaded: true });
                    });
                    // resolve({ audioBlob, play, isUploaded: false });
                });
    
                mediaRecorder.stop();
              });
            };
    
            resolve({ start, stop });
          });
      });
}