


function initRegularVideoPlayer (data) {

    var Q1 = true;
    var Q2 = true;
    var Q3 = true;
    var Q4 = true;

    var pixel0 = "[%VideoStartTracker%]";
    var pixel25 = "[%VideoFirstQtr%]";
    var pixel50 = "[%VideoSecondQtr%]";
    var pixel75 = "[%VideoThirdQtr%]";
    var pixel100 = "[%VideoComplete%]";
    var duration;
    var vidUnits;

  

	var Rvideo = document.getElementById('regular-player');
	
    if (Hls.isSupported()) {
		var hls = new Hls();
		hls.loadSource(data.hls);
		hls.attachMedia(Rvideo);
		hls.on(Hls.Events.MANIFEST_PARSED, function() { if (data.autoplay) { Rvideo.play();}});
	}

	// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
	// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
	// This is using the built-in support of the plain video element, without using hls.js.
	// Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
	// white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.

	else if (Rvideo.canPlayType('application/vnd.apple.mpegurl')) {
		Rvideo.src = data.mp4;
		Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
	}

    Rvideo.addEventListener('play', (event) => {
       if (data.debug) console.log("video is playing");
    });

    Rvideo.addEventListener('pause', (event) => {
      if (data.debug) console.log("video is paused");
    });

    Rvideo.addEventListener('loadedmetadata', (event) => {
      
        duration = event.target.duration;
        vidUnits = duration / 100;
      
        if (data.debug) console.log('The duration and dimensions ' + ' of the media and tracks are now known. ');
        if (data.debug) console.log(event.target);
        if (data.debug) console.log("video is loadedmetadata", duration);
    });

    Rvideo.addEventListener('loadeddata', (event) => {
      if (data.debug) console.log("video is loadeddata");
    });

    Rvideo.addEventListener('error', (event) => {
      if (data.debug) console.log("video is error");
    });

    Rvideo.addEventListener('ended', (event) => {
      if (data.debug) console.log("video is ended");
        Q1 = true;
        Q2 = true;
        Q3 = true;
        Q4 = true;
    });

    Rvideo.addEventListener('emptied', (event) => {
      if (data.debug) console.log("video is emptied");
    });

    Rvideo.addEventListener('durationchange', (event) => {
      if (data.debug) console.log("video is durationchange");
    });

    Rvideo.addEventListener('canplaythrough', (event) => {
      if (data.debug) console.log("video is canplaythrough");
    });

    Rvideo.addEventListener('canplay', (event) => {
      if (data.debug) console.log("video is canplay");
    });

    Rvideo.addEventListener('abort', (event) => {
      if (data.debug) console.log("video is abort");
    });

    Rvideo.addEventListener('progress', (event) => {
      if (data.debug) console.log("video is progress");
    });

    Rvideo.addEventListener('ratechange', (event) => {
      if (data.debug) console.log("video is ratechange");
    });

    Rvideo.addEventListener('seeking', (event) => {
      if (data.debug) console.log("video is seeking");
    });

    Rvideo.addEventListener('stalled', (event) => {
      if (data.debug) console.log("video is stalled");
    });

    Rvideo.addEventListener('suspend', (event) => {
      if (data.debug) console.log("video is suspend");
    });

    Rvideo.addEventListener('timeupdate', (event) => {
      if (data.debug) console.log("video is timeupdate",event.target.currentTime);

        var CurTime = event.target.currentTime;
        var CurPercent = CurTime / vidUnits;
        var curPerRounded = Math.round(CurPercent);

        if (curPerRounded === 25) {
            if (Q1) {
               if (data.debug) console.log(" yo its 25% ");
               data.trackingFunction(pixel25);
               Q1 = false;
            }
           
        }

        if (curPerRounded == 50) {
            if (Q2) {
               if (data.debug) console.log(" yo its 50% ");
               data.trackingFunction(pixel50);
               Q2 = false;
            }
           
        }

        if (curPerRounded == 75) {
            if (Q3) {
               if (data.debug) console.log(" yo its 75% ");
               data.trackingFunction(pixel75);
               Q3 = false;
            }
            
        }

        if (curPerRounded == 99) {
            if (Q4) {
               if (data.debug) console.log(" yo its 100% ");
               data.trackingFunction(pixel100);
               Q4 = false;
            }
            
        }


        if (data.debug) console.log("Current Time: ",CurTime, "  Current Percentage: ", CurPercent);


    });

    Rvideo.addEventListener('volumechange', (event) => {
      if (data.debug) console.log("video is volumechange");
    });

    Rvideo.addEventListener('waiting', (event) => {
      if (data.debug) console.log("video is waiting");
    });

    Rvideo.addEventListener('waiting', (event) => {
      if (data.debug) console.log("video is waiting");
    });

    Rvideo.addEventListener('waiting', (event) => {
      if (data.debug) console.log("video is waiting");
    });

    Rvideo.addEventListener('waiting', (event) => {
      if (data.debug) console.log("video is waiting");
    });

    Rvideo.addEventListener('loadstart', (event) => {
      if (data.debug) console.log("video is loadstart");
    });

    Rvideo.addEventListener('playing', (event) => {
      if (data.debug) console.log("video is playing");
    });

}
