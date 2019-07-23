function init() {
  //initial vars
  this.scrollEnabled = true;

  this.gwdAd = document.getElementById('gwd-ad');
  this.gwdPageContent = document.querySelector('.gwd-page-content');
  this.bannerPage = document.getElementById('banner-page');
  this.settings = {};
  this.settings.dimensions = {
    width: 300,
    height: 250,
    expandedWidth: getStyle(this.gwdPageContent, 'width'),
    expandedHeight: getStyle(this.gwdPageContent, 'height'),
  };
  this.settings.gwd3d = {
    keyframes: [0, 0.5, 2, 3.17, 4.9, 6.67, 10, 15],
    animationName: 'Take 001',
    frameObj: { animationFrame: 0 },
  };

  this.expandedOnce = false;
  this.isExpanded = false;
  this.isCollapsedSwiping = false;
  this.isCollapsedSwipingOnce = false;
  this.engagement = false;
  this.engagementOnce = false;


  this.bannerPage.addEventListener('pageload', handleBannerPageLoad.bind(this));
}
function handleBannerPageLoad() {
  this.gwd3dModel = document.querySelector('#gwd-3d-model_1');
  this.gwd3dModelContent = this.gwd3dModel.children[0].contentWindow;
  window.addEventListener('message', handle3dModelEvents, false);
}

function initBanner() {
  //stop autoplaying 3d model
  this.gwd3dModel.pauseAnimation(this.settings.gwd3d.animationName);
  this.gwd3dModel.setAnimationTime(this.settings.gwd3d.animationName, 0);

  //position 3d model to default state
  this.update3dModelPosition();

  //exit clicks
  // this.gwd3dModel.addEventListener('click', handle3dModelClick, false);
  document.querySelector('#gwd3dModelDisable').addEventListener('click', handle3dModelClick, false);

  //enabler events
  Enabler.addEventListener(studio.events.StudioEvent.EXIT, handleExit.bind(this));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, handleExpandStart.bind(this));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, handleExpandFinish.bind(this));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, handleCollapseStart.bind(this));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, handleCollapseFinish.bind(this));
  Enabler.addEventListener(studio.events.StudioEvent.ORIENTATION, changeOrientationHandler.bind(this));

  document.querySelector('#closeButton').addEventListener('click', collapse.bind(this));
  document.querySelector('#expandArrowsButton').addEventListener('click', expand.bind(this));

  document.querySelector('#cta').addEventListener('click', handleCtaClick.bind(this));
  document.querySelector('#cta').addEventListener('touchstart', handleTouchStart);
  document.querySelector('#cta').addEventListener('touchend', handleTouchEnd);

  if (this.scrollEnabled) {
    if (window.Enabler && Enabler.isServingInLiveEnvironment()) {
      Enabler.addEventListener('hostpageScroll', handleHostpageScroll, false);
    } else {
      window.addEventListener('message', onRawScroll, false);
      console.log('Either no enabler or not serving in live environment');
    }

    this.update3dModelPosition('collapse_end');
    update3DModelAnimation(this.gwd3dModel, this.settings.gwd3d.keyframes[4], this.settings.gwd3d.animationName);
  }

  this.idleTimeline = getIdleTimeline({ paused: true, repeat: -1 });
  this.mainTimeline = getMainTimeline({ paused: true });

  this.swipeIconTimeline = getSwipeIconTimeline({
    paused: true,
    repeat: 6,
    yoyo: true,
  });

  start();
}

function start() {
  this.mainTimeline.play();
}

function expand() {
  if (this.isExpanded) {
    return;
  }

  this.expandedOnce = true;

  var fullscreenSupported = false;
  Enabler.addEventListener(
    studio.events.StudioEvent.FULLSCREEN_SUPPORT,
    function(event) {
      fullscreenSupported = event.supported;
      if (fullscreenSupported) {
        // Enabler.requestFullscreenExpand();
        Enabler['requestFull' + 'screenExpand']();
      }
    }.bind(this),
  );
  //Enabler.queryFullscreenSupport()
  Enabler['queryFull' + 'screenSupport']();
}

function handleExpandStart(e) {
  this.update3dModelPosition('expand_start');

  this.gwdPageContent.style.width = this.bannerPage.style.width = this.gwd3dModel.style.width = '100%';
  this.gwdPageContent.style.height = this.bannerPage.style.height = this.gwd3dModel.style.height = '100%';

  // Enabler.finishFullscreenExpand();
  Enabler['finishFull' + 'screenExpand']();
}

