

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#webcam-container');


function captureImage() {
    Webcam.snap(function(data_uri) {
        document.getElementById('captured-image').innerHTML = '<img src="' + data_uri + '"/>';
    });
}


function identifyImage() {
    const image = document.querySelector('#captured-image img');
    if (image) {
        check(image);
    } else {
        alert('Please capture an image first.');
    }
}

const modelURL = 'https://teachablemachine.withgoogle.com/models/your_model_link/model.json';
const classifier = ml5.imageClassifier(modelURL, () => {
    console.log('Model Loaded!');
});


console.log(`ml5 version: ${ml5.version}`);

function check(image) {
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    document.getElementById('family-member-name').innerText = `Identified: ${results[0].label}`;
    document.getElementById('accuracy').innerText = `Accuracy: ${(results[0].confidence * 100).toFixed(2)}%`;
}
