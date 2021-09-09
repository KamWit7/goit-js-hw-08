import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const showTime = seconds => console.log(Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60));

const playOfLastSavedTime = () => {
  player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time')) // set saved time
    .catch(err =>
      err.name === 'RangeError' ? alert('Time value out of range') : console.log(err.name),
    );
};

const setVideoTime = () => {
  player
    .getCurrentTime()
    .then(sec => {
      localStorage.setItem('videoplayer-current-time', sec); //save time
      showTime(sec); // see time in console
    })
    .catch(err => console.log(err.name));
};

playOfLastSavedTime();
player.on('timeupdate', throttle(setVideoTime, 1 * 1000));

// const getStorageTime = () => localStorage.getItem('videoplayer-current-time');
// const setStorageTime = seconds => localStorage.setItem('videoplayer-current-time', seconds);
