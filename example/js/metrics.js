


var eventTracker = function () {
    var ETLink =
        "https://et.nytimes.com/?subject=dfp-ad-events&dfp_creativeid=%ecid!&dfp_lineitemid=%eaid!&dfp_orderid=%ebuy!&dfp_viewport=%%PATTERN:vp%%&pageviewid=%%PATTERN:page_view_id%%&dfp_pos=%%PATTERN:pos%%&dfp_prop=%%PATTERN:prop%%";

    var ETSlideCall = function ETSlideCall(type, curr) { var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=slide-" + curr;
        if (next != "") { trackingLink += "_" + "slide-" + next;}
        document.createElement('img').src = trackingLink;
    };
    return {

        generalEventTrack: function generalEventTrack(type, curr) {
            var redirectLink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=" + curr;
            document.createElement('img').src = trackingLink;
            if (redirectLink != "") {window.open(redirectLink, '_blank');}

            parent.postMessage({
                    event: 'send-direct',
                    payload: {
                        dfp_creativeid: '%ecid!',
                        dfp_orderid: '%ebuy!',
                        dfp_viewport: '%%PATTERN:vp%%',
                        dfp_pos: '%%PATTERN:pos%%',
                        dfp_prop: '%%PATTERN:prop%%',
                        dfp_event_type: type,
                        dfp_event_location: curr,
                        subject: 'dfp-ad-events'
                    }
                },
                'https://www.nytimes.com/'
            );
        }          
    };
}();

// HLSDesktopAd