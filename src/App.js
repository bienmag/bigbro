 import './App.css';
import data from './data.json'
function  App() {
   const videoElement = document.getElementById('root')
  const canvas = document.getElementById('canvas')
  canvas.width = videoElement.clientWidth
  canvas.height = videoElement.clientHeight
  const context = canvas.getContext('2d')
  
  videoElement.parentNode.insertBefore(canvas, videoElement)


  function drawBoxes() {

    const frameRate = data.fps
    const currentTimeInSeconds = videoElement.currentTime;
    const currentFrame = Math.floor(currentTimeInSeconds * frameRate);
    context.clearRect(0,0,canvas.width, canvas.height)


    function drawBoxesForObject(objectId) {
      const objectData = data.supertracks[objectId];
      
      if (objectData && objectData.tracks_data) {
        const tracksData = objectData.tracks_data;
        for (const trackData of tracksData) {
          if (currentFrame >= trackData.frame_start && currentFrame <= trackData.frame_end) {
       console.log('bingo!')
            const trackId = trackData.track_id;
            const trackInfo = data.tracks[trackId];
            if (trackInfo) {
              const frameData = trackInfo[currentFrame];
              if (frameData) {
                const [x1, y1, x2, y2] = frameData;
                
                const newBoxX1 = x1 + 105;
                const newBoxX2 = x2 + 105;
                context.strokeStyle = 'blue';
                context.lineWidth = 2;
                context.strokeRect(newBoxX1, y1, newBoxX2 - newBoxX1, y2 - y1);
              }
            }
          }
        }
      }
    }


    const objectIds = Object.keys(data.supertracks);
    objectIds.forEach(objectId => {
      drawBoxesForObject(objectId);
    });

    requestAnimationFrame(drawBoxes);
  }

// Начните отрисовку боксов при воспроизведении видео
videoElement.addEventListener("play", function () {
  drawBoxes();
});

// Остановите отрисовку боксов при паузе видео
videoElement.addEventListener("pause", function () {
//  cancelAnimationFrame(requestId)
});

// Воспользуйтесь этим кодом, чтобы начать и остановить отрисовку при кликах на видео
videoElement.addEventListener("click", function () {
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
});



 
 
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
