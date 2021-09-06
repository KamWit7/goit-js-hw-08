import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const showTime = seconds => Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60);
const getStorageTime = () => localStorage.getItem('videoplayer-current-time');
const setStorageTime = seconds => localStorage.setItem('videoplayer-current-time', seconds);

const setVideoTime = videoTime => {
  player
    .setCurrentTime(videoTime())
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          alert('Time value out of range');
          break;
        default:
          console.log(error.name);
          break;
      }
    });
};

const playOfLastSavedTime = () => {
  player
    .getCurrentTime()
    .then(function (seconds) {
      setStorageTime(seconds);
      console.log(showTime(seconds));
    })
    .catch(function (error) {
      console.log(error);
    });
};

setVideoTime(getStorageTime);
player.on('timeupdate', throttle(playOfLastSavedTime, 1000));
