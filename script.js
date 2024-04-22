document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.getElementById("go-button");
    button.addEventListener("click", function (e) {
        let value = getValue();
        if (!value) {
            alert("You must select a value to continue.");
            return;
        }

        // To do:
        // - connect to the API here (5 mins -- once we have gcf link)
        // - take the API feedback and format it onto the page (probs like 5 mins)
        const CLOUD_FUNCTION_URL = "https://us-central1-steel-cairn-418322.cloudfunctions.net/query-sentiment-analysis";
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
            console.log(data); 
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
        return select.options[select.value].text;
    }
}