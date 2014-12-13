Bullet.Util = {

    // http://www.html5canvastutorials.com/advanced/html5-canvas-load-image-data-url/
    // http://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
    rgbToHex: function(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    },

    hexToBw: function (hex){

        var rgb = this.hexToRgb(hex);

        return (rgb.r + rgb.b + rgb.g) / 3;

    },

    hexToRgb: function (hex){

        hex = hex.substr(1);

        return {

            r: parseInt(hex[0], 16),
            g: parseInt(hex[1], 16),
            b: parseInt(hex[2], 16)

        }

    },

    getDifferenceMatrix: function (oldMatrix, newMatrix){

        var totalPixelsSeen = 0,
            numChangedPixels = 0;

        var differenceMatrix = [];

        _.each(newMatrix, function(row, r){

            var differenceRow = [];

            _.each(row, function(newPixel, c){

                var oldPixel = oldMatrix[r][c],
                    similarity = this.getLuminanceSimilarity(oldPixel, newPixel);

                if(similarity > Bullet.Options.minPixelSimilarity){

                    // new pixel color is 'similar enough' to old to omit
                    differenceRow.push(null);

                } else {

                    // new pixel color is significantly different from old
                    differenceRow.push(newPixel);
                    numChangedPixels++;

                }

                totalPixelsSeen++;

            }.bind(this));

            differenceMatrix.push(differenceRow);

        }.bind(this));

        return differenceMatrix;

    },

    getLuminanceSimilarity: function (hex1, hex2){

        var dec1 = this.hexToBw(hex1),
            dec2 = this.hexToBw(hex2);

        var max = Math.max(dec1,dec2),
            min = Math.min(dec1,dec2);

        return min / max;

    },

    hasGetUserMedia: function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

}