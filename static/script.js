/*
*   script.js file for the ReelEmotion project
*   Handles the fetch request
*/
const CLOUD_FUNCTION_URL = "https://us-central1-steel-cairn-418322.cloudfunctions.net/query-sentiment-analysis";
let result = "";

document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.getElementById("go-button");

    if (button) {
        button.addEventListener("click", function (e) {
            let value = getValue();
            console.log(value);
            if (!value) {
                alert("You must select a value to continue.");
                return;
            } else {
                makeRequest();
                // To do:
                // - connect to the API here 
                // - take the API feedback and format it onto the page (probs like 5 mins)
                // window.location.href = "ResultPage.html";
            }
        });
    } else {    
        console.log("HERE");
        console.log(result);
    }
    // Then reload the page to the other one.
});

async function makeRequest() {
    console.log("In make request");
    const response = await fetch(CLOUD_FUNCTION_URL);
    result = await response.json();
    console.log(result);
  }

function getValue() {
    let select = document.getElementById("movie-select");
    if (select.value === "") {
        return false;
    } else {
        return select.value;
    }
}