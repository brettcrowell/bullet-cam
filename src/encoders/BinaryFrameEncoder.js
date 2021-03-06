import Encoder from './Encoder';
import utils from '../utils';

export default class BinaryFrameEncoder extends Encoder {

  /**
   *
   * @param canvasPixelArray
   * @param stagger
   * @param invert
   * @returns {string}
   */

  encodeFrame(canvasPixelArray, stagger = true, invert = false) {

    const width = this.options.webcamWidth;
    const height = this.options.webcamHeight;

    const cols = this.options.cols;
    const rows = this.options.rows; //(cols / width) * height;

    const quadrantWidth = width / cols;
    const quadrantHeight = height / rows;
    const staggerWidth = quadrantWidth / 2;

    let bitstring = "";

    for (var r = 0; r < rows; r++) {

      var offsetWidth = (r % 2 === 0) ? quadrantWidth : staggerWidth;

      for (var c = 0; c < cols; c++) {

        const xOnCanvas = Math.round((c * quadrantWidth) + offsetWidth);
        const yOnCanvas = Math.round(r * quadrantWidth);

        const quadrantColor = this.getPixelRgb(xOnCanvas, yOnCanvas, quadrantWidth, quadrantHeight, width, canvasPixelArray);
        let luminance = utils.getRgbLuminance(quadrantColor, 14);

        if (invert) { luminance = 1 - luminance; }

        /*
         * Each entry in the resultant binary shall be 4 bits.  Therefore, based on luminance, we will here
         * record the magnitude of this bit as follows...
         *
         * 100% luminance => 14
         * 0% luminance => 1
         *
         * 0 is reserved for "unchanged" later on in the compressor (we want lots of zeros there)
         */

        const magnitude = 1 + ((luminance * 14) || 0);

        bitstring += ("0000" + magnitude.toString(2)).slice(-4);

      }
    }

    return bitstring;

  }

}