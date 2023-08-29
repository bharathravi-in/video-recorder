// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Video Recorder</h1>`;

// const cameraFeed = document.getElementById('cameraFeed');

// navigator.mediaDevices.getUserMedia({ video: true })
// .then(stream => {
// cameraFeed.srcObject = stream;
// })
// .catch(error => {
// console.error('Error accessing camera:', error);
// })

async function main() {
  const buttonStart = document.querySelector('#buttonStart');
  const buttonStop = document.querySelector('#buttonStop');
  const videoLive = document.querySelector('#videoLive');
  const videoRecorded = document.querySelector('#videoRecorded');

  const stream = await navigator.mediaDevices.getUserMedia({
    // <1>
    video: true,
    audio: true,
  });

  videoLive.srcObject = stream;

  if (!MediaRecorder.isTypeSupported('video/webm')) {
    // <2>
    console.warn('video/webm is not supported');
  }

  const mediaRecorder = new MediaRecorder(stream, {
    // <3>
    mimeType: 'video/webm',
  });

  buttonStart.addEventListener('click', () => {
    mediaRecorder.start(); // <4>
    buttonStart.setAttribute('disabled', '');
    buttonStop.removeAttribute('disabled');
  });

  buttonStop.addEventListener('click', () => {
    mediaRecorder.stop(); // <5>
    buttonStart.removeAttribute('disabled');
    buttonStop.setAttribute('disabled', '');
  });

  mediaRecorder.addEventListener('dataavailable', (event) => {
    console.log(URL.createObjectURL(event.data), 'hiii');
    videoRecorded.src = URL.createObjectURL(event.data); // <6>
  });
}

main();
