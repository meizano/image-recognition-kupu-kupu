# Offline Tensorflow.js & mobilenet.js
Because mobilenet.js try to access online file, there's a problem with CORS and offline mode.
This is a workaround try to make all the file available offline.

1. Download all the javascript library:
* https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/
* https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet/dist/
* https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier/dist/

2. Download all the shard:
* https://storage.googleapis.com/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_100_224/classification/1/model.json
* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard1of5?tfjs-format=file
* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard2of5?tfjs-format=file
* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard3of5?tfjs-format=file
* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard4of5?tfjs-format=file
* https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/group1-shard5of5?tfjs-format=file

3. Open mobilenet.min.js, beautify (format the text so it's readable), save as mobilenet.js
4. 