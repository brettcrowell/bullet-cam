Bullet.CanvasRenderer = function(){

    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d');

    this.element.width = 1280;
    this.element.height = 960;

}

Bullet.CanvasRenderer.prototype = {

    getElement: function(){
        return this.element;
    },

    render: function(encoderOutput){

        var context = this.context,
            pixelWidth = 1280 / encoderOutput.metadata.cols,
            pixelRadius = pixelWidth / 2;

        _.each(encoderOutput.matrix, function(row, r){

            _.each(row, function(pixelColor, c){

                if(pixelColor !== null){

                    var xOnCanvas = (c * pixelWidth) + pixelRadius,
                        yOnCanvas = (r * pixelWidth) + pixelRadius;

                    if(encoderOutput.metadata.stagger && (r % 2 === 0)){
                        xOnCanvas += pixelRadius
                    }

                    var rasterRadius = Bullet.Util.getRasterWidth(pixelColor,
                                                                  pixelRadius,
                                                                  encoderOutput.metadata.maxLumens,
                                                                  encoderOutput.metadata.minLumens);

                    context.beginPath();
                    context.arc(xOnCanvas, yOnCanvas, rasterRadius, 0, 2 * Math.PI, false);
                    context.fillStyle = pixelColor;
                    context.fill();
                    context.closePath();

                }

            });

        });

    }

};