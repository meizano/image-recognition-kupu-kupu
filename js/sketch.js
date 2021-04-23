/* ===
BUtterflies KNN Classification using Webcam & Images with mobileNet.
=== */
let video;
let doClassifyVideo = false;
let status = document.querySelector("#status");
let imageTestPreview = document.getElementById('imageTestPreview');
let imageTrainPreview = document.getElementById('imageTrainPreview');

// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();
let featureExtractor;

function setup() {
    // Create a featureExtractor that can extract the already learned features from MobileNet
    featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
    noCanvas();
    // Create a video element
    video = createCapture(VIDEO);
    // Append it to the videoContainer DOM element
    video.parent('videoContainer');
    // Create the UI buttons
    createButtons();
    loadMyKNN();
}

function modelReady() {
    status.innerText = 'FeatureExtractor(mobileNet model) Loaded';
}

//Preview for image
//Preview for test data
function onChangePreviewTestImage() {
    let file = document.getElementById("imageTest").files[0];
    previewImage(file, imageTestPreview);
    status.innerText = "Image Test Preview";
}

//Preview for training data
function onChangePreviewTrainImage() {
    let files = document.getElementById("imageTrain").files;
    imageFiles(files, imageTrainPreview);
    status.innerText = "Image Train Preview";
}

// <!-- Preview image script -->
// <!-- reference: https://stackoverflow.com/questions/18457340/how-to-preview-selected-image-in-input-type-file-in-popup-using-jquery -->
function previewImage(imgfile, imagepreview) {
    let oFReader = new FileReader();
    oFReader.onloadend = function(oFREvent) {
        imagepreview.src = oFREvent.target.result;
    };
    if (imgfile) {
        oFReader.readAsDataURL(imgfile);
    }
};

function previewTrainImage(imgfile, imagepreview) {
    let oFReader = new FileReader();
    oFReader.onloadend = function(oFREvent) {
        let imgv = document.createElement('img');
        imagepreview.appendChild(imgv);

        imgv.src = oFREvent.target.result;
    };
    if (imgfile) {
        oFReader.readAsDataURL(imgfile);
    }
};

function imageFiles(imgfiles, imgfilepreview) {
    imgfilepreview.innerHTML = "";
    for (let i = 0; i < imgfiles.length; i++) {
        console.log(i);
        previewTrainImage(imgfiles[i], imgfilepreview);
    }
};

// Clear div for image preview
document.getElementById('clear-imagetest-preview').addEventListener('click', () => clearImagePreview(imageTestPreview));
document.getElementById('clear-imagetrain-preview').addEventListener('click', () => clearImagePreview(imageTrainPreview));

function clearImagePreview(imagediv) {
    imagediv.src = "";
    imagediv.innerHTML = "";
}

// Add the current frame from the video to the classifier
function addExample(framesource, label) {
    // Get the features of the input video
    const features = featureExtractor.infer(framesource);
    // You can also pass in an optional endpoint, defaut to 'conv_preds'
    // const features = featureExtractor.infer(video, 'conv_preds');
    // You can list all the endpoints by calling the following function
    // console.log('All endpoints: ', featureExtractor.mobilenet.endpoints)

    // Add an example with a label to the classifier
    knnClassifier.addExample(features, label);
    updateCounts();
}

function addExamples(framesources, label) {
    let imgtraindata = framesources.querySelectorAll("img");
    for (let i = 0; i < imgtraindata.length; i++) {
        console.log(i);
        addExample(imgtraindata[i], label);
    }
}

// Predict the current frame/image.
function classifyVideo(framesource) {
    // Get the total number of labels from knnClassifier
    const numLabels = knnClassifier.getNumLabels();
    if (numLabels <= 0) {
        console.error('There is no examples in any label');
        return;
    }
    // Get the features of the input video
    const features = featureExtractor.infer(framesource);

    // Use knnClassifier to classify which label do these features belong to
    // You can pass in a callback function `gotResults` to knnClassifier.classify function
    knnClassifier.classify(features, gotResultsVideo);
    // You can also pass in an optional K value, K default to 3
    // knnClassifier.classify(features, 3, gotResults);

    // You can also use the following async/await function to call knnClassifier.classify
    // Remember to add `async` before `function predictClass()`
    // const res = await knnClassifier.classify(features);
    // gotResults(null, res);
}

