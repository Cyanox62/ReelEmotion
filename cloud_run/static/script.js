/*
*   script.js file for the ReelEmotion project
*   Handles the fetch request
*/
const CLOUD_FUNCTION_URL = "https://us-central1-steel-cairn-418322.cloudfunctions.net/query-sentiment-analysis";

document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.getElementById("go-button");

    button.addEventListener("click", function (e) {
        document.getElementById("response").innerText = "";

        let value = getValue();
        console.log(value);
        if (!value) {
            alert("You must select a value to continue.");
            return;
        }

        // Making the fetch request
        fetch(CLOUD_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: value })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed');
            }
            return response.json(); 
        })
        .then(data => {
            updatePage(data)
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
        
    });
});

function getValue() {
    let select = document.getElementById("movie-select");
    if (select.value === "") {
        return false;
    } else {
        return select.value;
    }
}

function updatePage(response) {
    console.log(response);
    if (response.success != true) {
        console.log(response.error);
    } else {
        console.log(response.score);
        let score = response.score;
        let text = "";

        if (score < -.5) {
            text = "The audience found this movie to be really bad :(";
        } else if (score < 0) {
            text = "The audience found this movie to be bad :(";
        } else if (score == 0) {
            text = "The audience found this movie to be extremely mid";
        } else if (score < .5) {
            text = "The audience found this movie to be decent!";
        } else if (score < 1) {
            text = "The audience found this movie to be excellent!!!"
        } else {
            console.log("Error?");
        }

        normalizedScore = ((score+1)/2) * 100;

        scoreText = "The audience sentiment rating was: " + parseInt(normalizedScore) + "%";
        document.getElementById("response").innerText += text;
        document.getElementById('score').innerText += scoreText;
    }
}