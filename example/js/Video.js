

class Video {
  constructor (data) {

    let Q1 = true;
    let Q2 = true;
    let Q3 = true;
    let Q4 = true;

    const pixel0 = data.TrackingPixels["0%"];
    const pixel25 = data.TrackingPixels["25%"];
    const pixel50 = data.TrackingPixels["50%"];
    const pixel75 = data.TrackingPixels["75%"];
    const pixel100 = data.TrackingPixels["100%"];
   

    let Scope = this;
    let duration;
    let vidUnits;

	const Rvideo = document.getElementById(data.id);
	const Container = Rvideo.parentElement;

	var videoOverlay = this.MakePoster("overlay-" + data.id, data.poster);
	Container.appendChild(videoOverlay);

	var posterElement = this.MakePoster(data.id, data.poster);
	var posterBG = this.MakePosterBG(data.id, data.poster);
	var posterPlayBtn = this.MakePlayButtonOverPoster (data.id, data.playbutton);

	posterElement.className += "poster-frame"; 

	posterElement.appendChild(posterBG);
	posterElement.appendChild(posterPlayBtn);
	Container.appendChild(posterElement);  

	posterBG.addEventListener("click", function() {
		eventTracker.generalEventTrack('clickURL', 'cta', '%%CLICK_URL_UNESC%%%%DEST_URL_UNESC%%');
	});

	posterPlayBtn.addEventListener("click", function() {
		Rvideo.play();
	});

	if (data.autoplay) { posterElement.style.display = "none";}
	else { 
		if (data.poster) { Rvideo.setAttribute('poster', data.poster ); }
		Rvideo.style.display = "none";
	}

	if (data.class) { Rvideo.className += data.class; }

	if (data.inline) { Rvideo.setAttribute('playsinline', '');}

	if (data.muted) { Rvideo.muted = true;}

	if (data.controls) { Rvideo.controls = true;}

	if (data.autoplay) { Rvideo.autoplay = true;}

	if (data.preload) { Rvideo.setAttribute('preload', data.preload );}
  

    	// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
		// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
		// This is using the built-in support of the plain video element, without using hls.js.
		// Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
		// white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
    
    if (data.hls) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(data.hls);
        hls.attachMedia(Rvideo);
        hls.on(Hls.Events.MANIFEST_PARSED, function() { if (data.autoplay) { Rvideo.play();}});
      }
    
      else if (Rvideo.canPlayType('application/vnd.apple.mpegurl')) {
        Rvideo.src = data.mp4;
        Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
      }
    }
    else {
      Rvideo.src = data.mp4;
      Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
    }
 

    Rvideo.addEventListener('play', (event) => {
       if (data.debug) console.log("video is playing");
       if (data.TrackingPixels) this.FirePixel(pixel0);
       
    });

    Rvideo.addEventListener('pause', (event) => {
	  if (data.debug) console.log("video is paused");
	  posterElement.style.display = "block";
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

       // console.log(posterElement);
        posterElement.style.display = "block";
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

      //this.TimeUpdate(event);

      
        let CurTime = event.target.currentTime;
        let CurPercent = CurTime / vidUnits;
        let curPerRounded = Math.round(CurPercent);

        if (curPerRounded === 25) {
            if (Q1) {
               if (data.debug) console.log(" yo its 25% ");
               if (data.TrackingPixels) this.FirePixel(pixel25);
               Q1 = false;
            }
           
        }

        if (curPerRounded == 50) {
            if (Q2) {
               if (data.debug) console.log(" yo its 50% ");
               if (data.TrackingPixels) this.FirePixel(pixel50);
               Q2 = false;
            }
           
        }

        if (curPerRounded == 75) {
            if (Q3) {
               if (data.debug) console.log(" yo its 75% ");
               if (data.TrackingPixels) this.FirePixel(pixel75);
               Q3 = false;
            }
            
        }

        if (curPerRounded == 99) {
            if (Q4) {
               if (data.debug) console.log(" yo its 100% ");
               if (data.TrackingPixels) this.FirePixel(pixel100);
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

    Rvideo.addEventListener('loadstart', (event) => {
      if (data.debug) console.log("video is loadstart");
    });

    Rvideo.addEventListener('playing', (event) => {
		if (data.debug) console.log("video is playing");
		posterElement.style.display = "none";
		Rvideo.style.display = "block";
    });
  }

  TimeUpdate (event) {
    let CurTime = event.target.currentTime;
    let CurPercent = CurTime / this.vidUnits;
    let curPerRounded = Math.round(CurPercent);

    if (curPerRounded === 25) {
        if (Q1) {
           if (data.debug) console.log(" yo its 25% ");
           if (data.TrackingPixels) this.FirePixel(pixel25);
           Q1 = false;
        }
       
    }

    if (curPerRounded == 50) {
        if (Q2) {
           if (data.debug) console.log(" yo its 50% ");
           if (data.TrackingPixels) this.FirePixel(pixel50);
           Q2 = false;
        }
       
    }

    if (curPerRounded == 75) {
        if (Q3) {
           if (data.debug) console.log(" yo its 75% ");
           if (data.TrackingPixels) this.FirePixel(pixel75);
           Q3 = false;
        }
        
    }

    if (curPerRounded == 99) {
        if (Q4) {
           if (data.debug) console.log(" yo its 100% ");
           if (data.TrackingPixels) this.FirePixel(pixel100);
           Q4 = false;
        }
    }
  }

	MakeElements (what,ID) {
		var Element = document.createElement(what); 
		Element.setAttribute('id', 'Element-' + ID);
		return Element;
	}

	MakePoster (ID, imageurl) {
		var poster = this.MakeElements("div",ID);
		poster.style.width = "100%";
		poster.style.height = "100%";
		poster.style.position = "absolute";
		poster.style.top = "0px";
		poster.style.left = "0px";
		return poster;
	}

	MakePosterBG (ID, imageurl) {
		var poster = this.MakeElements("div","background-" + ID);
		poster.style.width = "100%";
		poster.style.height = "100%";
		poster.style.position = "absolute";
		poster.style.top = "0px";
		poster.style.left = "0px";
		poster.style.backgroundImage = 'url(' + imageurl + ')';
		poster.style.backgroundSize = "cover";
		poster.style.backgroundPosition = "50%";
		poster.style.backgroundRepeat = "no-repeat";
		return poster;
	}

	MakePlayButtonOverPoster (ID, imageurl) {
		var playBtn = this.MakeElements("div","play-button-" + ID);
		playBtn.style.position = "absolute";
		playBtn.style.backgroundImage = 'url(' + imageurl + ')';
		playBtn.style.backgroundSize = "contain";
		playBtn.style.width = "50px";
		playBtn.style.height = "50px";
		playBtn.style.left = "0px";
		playBtn.style.right = "0px";
		playBtn.style.top = "0px";
		playBtn.style.bottom = "0px";
		playBtn.style.margin = "auto";
		playBtn.style.backgroundPosition = "50%";
		playBtn.style.backgroundRepeat = "no-repeat";
		return playBtn;
	}

	FirePixel(x) {
		var pixel = x;
		var img = document.createElement("img");
		img.setAttribute("src", pixel);
		img.setAttribute("style", "display:none");
		document.body.appendChild(img);
		console.log("impressions pixel is firing");
	}
}
