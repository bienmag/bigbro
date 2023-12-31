import data from "./data.json";
function App() {
  const videoElement = document.getElementById("root");
  const canvas = document.getElementById("canvas");

  function resizeCanvas() {
    canvas.width = videoElement.clientWidth;
    canvas.height = videoElement.clientHeight;
  }

  videoElement.parentNode.insertBefore(canvas, videoElement);

  function drawBoxes() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const frameRate = data.fps;
    const currentTimeInSeconds = videoElement.currentTime;
    const currentFrame = Math.floor(currentTimeInSeconds * frameRate);

    function drawBoxesForObject(objectId) {
      const objectData = data.supertracks[objectId];

      if (objectData && objectData.tracks_data) {
        const tracksData = objectData.tracks_data;
        for (const trackData of tracksData) {
          if (
            currentFrame >= trackData.frame_start &&
            currentFrame <= trackData.frame_end
          ) {
            console.log("bingo!");
            const trackId = trackData.track_id;
            const trackInfo = data.tracks[trackId];
            if (trackInfo) {
              const frameData = trackInfo[currentFrame];
              if (frameData) {
                const [x1, y1, x2, y2] = frameData;

                context.strokeStyle = "blue";
                context.lineWidth = 2;
                context.strokeRect(x1, y1, x2 - x1, y2 - y1);
              }
            }
          }
        }
      }
    }

    const objectIds = Object.keys(data.supertracks);
    objectIds.forEach((objectId) => {
      drawBoxesForObject(objectId);
    });

    requestAnimationFrame(drawBoxes);
  }

  videoElement.addEventListener("play", function () {
    resizeCanvas();
    drawBoxes();
  });

  window.addEventListener("resize", resizeCanvas);

  videoElement.addEventListener("pause", function () {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  videoElement.addEventListener("click", function () {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });

  return <></>;
}

export default App;
