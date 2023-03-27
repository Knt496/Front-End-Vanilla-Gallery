const runVideo = (src) => {
  //keys
  const keys = {
    spaceKey: 13,
    enterKey: 32,
    leftKey: 37,
    rightKey: 39
  };

  const wrapper = document.getElementById("wrapper");
  const player  = document.createElement("video");

  player.id  = "player";
  player.src =  src;
  player.style.width = "100%";
  player.style.height = "100%";
  player.muted = true;

  //add video
  wrapper.appendChild(player);

  player.play();

  const playPause = () => {
    if(player.paused) {
      console.log("playing");
      player.play();
    }
    else {
      console.log("paused");
      player.pause();
    }
  };

  const movePlayer = (direction) => {
    const timeToSkip = 5;
    direction == "left" ?
      player.currentTime -= timeToSkip :
      player.currentTime += timeToSkip;
  };

  const formatTime = (time) => {
    let min     = Math.floor(time / 60);
    let sec     = Math.round(time % 60);

    min < 10 && (min = `0${min}`);
    sec < 10 && (sec = `0${sec}`);

    return `${min} : ${sec}`;
  };

  const updateTimer = () => {
    const timer = document.getElementById("timer");
    const time  = player.currentTime; 
    const totalTime =  player.duration;
  
    timer.innerHTML = `${formatTime(time)} / ${formatTime(totalTime)}`;
  };


  //adding buttons
  const btnPrev = document.getElementById("btn-prev");
  const btnPlay = document.getElementById("btn-play");
  const btnNext = document.getElementById("btn-next");

  btnPrev.addEventListener("click", () => movePlayer("left"));
  btnPlay.addEventListener("click", () => playPause());
  btnNext.addEventListener("click", () => movePlayer("right"));

  document.addEventListener("keydown", handleKey);
  player.addEventListener("click", playPause);
  player.addEventListener("playing", () => {
    setInterval(() => {
      updateTimer();
    }, 1000);
  });

  function handleKey(e) {
    
    console.log(e.keyCode, e.key);
    switch(e.keyCode) {
      case keys.spaceKey:
      case keys.enterKey:
        //play/pause
        playPause();
        break;
      case keys.leftKey:
        //left
        movePlayer("left");
        break;
      case keys.rightKey:
        //right
        movePlayer("right");
        break;
      default:
        console.log("undefined key:", e.keyCode);
    }
  }
};

runVideo("https://cdn-media.brightline.tv/demo/disney-beta/assets/videos/bbb_sunflower_1080p_30fps_normal.mp4");