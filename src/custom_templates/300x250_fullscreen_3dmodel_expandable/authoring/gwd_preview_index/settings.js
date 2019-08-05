window.settings = {};
window.settings.dimensions = {
  width: 300,
  height: 250,
};
window.settings.gwd3d = {
  keyframes: [0, 0.5, 2, 3.17, 4.9, 6.67, 10, 15],
  animationName: 'Take 001'
};

//between 20% and 60% of top/bottom the creative will start/stop animating
window.settings.scrolling = {};
window.settings.scrolling.startBound = 0.2;
window.settings.scrolling.endBound = 0.6;

// //the startframe and endframe from/to it will animate
window.settings.scrolling.startFrame = window.settings.gwd3d.keyframes[5];
window.settings.scrolling.endFrame = window.settings.gwd3d.keyframes[6];


