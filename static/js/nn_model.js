const preprocessImage = (rawCanvas) => {
  /*
    Resource:
    
    https://gist.github.com/bensonruan/975912eae1fefe84984e4b5a7662e0c0
  */
  let tensor = tf.browser
    .fromPixels(rawCanvas)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
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

async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('Neural network model loaded!');
};
