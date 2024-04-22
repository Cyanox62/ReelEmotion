/*
*   script.js file for the ReelEmotion project
*   Handles the fetch request
*/
const CLOUD_FUNCTION_URL = "https://us-central1-steel-cairn-418322.cloudfunctions.net/query-sentiment-analysis";

document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.getElementById("go-button");

    button.addEventListener("click", function (e) {
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
    if (response.success != true) {
        console.log("ERROR");
    } else {
        console.log(response.score);

        // Need to interpret the score

        text = 'testing' + response.score;
        document.getElementById("response").innerText += text;
    }
}