function classifyImage(framesource) {
    // Get the total number of labels from knnClassifier
    const numLabels = knnClassifier.getNumLabels();
    if (numLabels <= 0) {
        console.error('There is no examples in any label');
        return;
    }
    // Get the features of the input video
    const features = featureExtractor.infer(framesource);

    // Use knnClassifier to classify which label do these features belong to
    // You can pass in a callback function `gotResults` to knnClassifier.classify function
    knnClassifier.classify(features, gotResultsImage);
    // You can also pass in an optional K value, K default to 3
    // knnClassifier.classify(features, 3, gotResults);

    // You can also use the following async/await function to call knnClassifier.classify
    // Remember to add `async` before `function predictClass()`
    // const res = await knnClassifier.classify(features);
    // gotResults(null, res);
}


// A util function to create UI buttons
function createButtons() {
    // When the button is pressed, add the current frame
    buttonA = select('#addTroideshelena');
    buttonA.mousePressed(function() {
        addExample(video, 'Troideshelena');
    });

    buttonB = select('#addPachlioptaaristolochiae');
    buttonB.mousePressed(function() {
        addExample(video, 'Pachliopta aristolochiae');
    });

    buttonC = select('#addAtrophaneuracoon');
    buttonC.mousePressed(function() {
        addExample(video, 'Atrophaneura coon');
    });

    buttonD = select('#addPathysaantiphates');
    buttonD.mousePressed(function() {
        addExample(video, 'Pathysa antiphates');
    });

    buttonEBatch = select('#addPapiliomemnonBatch');
    buttonEBatch.mousePressed(function() {
        addExamples(video, 'Papilio memnon');
    });

    buttonFBatch = select('#addPapilionephelusBatch');
    buttonFBatch.mousePressed(function() {
        addExamples(video, 'Papilio nephelus');
    });

    buttonGBatch = select('#addPapiliodemoleusBatch');
    buttonGBatch.mousePressed(function() {
        addExamples(video, 'Papilio demoleus');
    });

    buttonHBatch = select('#addPapiliodemolionBatch');
    buttonHBatch.mousePressed(function() {
        addExamples(video, 'Papilio demolion');
    });
    buttonIBatch = select('#addPapilioperanthusBatch');
    buttonIBatch.mousePressed(function() {
        addExamples(video, 'Papilio peranthus');
    });

    buttonJBatch = select('#addPapiliopolyteshBatch');
    buttonJBatch.mousePressed(function() {
        addExamples(video, 'Papilio polytes');
    });

    buttonKBatch = select('#addPapilioiswaraBatch');
    buttonKBatch.mousePressed(function() {
        addExamples(video, 'Papilioiswara');
    });

    buttonLBatch = select('#addPapiliohelenusBatch');
    buttonLBatch.mousePressed(function() {
        addExamples(video, 'Papilio helenus');
    });
    buttonMBatch = select('#addGraphiumagamemnonBatch');
    buttonMBatch.mousePressed(function() {
        addExamples(video, 'Graphium agamemnon');
    });

    buttonNBatch = select('#addGraphiumdosonBatch');
    buttonNBatch.mousePressed(function() {
        addExamples(video, 'Graphium doson');
    });

    buttonOBatch = select('#addGraphiumsarpedonBatch');
    buttonOBatch.mousePressed(function() {
        addExamples(video, 'Graphium sarpedon');
    });

    buttonPBatch = select('#addMeandrusapayeniBatch');
    buttonPBatch.mousePressed(function() {
        addExamples(video, 'Meandrusa payeni');
    });

    // Train Batch
    buttonABatch = select('#addTroideshelenaBatch');
    buttonABatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Troides helena');
    });

    buttonBBatch = select('#addPachlioptaaristolochiaeBatch');
    buttonBBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Pachliopta aristolochiae');
    });

    buttonCBatch = select('#addAtrophaneuracoonBatch');
    buttonCBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Atrophaneura coon');
    });

    buttonDBatch = select('#addPathysaantiphatesBatch');
    buttonDBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Pathysa antiphates');
    });

    buttonEBatch = select('#addPapiliomemnonBatch');
    buttonEBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio memnon');
    });

    buttonFBatch = select('#addPapilionephelusBatch');
    buttonFBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio nephelus');
    });

    buttonGBatch = select('#addPapiliodemoleusBatch');
    buttonGBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio demoleus');
    });

    buttonHBatch = select('#addPapiliodemolionBatch');
    buttonHBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio demolion');
    });
    buttonIBatch = select('#addPapilioperanthusBatch');
    buttonIBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio peranthus');
    });

    buttonJBatch = select('#addPapiliopolyteshBatch');
    buttonJBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio polytes');
    });

    buttonKBatch = select('#addPapilioiswaraBatch');
    buttonKBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilioiswara');
    });

    buttonLBatch = select('#addPapiliohelenusBatch');
    buttonLBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Papilio helenus');
    });
    buttonMBatch = select('#addGraphiumagamemnonBatch');
    buttonMBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Graphium agamemnon');
    });

    buttonNBatch = select('#addGraphiumdosonBatch');
    buttonNBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Graphium doson');
    });

    buttonOBatch = select('#addGraphiumsarpedonBatch');
    buttonOBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Graphium sarpedon');
    });

    buttonPBatch = select('#addMeandrusapayeniBatch');
    buttonPBatch.mousePressed(function() {
        addExamples(imageTrainPreview, 'Meandrusa payeni');
    });

    // Predict button
    buttonPredictVideo = select('#btnPredictVideo');
    buttonPredictVideo.mousePressed(function() {
        classifyVideo(video);
        // Mencatat kondisi classifyVideo
        doClassifyVideo = (doClassifyVideo) ? false : true;
    });

    // Predict button
    buttonPredictImage = select('#btnPredictImage');
    buttonPredictImage.mousePressed(function() {
        classifyImage(imageTestPreview);
    });

    // Clear all classes button
    buttonClearAll = select('#clearAll');
    buttonClearAll.mousePressed(clearAllLabels);

    // Load saved classifier dataset
    buttonSetData = select('#load');
    buttonSetData.mousePressed(loadMyKNN);

    // Get classifier dataset
    buttonGetData = select('#save');
    buttonGetData.mousePressed(saveMyKNN);
}