function handleExpandFinish() {
  this.isExpanded = true;

  changeOrientationHandler();

  //Daniel Google mod
  this.gwd3dModelContent.postMessage('ScrollGatingDisable', '*');

  this.mainTimeline.gotoAndPlay('expand');
  TweenMax.set('#expandArrows', { opacity: 0 });
}

function collapse() {
  // Enabler.requestFullscreenCollapse();
  Enabler['requestFull' + 'screenCollapse']();

}

function handleCollapseStart(e) {
  this.gwdPageContent.style.width = this.bannerPage.style.width = this.gwd3dModel.style.width =
    this.settings.dimensions.width + 'px';
  this.gwdPageContent.style.height = this.bannerPage.style.height = this.gwd3dModel.style.height =
    this.settings.dimensions.height + 'px';

  // Enabler.finishFullscreenCollapse();
  Enabler['finishFull' + 'screenCollapse']();
}

function handleCollapseFinish(e) {
  this.gwd3dModel.pauseAnimation(this.settings.gwd3d.animationName);
  this.gwd3dModel.setAnimationTime(this.settings.gwd3d.animationName, this.settings.gwd3d.keyframes[2]);
  this.update3dModelPosition('collapse_end');
  update3DModelAnimation(this.gwd3dModel, this.settings.gwd3d.keyframes[4], this.settings.gwd3d.animationName);

  TweenMax.set('#expandArrows', { opacity: 1 });

  this.isExpanded = false;
  this.mainTimeline.gotoAndStop('banner');

  //Daniel Google mod
  this.gwd3dModelContent.postMessage('ScrollGatingEnable', '*');
}

function handle3dModelClick(e) {

  expand();
}

function changeOrientationHandler() {
  if (this.isExpanded) {
    if (Enabler.getOrientation().getMode() == 'portrait') {
      TweenMax.set('#landscapeWrapper', { pointerEvents: 'none', opacity: 0 });
    } else {
      TweenMax.set('#landscapeWrapper', { pointerEvents: 'auto', opacity: 1 });
    }
  }
}

function handle3dModelEvents(e) {

  //for checking yaw, pivot and zoom when positioning 3dmodel
  // if (typeof e.data == 'string') {
  //   console.log(e.data);
  // }
if (e && e.data == "starttimer:TotalEngagement") {
    // if (typeof e.data == 'string') {
    if (!this.engagement) {
      this.engagement = true;

      if(this.scrollEnabled && !this.isExpanded) {
        TweenMax.set(
            this.settings.gwd3d.frameObj,


            {
              animationFrame: this.settings.gwd3d.keyframes[2],
              ease: Linear.easeNone,
              onUpdate: function() {
                update3DModelAnimation(
                    this.gwd3dModel,
                    this.settings.gwd3d.frameObj.animationFrame,
                    this.settings.gwd3d.animationName
                );
              }.bind(this),
              onComplete: function() {}.bind(this)
            }
        );
      }

      this.engagementOnce = true;
    }
  }

  if (e && e.data == "stoptimer:TotalEngagement") {
    this.engagement = false;
  }
  if (e && e.data == 'stoptimer:TimeToFirstFrame') {
    initBanner();
  }

  if (e && e.data == 'starttimer:TimeToClick') {
    this.clickTime = new Date();
    if (!this.expandedOnce) {
      this.isCollapsedSwiping = true;

      if (!this.isCollapsedSwipingOnce) {
        this.mainTimeline.play('swipe');
      }
    }
  }

  if ((e && e.data == 'stoptimer:TimeToClick') || e.data == 'cumulativecounter:Rotate') {
    this.releaseClickTime = new Date();

    this.clickedTime = this.releaseClickTime.getTime() - this.clickTime.getTime();

    if (this.clickedTime < 100) {
      expand();
    }

    if (!this.expandedOnce) {
      this.isCollapsedSwiping = false;
      if (!this.isCollapsedSwipingOnce) {
        this.mainTimeline.play('click_to_expand');
      }
      this.isCollapsedSwipingOnce = true;
    }
  }
}

function handleCtaClick() {
  Enabler.exitOverride('cta_exit_click', 'http://www.google.com');
}

function handleTouchStart(e) {
  TweenMax.set('#' + e.currentTarget.id + '_over', { autoAlpha: 1 });
}
function handleTouchEnd(e) {
  TweenMax.set('#' + e.currentTarget.id + '_over', { autoAlpha: 0 });
}

function handleExit() {
  collapse();
}

