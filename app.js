var Reveal = require('reveal.js');
var $ = require('jbone');
var VIDEO_TYPE = require('./js/constants.js').VIDEO_TYPE;
var AUDIO_TYPE = require('./js/constants.js').AUDIO_TYPE;
var AUDIO_PATH = require('./js/constants.js').AUDIO_PATH;
var Draggable = require ('./js/lib/draggable.js');
var detectIE = require('./js/detectie.js').detectIE;


var isEdge14 = detectIE() === 14;

if (isEdge14) {
    $('body').addClass("edge-14");
}



Reveal.initialize({
    width: 1000,
    height: 740,
    center: false,
    controls: false,
    //history: true,
    keyboard: false,
    progress: false
});


var stepIndex = 0,
    loopIndex = 0,
    isPlaying = false,
    mediaIsReady = false,
    $audio = $('audio'),
    $overlay = $('#overlay'),
    $pauseBtn = $('.pause-btn'),
    isFinished = false;

var slides = {
    0: {
        steps: [
            { delay: 15, cmd: Reveal.next },
            { delay: 50, cmd: Reveal.next },
            { delay: 120, cmd: Reveal.next },
            { delay: 178, cmd: Reveal.next }
        ],
        mediaType: VIDEO_TYPE
    },
    1: {
        steps: [
            { delay: 32, cmd: Reveal.next },
            { delay: 84, cmd: Reveal.next},
            { delay: 93, cmd: function () {
                Reveal.next(); Reveal.next();
            } },
            { delay: 110, cmd: Reveal.next},
            { delay: 120, cmd: Reveal.next },
            { delay: 130, cmd: Reveal.next },
            { delay: 139, cmd: Reveal.next },
            { delay: 175, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    2: {
        steps: [
            { delay: 30, cmd: Reveal.next },
            { delay: 40, cmd: Reveal.next },
            { delay: 52, cmd: Reveal.next },
            { delay: 64, cmd: Reveal.next },
            { delay: 68, cmd: Reveal.next },
            { delay: 100, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    3: {
        steps: [
            { delay: 9, cmd: Reveal.next },
            { delay: 26, cmd: function () {
                //$('.block-1-sl-4 ul li').eq(3).addClass("active");
                //$('.block-3-sl-4 ul li').eq(0)
                //    .html("hobby: golfing")
                //    .addClass("active");
                togglePlay(true);

            } },
            { delay: 60, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    4: {
        steps: [
            { delay: 16, cmd: Reveal.next },
            { delay: 36, cmd: Reveal.next },
            { delay: 46, cmd: Reveal.next },
            { delay: 47, cmd: Reveal.next },
            { delay: 57, cmd: Reveal.next },
            { delay: 58, cmd: Reveal.next },
            { delay: 68, cmd: Reveal.next },
            { delay: 87, cmd: Reveal.next },//
            { delay: 172, cmd: Reveal.next },
            { delay: 184, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    5: {
        steps: [
            { delay: 33, cmd: Reveal.next },
            { delay: 64, cmd: Reveal.next },
            { delay: 77, cmd: Reveal.next },
            { delay: 80, cmd: Reveal.next },
            { delay: 100, cmd: Reveal.next },
            { delay: 140, cmd: Reveal.next },
            { delay: 164, cmd: Reveal.next }

        ],
        mediaType: AUDIO_TYPE
    },
    6: {
        steps: [
            { delay: 48, cmd: Reveal.next },
            { delay: 60, cmd: Reveal.next },
            { delay: 88, cmd: Reveal.next },
            { delay: 112, cmd: Reveal.next },
            { delay: 136, cmd: Reveal.next },
            { delay: 140, cmd: Reveal.next }

        ],
        mediaType: AUDIO_TYPE
    },
    7: {
        steps: [
            { delay: 36, cmd: Reveal.next },
            { delay: 78, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    8: {
        steps: [
            { delay: 28, cmd: Reveal.next },
            { delay: 60, cmd: Reveal.next },
            { delay: 64, cmd: Reveal.next },
            { delay: 120, cmd: Reveal.next },
            { delay: 156, cmd: Reveal.next },
            { delay: 212, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    9: {
        steps: [
            { delay: 8, cmd: Reveal.next },
            { delay: 56, cmd: Reveal.next },
            { delay: 80, cmd: Reveal.next },
            { delay: 86, cmd: Reveal.next },
            { delay: 110, cmd: Reveal.next },
            { delay: 128, cmd: Reveal.next },
            { delay: 136, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    10: {
        steps: [
            { delay: 20, cmd: Reveal.next },
            { delay: 24, cmd: Reveal.next },
            { delay: 28, cmd: Reveal.next },
            { delay: 32, cmd: Reveal.next },
            { delay: 36, cmd: Reveal.next },
            { delay: 84, cmd: Reveal.next },
            { delay: 110, cmd: Reveal.next },
            { delay: 120, cmd: Reveal.next },
            { delay: 132, cmd: Reveal.next },
            { delay: 176, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    11: {
        steps: [
            { delay: 36, cmd: Reveal.next },
            { delay: 44, cmd: Reveal.next },
            { delay: 76, cmd: Reveal.next },
            { delay: 108, cmd: Reveal.next },
            { delay: 110, cmd: Reveal.next },
            { delay: 114, cmd: function () {
                togglePlay(true);
            } },
            { delay: 136, cmd: Reveal.next },
            { delay: 169, cmd: Reveal.next },
            { delay: 190, cmd: Reveal.next },
            { delay: 207, cmd: Reveal.next },
            { delay: 227, cmd: Reveal.next },
            { delay: 304, cmd: Reveal.next },
            { delay: 382, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    12: {
        steps: [
            { delay: 44, cmd: Reveal.next },
            { delay: 68, cmd: Reveal.next },
            { delay: 97, cmd: Reveal.next },
            { delay: 114, cmd: Reveal.next },
            { delay: 134, cmd: Reveal.next },
            { delay: 153, cmd: Reveal.next },
            { delay: 205, cmd: Reveal.next },
            { delay: 261, cmd: Reveal.next },
            { delay: 276, cmd: Reveal.next },
            { delay: 289, cmd: Reveal.next },
            { delay: 303, cmd: Reveal.next },
            { delay: 316, cmd: Reveal.next },
            { delay: 378, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    13: {
        steps: [
            { delay: 130, cmd: Reveal.next },
            { delay: 140, cmd: function () {
                //$('.fund-block').addClass('moved');
            }},
            { delay: 161, cmd: Reveal.next }

        ],
        mediaType: AUDIO_TYPE
    },
    14: {
        steps: [
            { delay: 28, cmd: Reveal.next },
            { delay: 56, cmd: Reveal.next },
            { delay: 76, cmd: Reveal.next },
            { delay: 92, cmd: Reveal.next },
            { delay: 124, cmd: Reveal.next },
            { delay: 192, cmd: Reveal.next },
            { delay: 232, cmd: Reveal.next },
            { delay: 284, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    15: {
        steps: [
            { delay: 21, cmd: Reveal.next },
            { delay: 39, cmd: Reveal.next },
            { delay: 70, cmd: Reveal.next },
            { delay: 100, cmd: Reveal.next }
        ],
        mediaType: AUDIO_TYPE
    },
    16: {
        steps: [
            { delay: 123, cmd: Reveal.next },
            { delay: 140, cmd: Reveal.next }
        ],
        mediaType: VIDEO_TYPE
    }
};



var togglePlay  = function (withoutScreen, action) {
    withoutScreen = typeof withoutScreen === 'boolean' ? withoutScreen : false;

    if(!mediaIsReady) {
        loadingMediaLoop();
        return
    }

    if(isPlaying) { //pause
        $pauseBtn.removeClass('active');
        !withoutScreen && $overlay.css('display', 'block');
        isPlaying = false;
        changeMediaState('pause');
    } else{ //play
        $pauseBtn.addClass('active');
        changeMediaState('play');
        !withoutScreen && $overlay.css('display', 'none');
        isPlaying = true;
        playLoop();
    }
};

$overlay.on('click', togglePlay);
$pauseBtn.on('click', togglePlay);
$(AUDIO_TYPE)[0].onwaiting = togglePlay;
$(VIDEO_TYPE)[0].onwaiting = togglePlay;

//slide 3
$('.hobbies-list li').on('click', function () {
    if(isPlaying) {
        return
    }
    if(!$(this).parent().find('.active').length) {
        togglePlay(true);
    }
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass("active");
    $('.block-3-sl-4 ul li').eq(0)
        .html("hobby: " + $(this).html())
        .addClass("active");
});

$('.panic-btn').on('click', function () {
    !isPlaying && togglePlay(true);
});

$('.js-yes-btn, .js-no-btn').on('click', Reveal.next);

//slide 8
$('.savings-table tr').on('click', function () {
    if(!isFinished) {
        return
    }
    if(!$(this).parent().find('.active').length) {
        Reveal.next();
    }
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass("active");

});



var playLoop = function () {
    isFinished = false;
    var currSlide = null;
    //console.log(loopIndex);
    if (isPlaying && mediaIsReady) {
        currSlide = Reveal.getIndices().h;

        if (slides[currSlide].steps[stepIndex]) {
            setTimeout(playLoop, 250);
            if (slides[currSlide].steps[stepIndex].delay === loopIndex) {
                //loopIndex = 0;
                slides[currSlide].steps[stepIndex++].cmd();
            }
        } else{
            $pauseBtn.removeClass('active');
            isFinished = true;
        }
        loopIndex++;
    }
};

var changeMediaState = function (action) {
    var mediaType = slides[Reveal.getIndices().h].mediaType;

    if(mediaType === AUDIO_TYPE) {
        $audio[0][action]();
    } else if(mediaType === VIDEO_TYPE) {
        $(Reveal.getCurrentSlide()).find('video')[0][action]();
    }
};

var loadingMediaLoop = function (slideIndex) {
    //console.log("loading...", $audio[0].readyState );
    var indexh = slideIndex || Reveal.getIndices().h;
    var mediaType = slides[indexh].mediaType;


    mediaIsReady = (mediaType === AUDIO_TYPE && $audio[0].readyState === 4)
        || (mediaType === VIDEO_TYPE &&  $(Reveal.getCurrentSlide()).find('video')[0].readyState === 4);


    if (mediaIsReady) {
        indexh > 0 && changeMediaState('play');
        setTimeout(playLoop, 250);
    } else {
        setTimeout(loadingMediaLoop, 250);
    }
};

loadingMediaLoop();




Reveal.addEventListener('slidechanged', function(e) {
    console.log("SLIDE CHANGED");
    $pauseBtn.addClass('active');
    mediaIsReady = false;
    stepIndex = 0;
    loopIndex = 0;

    var mediaFileNumber = e.indexh + 1;
    if(slides[e.indexh].mediaType === AUDIO_TYPE) {
        $audio.find('source').attr('src', AUDIO_PATH + mediaFileNumber + ".mp3");

        $audio[0].load();
    }

    loadingMediaLoop(e.indexh);
});

Reveal.addEventListener('ready', function() {
    $('.js-loader').css('display', 'none');
});

//Reveal.addEventListener('fragmentshown', function(e) {
//    //var $el = $(e.fragment);
//});
//
//Reveal.addEventListener('fragmenthidden', function(e) {
//    //var $el = $(e.fragment);
//});

$('.next-btn').on('click', function (e) {
    e.stopPropagation();
    Reveal.next();
});

var $circleItems = $('.circle-items'),
    $circles = $('.circle-items').find('.circle');

new Draggable (document.getElementById('js-fund-block'),{
    limit: {
        x: [295, 865],
        y: [0, 0]
    },
    setPosition: false,
    onDrag: function (el, x, y, e) {
        $circles.forEach(function (circle) {
            if(circle.offsetLeft >= x && x + 140 >= circle.offsetLeft + 132) {
                $circleItems.find('.active').removeClass('active');
                var lineNumber = $(circle).attr('data-line');
                $('[data-line="' + lineNumber + '"]').addClass('active');
                return false;
            }
        });
    }

});