// Show the results
function gotResultsVideo(err, result) {
    if (doClassifyVideo) {
        // Display any error
        if (err) {
            console.error(err);
        }

        if (result.confidencesByLabel) {
            const confidences = result.confidencesByLabel;
            // result.label is the label that has the highest confidence
            if (result.label) {
                select('#videoResult').html(result.label);
                select('#videoConfidence').html(`${confidences[result.label] * 100} %`);
            }

            select('#confidenceTroideshelena').html(`${confidences['Troides helena'] ? confidences['Troides helena'] * 100 : 0} %`);
            select('#confidencePachlioptaaristolochiae').html(`${confidences['Pachliopta aristolochiae'] ? confidences['Pachliopta aristolochiae'] * 100 : 0} %`);
            select('#confidenceAtrophaneuracoon').html(`${confidences['Atrophaneura coon'] ? confidences['Atrophaneuracoon'] * 100 : 0} %`);
            select('#confidencePathysaantiphates').html(`${confidences['Pathysa antiphates'] ? confidences['Pathysaantiphates'] * 100 : 0} %`);
            select('#confidencePapiliomemnon').html(`${confidences['Papilio memnon'] ? confidences['Papilio memnon'] * 100 : 0} %`);
            select('#confidencePapilionephelus').html(`${confidences['Papilio nephelus'] ? confidences['Papilio nephelus'] * 100 : 0} %`);
            select('#confidencePapiliodemoleus').html(`${confidences['Papilio demoleus'] ? confidences['Papilio demoleus'] * 100 : 0} %`);
            select('#confidencePapiliodemolion').html(`${confidences['Papilio demolion'] ? confidences['Papilio demolion'] * 100 : 0} %`);
            select('#confidencePapilioperanthus').html(`${confidences['Papilio peranthus'] ? confidences['Papilio peranthus'] * 100 : 0} %`);
            select('#confidencePapiliopolytes').html(`${confidences['Papilio polytes'] ? confidences['Papilio polytes'] * 100 : 0} %`);
            select('#confidencePapilioiswara').html(`${confidences['Papilio iswara'] ? confidences['Papilio iswara'] * 100 : 0} %`);
            select('#confidencePapiliohelenus').html(`${confidences['Papilio helenus'] ? confidences['Papilio helenus'] * 100 : 0} %`);
            select('#confidenceGraphiumagamemnon').html(`${confidences['Graphium agamemnon'] ? confidences['Graphium agamemnon'] * 100 : 0} %`);
            select('#confidenceGraphiumdoson').html(`${confidences['Graphium doson'] ? confidences['Graphium doson'] * 100 : 0} %`);
            select('#confidenceGraphiumsarpedon').html(`${confidences['Graphium sarpedon'] ? confidences['Graphium sarpedon'] * 100 : 0} %`);
            select('#confidenceMeandrusapayeni').html(`${confidences['Meandrusa payeni'] ? confidences['Meandrusa payeni'] * 100 : 0} %`);
        }

        classifyVideo(video);
    }
}

