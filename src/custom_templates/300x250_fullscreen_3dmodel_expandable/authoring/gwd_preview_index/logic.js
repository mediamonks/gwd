function init() {
  //initial vars
  //gwd components
  window.gwdAd = document.getElementById("gwd-ad");
  window.gwdPageContent = document.querySelector(".gwd-page-content");
  window.bannerPage = document.getElementById("banner-page");

  //frames checker for
  window.keyObj = {};
  window.keyObj.key = this.settings.gwd3d.keyframes[0];

  window.engagement = false;
  window.isExpanded = false;
  window.scrollEnabled = false;

  window.gwd3dModel = document.querySelector("#gwd-3d-model_1");

  //check when the 3d model is available
  window.addEventListener("message", handle3dModelEvents, false);

  //check when gwd has loaded the page, if there is no 3dmodel, you should use this event to start your animation/banner
  window.bannerPage.addEventListener("pageload", handleBannerPageLoad.bind(window));
}
function handleBannerPageLoad() {
  console.log("page loaded");

}

function handle3dModelEvents(e) {
  //for checking yaw, pivot and zoom when positioning 3dmodel
  // if (typeof e.data == 'string') {
  //   console.log(e.data);
  // }

  //check if 3dModel is available
  if (!window.gwd3dModelContent) {
    window.gwd3dModelContent = window.gwd3dModel.children[0].contentWindow;
  }

  if (e && e.data == "stoptimer:TimeToFirstFrame") {
    initBanner();
  }

  //interaction with 3d element started
  if (e && e.data == "starttimer:TotalEngagement") {
    if (!window.engagement) {
      window.engagement = true;

      window.mainTimeline.pause();
      window.collapseSwipeFadeOutTimeline = getCollapseSwipeOutTimeline();

    }
  }

//interaction with 3d element stopped
  if (e && e.data == "stoptimer:TotalEngagement") {
    window.engagement = false;

    if (!window.isExpanded) {
      window.mainTimeline.pause();
      window.collapseSwipeFadeInTimeline = getCollapseSwipeInTimeline();
    }
  }

  if (e && e.data == "starttimer:TimeToClick") {
    window.clickTime = new Date();


  }

  if ((e && e.data == "stoptimer:TimeToClick") || e.data == "cumulativecounter:Rotate") {
    window.releaseClickTime = new Date();
    window.clickedTime = window.releaseClickTime.getTime() - window.clickTime.getTime();

    if (window.clickedTime < 100) {
      expand();
    }
  }


}

function initBanner() {
  //stop autoplaying 3d model
  window.gwd3dModel.pauseAnimation(window.settings.gwd3d.animationName);
  window.gwd3dModel.setAnimationTime(window.settings.gwd3d.animationName, 0);

  //position 3d model to default state
  window.update3dModelPosition();

  //exit clicks
  // window.gwd3dModel.addEventListener('click', handle3dModelClick, false);
  // document.querySelector('#gwd3dModelDisable').addEventListener('click', handle3dModelClick, false);

  //enabler events
  Enabler.addEventListener(studio.events.StudioEvent.EXIT, handleExit.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, handleExpandStart.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, handleExpandFinish.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, handleCollapseStart.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, handleCollapseFinish.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.ORIENTATION, changeOrientationHandler.bind(window));

    document.querySelector("#closeButton").addEventListener("click", collapse.bind(window));
  document.querySelector("#expandArrowsButton").addEventListener("click", expand.bind(window));

  document.querySelector("#cta").addEventListener("click", handleCtaClick.bind(window));
  document.querySelector("#cta").addEventListener("touchstart", handleTouchStart.bind(window));
  document.querySelector("#cta").addEventListener("touchend", handleTouchEnd.bind(window));

  document.querySelector("#closeButton").addEventListener("click", collapse.bind(window));

  // when testing locally in an iframe, scroll will be enabled
  if (!Enabler.isServingInLiveEnvironment()) {
    if (location.href.indexOf("localhost") != -1 && window.self !== window.top) {
      window.scrollEnabled = true;
      console.log("scrolling enabled in testing mode");
    }
  } else {
    window.scrollEnabled = true;
  }

  if (window.scrollEnabled) {
    if (window.Enabler && Enabler.isServingInLiveEnvironment()) {
      Enabler.addEventListener("hostpageScroll", handleHostpageScroll.bind(this), false);
    } else {
      window.addEventListener("message", onRawScroll.bind(this), false);
      console.log("Either no enabler or not serving in live environment");
    }

    window.update3dModelPosition("collapse_end");
    update3DModelAnimation(window.gwd3dModel, window.settings.gwd3d.keyframes[4], window.settings.gwd3d.animationName);
  }

  window.mainTimeline = getMainTimeline({ paused: true });

  start();
}

function start() {
  window.mainTimeline.play();
}

function expand() {
  if (window.isExpanded) {
    return;
  }

  window.expandedOnce = true;

  var fullscreenSupported = false;
  Enabler.addEventListener(
    studio.events.StudioEvent.FULLSCREEN_SUPPORT,
    function(event) {
      fullscreenSupported = event.supported;
      if (fullscreenSupported) {
        Enabler.requestFullscreenExpand();
      }
    }.bind(window)
  );
  Enabler.queryFullscreenSupport();
}

