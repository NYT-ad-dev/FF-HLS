function initVIDEOJS () {
    var video = document.getElementById('vid1');
    if (Hls.isSupported()) {
        console.log(" yo its supported ");
    }

    var player = videojs('vid1');

    //console.log(player.canPlayType('video/mp4'));


    var videoDuration;
    var Q1,Q2,Q3,Q4,vidUnits;

    player.src({
        //src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
        //src: 'https://vp.stg.nyt.com/video/hls/stg/2020/02/19/118641_1_media-factory-ad-test_wg/master.m3u8',
        src: 'https://vp.nyt.com/video/hls/2020/01/22/20200122164746_1_sir_listings_00114118_wg/master.m3u8',
        // type: 'application/x-mpegURL',
    // withCredentials: true
    });

    player.play();
    player.poster('./poster.jpg');
    player.muted(true);


    player.on('ready', function() {

    
        this.on('loadedmetadata', function (event) {
            
            vidUnits = this.cache_.duration / 100;
            videoDuration = Math.round(vidUnits * 100);
        })

        this.on('timeupdate', function () {
            var CurTime = this.currentTime();
            var CurPercent = CurTime / vidUnits;
            var curPerRounded = Math.round(CurPercent);

            if (curPerRounded === 25) {
                console.log(" yo its 25% ");
                //PixFunction(pixel25);
            }

            if (curPerRounded == 50) {
                console.log(" yo its 50% ");
                //PixFunction(pixel50);
            }

            if (curPerRounded == 75) {
                console.log(" yo its 75% ");
                //PixFunction(pixel75);
            }

            if (curPerRounded == 99) {
                console.log(" yo its 100% ");
                //PixFunction(pixel100);
            }


            console.log("Current Time: ",CurTime, "  Current Percentage: ", CurPercent);
        })
    });

    player.on('play', function() {
        console.log("player is playing ....");
        //PixFunction(pixel0);
    });

    player.on('loadstart', function() {
        console.log("player is loadstart ....");
    });

    player.on('ended', function() {
        console.log("player is ended ....");
    });


}