function getIdleTimeline(obj) {
  var tl = new TimelineMax(obj);
  tl.fromTo(
    this.settings.gwd3d.frameObj,
    this.settings.gwd3d.keyframes[5] - this.settings.gwd3d.keyframes[4],
    { animationFrame: this.settings.gwd3d.keyframes[4] },
    {
      animationFrame: this.settings.gwd3d.keyframes[5],
      ease: Linear.easeNone,
      onUpdate: function() {
        update3DModelAnimation(
          this.gwd3dModel,
          this.settings.gwd3d.frameObj.animationFrame,
          this.settings.gwd3d.animationName,
        );
      }.bind(this),
    },
  );

  return tl;
}

function getMainTimeline(obj) {
  var tl = new TimelineMax(obj);

  this.gwdPageContent.style.width = this.bannerPage.style.width = '100%';
  this.gwdPageContent.style.height = this.bannerPage.style.height = '100%';

  tl.to('#loaderWrapper', 1, { autoAlpha: 0 }, 'start');
  tl.addLabel('loader');
  if (this.scrollEnabled) {
    tl.addPause();
  } else {
    tl.fromTo(
      this.settings.gwd3d.frameObj,
      this.settings.gwd3d.keyframes[1] - this.settings.gwd3d.keyframes[0],
      { animationFrame: this.settings.gwd3d.keyframes[0] },
      {
        animationFrame: this.settings.gwd3d.keyframes[1],
        ease: Linear.easeNone,
        onUpdate: function() {
          update3DModelAnimation(
            this.gwd3dModel,
            this.settings.gwd3d.frameObj.animationFrame,
            this.settings.gwd3d.animationName,
          );
        }.bind(this),
        onComplete: function() {}.bind(this),
      },
      'start',
    );
  }

  tl.addLabel('aniticipation', 'start+=0.2');
  tl.fromTo(
    this.settings.gwd3d.frameObj,
    this.settings.gwd3d.keyframes[2] - this.settings.gwd3d.keyframes[1],
    { animationFrame: this.settings.gwd3d.keyframes[1] },
    {
      animationFrame: this.settings.gwd3d.keyframes[2],
      ease: Linear.easeNone,
      onUpdate: function() {
        update3DModelAnimation(
          this.gwd3dModel,
          this.settings.gwd3d.frameObj.animationFrame,
          this.settings.gwd3d.animationName,
        );
      }.bind(this),
      onComplete: function() {}.bind(this),
    },
    'aniticipation',
  );

  tl.to(this.settings.gwd3d.frameObj, this.settings.gwd3d.keyframes[4] - this.settings.gwd3d.keyframes[2], {
    animationFrame: this.settings.gwd3d.keyframes[4],
    ease: Linear.easeNone,
    onStart: function() {}.bind(this),
    onUpdate: function() {
      update3DModelAnimation(
        this.gwd3dModel,
        this.settings.gwd3d.frameObj.animationFrame,
        this.settings.gwd3d.animationName,
      );
    }.bind(this),
    onComplete: function() {
      this.update3dModelPosition('collapse_end');
    }.bind(this),
  });

  if (!this.scrollEnabled) {
    tl.call(playIdleTimeline, null, this);
  }

  tl.call(playSwipeTimeline, null, this);

  tl.staggerFrom(
    ['#swipeToRotate', '#textSwipeToRotate'],
    0.4,
    {
      scale: 0,
      ease: Back.easeOut.config(4),
    },
    0.1,
    '+=0.5',
  );

  tl.set('#gwd3dModelDisable', { pointerEvents: 'none' });
  tl.call(setTargetYaw, [-30], this, '-=0.2');
  tl.call(setTargetYaw, [90], this, '+=1');
  tl.call(setTargetYaw, [160], this, '+=1.2');

  tl.addLabel('swipe', '+=6');

  tl.to(['#swipeToRotate', '#textSwipeToRotate'], 0.2, { opacity: 0, ease: Power0.easeIn }, 'swipe');
  tl.addLabel('click_to_expand');
  if (!this.scrollEnabled) {
    tl.call(removePauseClick, [tl], this, '+=0.5');
    tl.addPause('click_to_expand_pause');
  }
  tl.from('#expandCta', 0.3, { scale: 0, transformOrigin: 'center center', ease: Back.easeOut.config(4) });

  tl.addLabel('banner');
  tl.addPause('banner');

  //EXPAND//
  tl.add('expand', '+=0.02');
  tl.addCallback(
    update3DModelAnimation,
    'expand',
    [this.gwd3dModel, this.settings.gwd3d.keyframes[4], this.settings.gwd3d.animationName],
    this,
  );

  tl.from(
    ['#closeButton'],
    0.25,
    {
      opacity: 0,
    },
    'expand',
  );
  tl.set(['#expandCta', '#expandArrowsButton'], { opacity: 0 }, 'expand');
  tl.set('#backgroundExpand', { opacity: 1 }, 'expand');

  tl.from('#cta', 0.6, {
    scale: 0,
    ease: Back.easeOut.config(2),
    transformOrigin: 'center center',
  });
  tl.set('#cta', { css: { pointerEvents: 'all' } });
  tl.addPause('expand_end+=15');

  this.gwdPageContent.style.width = this.bannerPage.style.width = this.settings.dimensions.width + 'px';
  this.gwdPageContent.style.height = this.bannerPage.style.height = this.settings.dimensions.height + 'px';

  return tl;
}

