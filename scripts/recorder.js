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
                  const audioUrl = URL.createObjectURL(audioBlob);
                  const audio = new Audio(audioUrl);
                  const play = () => {
                    audio.play();
                  };
    
                  resolve({ audioBlob, audioUrl, play });
                });
    
                mediaRecorder.stop();
              });
            };
    
            resolve({ start, stop });
          });
      });
}