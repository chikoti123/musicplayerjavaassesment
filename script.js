
// the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
  
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
  
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
  
// Create the audio element for the player
let curr_track = document.createElement('audio');
  
//  list of tracks 
let track_list = [
  {
    name: "Ukulele",
    artist: "Benjamin Tissot",
    image: "ukulele.jpg",
    path: "bensound-ukulele.mp3"
  },
  {
    name: "Better Days",
    artist: "Benjamin Tissot",
    image: "betterdays.jpg",
    path: "bensound-betterdays.mp3"
  },
  {
    name: "Sunny",
    artist: "Benjamin Tissot",
    image: "sunny.jpg",
    path: "bensound-sunny.mp3",
  },
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    //track_art.style.backgroundImage = track_list[track_index].image;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    
    updateTimer = setInterval(seekUpdate, 1000);
    // newtrack
    curr_track.addEventListener("ended", nextTrack);
    
    //  random background color
    random_bg_color();
  }
    
  function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let orange = Math.floor(Math.random() * 256) + 64;
    let pink = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + orange + ", " + pink + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
  }
    
  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    // switch paly and pause
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    
    function playTrack() {
    // Play track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    function pauseTrack() {
    // Pause and play
    curr_track.pause();
    isPlaying = false;
    
    //  play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    function nextTrack() {
    // first track play from last track
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }
    
    function prevTrack() {
    // previious track
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
        
    // new track load
    loadTrack(track_index);
    playTrack();
    }
    function seekTo() {
        // slider
        seekto = curr_track.duration * (seek_slider.value / 100);
        
        // track position
        curr_track.currentTime = seekto;
        }
        
        function setVolume() {
        // Set the volume according to the
        // percentage of the volume slider set
        curr_track.volume = volume_slider.value / 100;
        }
        function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
              seekPosition = curr_track.currentTime * (100 / curr_track.duration);
              seek_slider.value = seekPosition;
        // duration of track
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
      
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      
    
            }
        }
       
        // Load e tracklist
loadTrack(track_index);

        