function handleExpandStart(e) {
  window.update3dModelPosition("expand_start");

    console.log(window.gwdPageContent);
    console.log(window.bannerPage);
    console.log(window.gwd3dModel);

    window.gwdPageContent.style.width = window.bannerPage.style.width = window.gwd3dModel.style.width = "100%";
  window.gwdPageContent.style.height = window.bannerPage.style.height = window.gwd3dModel.style.height = "100%";

  Enabler.finishFullscreenExpand();
}

function handleExpandFinish() {
  window.isExpanded = true;

  changeOrientationHandler();

  //Daniel Google mod
  window.gwd3dModelContent.postMessage("ScrollGatingDisable", "*");

  this.mainTimeline.gotoAndPlay("expand_end")
  TweenMax.set("#expandArrows", { opacity: 0 });
}

function collapse() {
  Enabler.requestFullscreenCollapse();
}

function handleCollapseStart(e) {
  window.gwdPageContent.style.width = window.bannerPage.style.width = window.gwd3dModel.style.width =
    window.settings.dimensions.width + "px";
  window.gwdPageContent.style.height = window.bannerPage.style.height = window.gwd3dModel.style.height =
    window.settings.dimensions.height + "px";

  Enabler.finishFullscreenCollapse();
}

function handleCollapseFinish(e) {
  window.gwd3dModel.pauseAnimation(window.settings.gwd3d.animationName);
  window.gwd3dModel.setAnimationTime(window.settings.gwd3d.animationName, window.settings.gwd3d.keyframes[2]);
  window.update3dModelPosition("collapse_end");
  update3DModelAnimation(window.gwd3dModel, window.settings.gwd3d.keyframes[4], window.settings.gwd3d.animationName);

  TweenMax.set("#expandArrows", { opacity: 1 });

  window.isExpanded = false;
  window.mainTimeline.gotoAndStop("banner");

  //Daniel Google mod
  window.gwd3dModelContent.postMessage("ScrollGatingEnable", "*");
}

function handle3dModelClick(e) {
  expand();
}

function changeOrientationHandler() {
  if (window.isExpanded) {
    if (Enabler.getOrientation().getMode() == "portrait") {
      TweenMax.set("#landscapeWrapper", { pointerEvents: "none", opacity: 0 });
    } else {
      TweenMax.set("#landscapeWrapper", { pointerEvents: "auto", opacity: 1 });
    }
  }
}

function handleCtaClick() {
  Enabler.exitOverride("cta_exit_click", "http://www.google.com");
}

function handleTouchStart(e) {
  TweenMax.set("#" + e.currentTarget.id + "_over", { autoAlpha: 1 });
}
function handleTouchEnd(e) {
  TweenMax.set("#" + e.currentTarget.id + "_over", { autoAlpha: 0 });
}

function handleExit() {
  collapse();
}

function update3DModelAnimation(model, animationFrame, animationName) {
  model.setAnimationTime(animationName, animationFrame);
}

function onRawScroll(event) {
  if (event && event.data && typeof event.data == "string") {
    try {
      let eventData = JSON.parse(event.data);
      if (eventData && eventData.eventType == "hostpageScroll") {
        handleHostpageScroll(eventData);
      }
    } catch (probablyNotJsonException) {}
  }
}

function handleHostpageScroll(e) {
  if (!window.isExpanded && !window.engagement) {
    var per = e.creativeFramePercentY;

    var bounds = window.settings.scrolling.endBound - window.settings.scrolling.startBound;
    var frames = window.settings.scrolling.endFrame - window.settings.scrolling.startFrame;

    // if in between bounds of visibility top/bottom, recalculating current frame based upon the bounds and current percentY
    var frame = Math.max(
      window.settings.scrolling.startFrame,
      Math.min(
        window.settings.scrolling.endFrame,
        frames * ((per - window.settings.scrolling.startBound) / bounds) + window.settings.scrolling.startFrame
      )
    );
    update3DModelAnimation(window.gwd3dModel, frame, window.settings.gwd3d.animationName);
  }
}

function update3DModelAnimation(model, animationFrame, animationName) {
  model.setAnimationTime(animationName, animationFrame);
}

function update3dModelPosition(state) {
  switch (state) {
    case "collapse_end":
      break;

    case "expand_start":
      break;

    default:
    // window.gwd3dModel.setTargetZoom(1.64);
    // window.gwd3dModel.setTargetLocalPan(0, 0.34, 0);
    // window.gwd3dModel.setTargetPivot(0, 0.72, 0);
    // window.gwd3dModel.setTargetYaw(-213);
    // window.gwd3dModel.setTargetPitch(-8);
  }
}

function getStyle(el, prop) {
  var value = Number(
    window
      .getComputedStyle(el, null)
      .getPropertyValue(prop)
      .replace("px", "")
  );
  return value;
}

init();
