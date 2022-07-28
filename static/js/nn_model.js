const preprocessImage = (rawCanvas) => {
  let tensor = tf.browser
    .fromPixels(rawCanvas, numChannels=1)
    .resizeNearestNeighbor([28, 28])
    .reshape([1, 28 * 28])
    .toFloat();
  
  return tensor.div(255.0);
};

function predict(rawCanvas) {
  if (window.model) {
    const image = preprocessImage(rawCanvas);
    const scores = window.model.predict(image).dataSync();
    let prediction = scores.indexOf(Math.max(...scores));
    console.log(`Predicted value: ${prediction}`);
  }
}

(async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('Neural network model loaded!');
})();