function gotResultsImage(err, result) {
    // Display any error
    if (err) {
        console.error(err);
    }

    if (result.confidencesByLabel) {
        const confidences = result.confidencesByLabel;
        // result.label is the label that has the highest confidence
        if (result.label) {
            select('#imageResult').html(result.label);
            select('#imageConfidence').html(`${confidences[result.label] * 100} %`);
        }

        select('#confidenceTroideshelena').html(`${confidences['Troides helena'] ? confidences['Troides helena'] * 100 : 0} %`);
        select('#confidencePachlioptaaristolochiae').html(`${confidences['Pachliopta aristolochiae'] ? confidences['Pachliopta aristolochiae'] * 100 : 0} %`);
        select('#confidenceAtrophaneuracoon').html(`${confidences['Atrophaneura coon'] ? confidences['Atrophaneura coon'] * 100 : 0} %`);
        select('#confidencePathysaantiphates').html(`${confidences['Pathysa antiphates'] ? confidences['Pathysa antiphates'] * 100 : 0} %`);
        select('#confidencePapiliomemnon').html(`${confidences['Papilio memnon'] ? confidences['Papilio memnon'] * 100 : 0} %`);
        select('#confidencePapilionephelus').html(`${confidences['Papilio nephelus'] ? confidences['Papilio nephelus'] * 100 : 0} %`);
        select('#confidencePapiliodemoleus').html(`${confidences['Papilio demoleus'] ? confidences['Papilio demoleus'] * 100 : 0} %`);
        select('#confidencePapiliodemolion').html(`${confidences['Papilio demolion'] ? confidences['Papilio demolion'] * 100 : 0} %`);
        select('#confidencePapilioperanthus').html(`${confidences['Papilio peranthus'] ? confidences['Papilio peranthus'] * 100 : 0} %`);
        select('#confidencePapiliopolytes').html(`${confidences['Papilio polytes'] ? confidences['Papilio polytes'] * 100 : 0} %`);
        select('#confidencePapilioiswara').html(`${confidences['Papilio iswara'] ? confidences['Papilio iswara'] * 100 : 0} %`);
        select('#confidencePapiliohelenus').html(`${confidences['Papilio helenus'] ? confidences['Papilio helenus'] * 100 : 0} %`);
        select('#confidenceGraphiumagamemnon').html(`${confidences['Graphium agamemnon'] ? confidences['Graphium agamemnon'] * 100 : 0} %`);
        select('#confidenceGraphiumdoson').html(`${confidences['Graphium doson'] ? confidences['Graphium doson'] * 100 : 0} %`);
        select('#confidenceGraphiumsarpedon').html(`${confidences['Graphium sarpedon'] ? confidences['Graphium sarpedon'] * 100 : 0} %`);
        select('#confidenceMeandrusapayeni').html(`${confidences['Meandrusa payeni'] ? confidences['Meandrusa payeni'] * 100 : 0} %`);
    }
}

// Update the example count for each label	
function updateCounts() {
    const counts = knnClassifier.getCountByLabel();

    select('#exampleTroideshelena').html(counts['Troideshelena'] || 0);
    select('#examplePachlioptaaristolochiae').html(counts['Pachliopta aristolochiae'] || 0);
    select('#exampleAtrophaneuracoon').html(counts['Atrophaneura coon'] || 0);
    select('#examplePathysaantiphates').html(counts['Pathysa antiphates'] || 0);
    select('#examplePapiliomemnon').html(counts['Papilio memnon'] || 0);
    select('#examplePapilionephelus').html(counts['Papilio nephelus'] || 0);
    select('#examplePapiliodemoleus').html(counts['Papilio demoleus'] || 0); 
    select('#examplePapiliodemolion').html(counts['Papilio demolion'] || 0);
    select('#examplePapilioperanthus').html(counts['Papilio peranthus'] || 0); 
    select('#examplePapiliopolytes').html(counts['Papilio polytes'] || 0); 
    select('#examplePapilioiswara').html(counts['Papilio iswara'] || 0); 
    select('#examplePapiliohelenus').html(counts['Papilio helenus'] || 0);
    select('#exampleGraphiumagamemnon').html(counts['Graphium agamemnon'] || 0); 
    select('#exampleGraphiumdoson').html(counts['Graphium doson'] || 0); 
    select('#exampleGraphiumsarpedon').html(counts['Graphium sarpedon'] || 0); 
    select('#exampleMeandrusapayeni').html(counts['Meandrusa payeni'] || 0);  
}

// Clear the examples in one label
function clearLabel(label) {
    knnClassifier.clearLabel(label);
    updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
    knnClassifier.clearAllLabels();
    updateCounts();
}

// Save dataset as myKNNDataset.json
function saveMyKNN() {
    knnClassifier.save('ButterflyKNNDataset');
}

// Load dataset to the classifier
function loadMyKNN() {
    knnClassifier.load('./ButterflyKNNDataset.json', updateCounts);
}