function getMainTimeline(obj) {
  var tl = new TimelineMax(obj);

  this.gwdPageContent.style.width = this.bannerPage.style.width = "100%";
  this.gwdPageContent.style.height = this.bannerPage.style.height = "100%";

  tl.to("#loaderWrapper", 1, { autoAlpha: 0 }, "start");
  tl.addLabel("loader");

  tl.staggerFrom(
    ["#swipeToRotate", "#textSwipeToRotate"],
    0.4,
    {
      scale: 0,
      ease: Back.easeOut.config(4)
    },
    0.1,
    "+=0.5"
  );

  tl.set("#gwd3dModelDisable", { pointerEvents: "none" });
  tl.addLabel("swipe", "+=6");

  tl.to(["#swipeToRotate", "#textSwipeToRotate"], 0.2, { opacity: 0, ease: Power0.easeIn }, "swipe");

  // tl.addPause('click_to_expand_pause');
  tl.addLabel("click_to_expand");

  tl.from("#expandCta", 0.3, {
    scale: 0,
    transformOrigin: "center center",
    ease: Back.easeOut.config(4),
    onComplete: function() {
      this.isCollapsedSwiping = false;
    }.bind(this)
  });

  tl.addLabel("banner");
  tl.addPause("banner");

  //EXPAND//
  tl.add("expand", "+=0.02");
  tl.addCallback(
    update3DModelAnimation,
    "expand",
    [this.gwd3dModel, this.settings.gwd3d.keyframes[4], this.settings.gwd3d.animationName],
    this
  );

  tl.from(
    ["#closeButton"],
    0.25,
    {
      opacity: 0
    },
    "expand"
  );
  tl.set(["#expandCta", "#expandArrowsButton"], { opacity: 0 }, "expand");
  tl.set("#backgroundExpand", { opacity: 1 }, "expand");

  tl.from("#cta", 0.6, {
    scale: 0,
    ease: Back.easeOut.config(2),
    transformOrigin: "center center"
  });
  tl.set("#cta", { css: { pointerEvents: "all" } });
  tl.addPause("expand_end+=15");

  this.gwdPageContent.style.width = this.bannerPage.style.width = this.settings.dimensions.width + "px";
  this.gwdPageContent.style.height = this.bannerPage.style.height = this.settings.dimensions.height + "px";

  return tl;
}

//remove elements when started interacting with 3d element in collapsed mode
function getCollapseSwipeOutTimeline(obj) {
  var tl = new TimelineMax(obj);
  tl.to(["#swipeToRotate", "#textSwipeToRotate"], 0.2, { opacity: 0, ease: Power0.easeIn }, "start");
  tl.to("#expandCta", 0.2, { scale: 0, ease: Cubic.easeOut, transformOrigin: "center center" }, "start");
  return tl;
}
//animate back in elements when stopped interacting with 3d element in collapsed mode
function getCollapseSwipeInTimeline(obj) {
  var tl = new TimelineMax(obj);
  tl.fromTo(
    "#expandCta",
    0.3,
    {
      scale: 0,
      transformOrigin: "center center"
    },
    {
      scale: 1,
      transformOrigin: "center center",
      ease: Back.easeOut.config(4),
      onComplete: function() {
        this.isCollapsedSwiping = false;
      }.bind(this)
    }
  );
  return tl;
}