function playSwipeTimeline() {
  this.swipeIconTimeline.play();
}

function playIdleTimeline() {
  this.idleTimeline.play();
}

function setTargetYaw(num) {
  this.gwd3dModel.setTargetYaw(num);
}

function removePauseClick(tl) {
  if (!this.isCollapsedSwiping) tl.removePause('click_to_expand_pause');
}

function getSwipeIconTimeline(obj) {
  var tl = new TimelineMax(obj);
  tl.to('#swipeIconArrowLeft', 0.6, { x: 12, yoyo: true, ease: Cubic.easeInOut }, 'start');
  tl.to('#swipeIconArrowRight', 0.6, { x: 6, yoyo: true, ease: Cubic.easeInOut }, 'start');
  tl.fromTo(
    '#swipeIconHand',
    0.6,
    { rotation: -20, x: -2 },
    { rotation: 3, x: 2, yoyo: true, transformOrigin: '39px 48px', ease: Cubic.easeInOut },
    'start',
  );
  return tl;
}

function onRawScroll(event) {
  if (event && event.data && typeof event.data == 'string') {
    try {
      let eventData = JSON.parse(event.data);
      if (eventData && eventData.eventType == 'hostpageScroll') {
        handleHostpageScroll(eventData);
      }
    } catch (probablyNotJsonException) {}
  }
}

function handleHostpageScroll(e) {
  if (!this.isExpanded && !this.engagement) {
    this.scrollEnabled = true;
  var per = e.creativeFramePercentY;

  //between 20% and 60% of top/bottom the creative will start/stop animating
  var startBound = 0.2;
  var endBound = 0.6;
  var bounds = endBound - startBound;

  // //the startframe and endframe from/to it will animate
  var startFrame = this.settings.gwd3d.keyframes[5];
  var endFrame = this.settings.gwd3d.keyframes[6];

  var startFrameAnimation = this.mainTimeline.getLabelTime('loader');
  var endFrameAnimation = this.mainTimeline.getLabelTime('banner');

  var frames = endFrame - startFrame;
  var framesAnimation = endFrameAnimation - startFrameAnimation;

  // if in between bounds of visibility top/bottom, recalculating current frame based upon the bounds and current percentY
  var frame = Math.max(startFrame, Math.min(endFrame, frames * ((per - startBound) / bounds) + startFrame));
  update3DModelAnimation(this.gwd3dModel, frame, this.settings.gwd3d.animationName);

  var frameAnimation = Math.max(
    startFrameAnimation,
    Math.min(endFrameAnimation, framesAnimation * ((per - startBound) / bounds) + startFrameAnimation),
  );
  //this.mainTimeline.gotoAndStop(frameAnimation);
  }
}

function update3DModelAnimation(model, animationFrame, animationName) {
  model.setAnimationTime(animationName, animationFrame);
}

function update3dModelPosition(state) {
  switch (state) {
    case 'collapse_end':

      this.gwd3dModel.setTargetZoom(1.4);
      this.gwd3dModel.setTargetLocalPan(0, 0.25, 0);
      // this.gwd3dModel.setTargetPivot(0, 0.72, 0);
      this.gwd3dModel.setTargetYaw(-205);
      this.gwd3dModel.setTargetPitch(-8);
      break;

    case 'expand_start':
      this.gwd3dModel.setTargetZoom(1.64);
      this.gwd3dModel.setTargetLocalPan(0, 0.34, 0);
      // this.gwd3dModel.setTargetPivot(0, 0.72, 0);
      this.gwd3dModel.setTargetYaw(-213);
      this.gwd3dModel.setTargetPitch(-8);
      break;

    default:
    // this.gwd3dModel.setTargetZoom(3.8);
    // this.gwd3dModel.setTargetLocalPan(0, 0.25, 0);
    // // this.gwd3dModel.setTargetPivot(0, 0.63, 0);
    // this.gwd3dModel.setTargetYaw(-205);
    // this.gwd3dModel.setTargetPitch(-8);
  }
}

function getStyle(el, prop) {
  var value = Number(
    window
      .getComputedStyle(el, null)
      .getPropertyValue(prop)
      .replace('px', ''),
  );
  return value;
}

init();
