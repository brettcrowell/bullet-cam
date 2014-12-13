// source (video, image on canvas)
// frame encoder (inp: canvas, encodes in fps, event when frame ready)
// client/decoder (displays hex matrix... svg, canvas, webgl?)
// memoize everything!!!!!
// base36
// calculate similarity based on grayscale

// max frame rate = 1 / ((21+19)/1000)

// source --> encode --> compress --> decompress/render/display

Bullet = {};

var cache = {

  virtualDOM: [],
  currentMatrix: [],
  maxLumens: 0,
  minLumens: 15

}


$(document).ready(function(){

  //var svg = document.getElementById(Bullet.Options.svgId);

  var source = new Bullet.WebcamSource();
      encoder = new Bullet.RasterFrameEncoder(),
      render = new Bullet.SvgRenderer();

  document.getElementById('viewport').appendChild(render.element);

  var frameInterval = 1 / (Bullet.Options.frameRate / 1000),
      resolution = Bullet.Options.resolution;

  setInterval(
      function(){
        render.render(encoder.encodeFrame(source.getFrame(), resolution), resolution);
      },
      frameInterval
  )


});
