const resultDiv = document.querySelector(".result");
// Saves the word typed for the user
const wordEle = document.querySelector("#word"); // document.getElementById('');
const phonetics = document.querySelector(".phonetics"); // Fetching the phonetics
const audio = document.querySelector("audio"); // select tag name, fetching the audio tag
const wordMeaning = document.querySelector(".word-definition"); // Fetching definition
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // Endpoint URL of the API

// Async function to process the work in background
const handle = async (e) => {
    // If Enter key was pressed, fetch the whole word in the input field
    if (e.keyCode == 13) {
        const word = e.target.value;
        // Make a request to the api
        const result = await fetch(url + word);
        // Shows the div card with the definition of the word, changing the css property
        resultDiv.style.display = "block";
        // Parse the information getting from the API
        const data = await result.json();
        // If the server API is avaliable
        if (result.ok) {
            document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
            document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
            phonetics.style.removeProperty("display");
            audio.style.removeProperty("display");
            // Shows up the word inside the textbox in the definition card
            wordEle.innerText = data[0].word;
            // Shows up the phonetics associate of the word tipped in the textbox
            phonetics.innerText = data[0].phonetics[0].text;
            // Zero represents the first index of the JSON data
            audio.src = data[0].phonetics[0].audio;
            // Shows up the definition
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
            // Fetch the synonyms from JSON format API
            const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
            let synonymsData = "";
            if (synonymsArray.length) {
                for (let i = 0; i < synonymsArray.length; i++) {
                    synonymsData += `<p class="pills">${synonymsArray[i]}</p>`
                }
            }
            // If there are no synonyms
            else {
                synonymsData = `<p class="pills">No Synonyms Available</p>`;
            }
            // Put the result of the query in the DOM
            document.querySelector(".synonyms").innerHTML = synonymsData;
        // If error 404 occurs
        } else {
            audio.style.display = "none";
            // This data comes from API
            wordEle.innerText = data.title;
            // No shows p tags for definition chart
            document.querySelectorAll(".wordmeaning")[0].style.display = "none";
            document.querySelectorAll(".wordmeaning")[1].style.display = "none";
            phonetics.style.display = "none";
            // This data comes from API too
            wordMeaning.innerText = data.message;
            document.querySelector(".synonyms").style.display = "none";
        }
    }
}