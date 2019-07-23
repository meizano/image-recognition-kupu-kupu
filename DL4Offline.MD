# Offline Tensorflow.js & mobilenet.js
Because mobilenet.js try to access online file, there's a problem with CORS and offline mode.
This is a workaround try to make all the file available offline.

1. Download all the javascript library:
..* https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/
..* https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet/dist/
..* https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier/dist/

2. Download all the shard:
..* https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_100_224/classification/1/model.json
..* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard1of5?tfjs-format=file
..* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard2of5?tfjs-format=file
..* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard3of5?tfjs-format=file
..* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard4of5?tfjs-format=file
..* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard5of5?tfjs-format=file

3. Open mobilenet.min.js, beautify (format the text so it's readable), save as mobilenet.js
4. look for this line: https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1 and change it to model100. Save it.
5. put group1-shard1of5, group1-shard2of5, group1-shard3of5, group1-shard4of5, group1-shard5of5, and model.json inside model100 in the root directory
6. Link the library in top of your page like this:
```
<script src="js/tfjs/tf.min.js"></script>
<script src="js/mobilenet/mobilenet.js"></script>
<script src="js/knn-classifier/knn-classifier.min.js"></script>
```
7. And, you're good to go!

> You can do it for other value (025,050,075, v2)

Maybe related topic:
* [Image Classification with client-side neural network using TensorFlow.js](https://medium.com/agara-labs/image-classification-with-the-client-side-neural-network-using-tensorflow-js-8f94d3dc7c5c)
* [Image Recognition/Labeling using TensorFlow.js](https://stackoverflow.com/questions/54867308/image-recognition-labeling-using-tensorflow-js)