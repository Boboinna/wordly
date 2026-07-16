document.addEventListener("DOMContentLoaded", () => {
  const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // fetch element ids
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const message = document.getElementById("message");
  const results = document.getElementById("results");
  const favorites = document.getElementById("favorites");

  // fetching word
  async function fetchWord(word) {
    try {
      const response = await fetch(word);

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const data = await response.json();

      console.log(data);
      displayWord(data);

    } catch(error) {
      console.log(error);
      displayError("There was an error encountered. Please try another word.", "red");
    }
  }

  // form submit event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // validate input
    if(input.value === "") {
      displayError("Please enter a value", "red");
    } else {
      apiUrl = `${api}${input.value.trim()}`;
      fetchWord(apiUrl);
      displayError("Searching...", "blue");
    }
  });

  // display results
  function displayWord(data) {
    results.innerHTML = "";

    const item = data[0];
      
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    const resultName = document.createElement("h3");
    resultName.textContent = item.word;

    const resultPhonetics = document.createElement("p");
    resultPhonetics.textContent = item.phonetic;

    const resultAudio = document.createElement("audio");
    resultAudio.controls = true;
    if(item.phonetics && item.phonetics.length > 0) {
      const audioUrl = item.phonetics[0].audio;
      resultAudio.src = audioUrl;
    }

    const favButton = document.createElement("button");
    favButton.textContent = "Add to Favorites";

    const resultMeanings = document.createElement("div");
    resultMeanings.className = "result-meanings";

    // display the first definition for each meaning in the meanings obj
    for (let i = 0; i < item.meanings.length; i++) {
      // part of speech
      const partOfSpeech = document.createElement("h4");
      partOfSpeech.textContent = item.meanings[i].partOfSpeech;

      // first definition in meanings obj
      const definition = document.createElement("p");
      definition.textContent = item.meanings[i].definitions[0].definition;

      // synonyms(display if available)
      const synonyms = document.createElement("p");
      if(item.meanings[i].synonyms && item.meanings[i].synonyms.length > 0) {
        synonyms.textContent = `Synonyms: ${item.meanings[i].synonyms}`;
      }

      // example (meanings -> definitions -> example)
      const example = document.createElement("p");
      if(item.meanings[i].definitions.example && item.meanings[i].definitions.example.length > 0) {
        example.textContent = `Example: ${item.meanings[i].definitions.example}`;
      }

      resultMeanings.appendChild(partOfSpeech);
      resultMeanings.appendChild(definition);
      resultMeanings.appendChild(synonyms);
      resultMeanings.appendChild(example);
    }

    const sourceUrl = document.createElement("a");
    sourceUrl.href = item.sourceUrls[0];
    sourceUrl.target = "_blank";
    sourceUrl.textContent = "Source: " + item.sourceUrls[0];

    resultCard.appendChild(resultName);
    resultCard.appendChild(resultPhonetics);
    resultCard.appendChild(resultAudio);
    resultCard.appendChild(favButton);
    resultCard.appendChild(resultMeanings);
    resultsCard.appendChild(sourceUrl);
    results.appendChild(resultCard);
  }

  // display messages
  function displayError(text, color) {
    message.innerHTML = "";
    message.textContent = text;
    message.style.color = color;
  }

  /**
   * Favorites
   */
  // Get Favorites - NOT DONE 
  function getFavorites() {

  }

  // Save Favorite - NOT DONE 
  function saveFavorite() {

  }

  // Remove Favorite - NOT DONE 
  function removeFavorite() {

  }

  // Display Favorites - NOT DONE 
  function displayFavorites() {

  }

  // clear results when the input is cleared
  function clearResults() {
    results.innerHTML = "";
    
    const placeholder = document.createElement("p");
    placeholder.textContent = "Search for a word to see results.";
    results.appendChild(placeholder);
  }

  // event listener to clear results once input is cleared - NOT DONE
  input.addEventListener("input", () => {
    if(input.value === "") {
      clearResults();
      displayError("Please enter a value", "red");
    }
  });

});



// handleSearch()
// fetchWord() - DONE
// displayWord() - DONE
// displayError() - DONE
// clearResults() - DONE
// setLoading()
// getAudioUrl() - DONE
// getSynonyms() - DONE

// getFavorites()
// saveFavorite()
// removeFavorite()
// displayFavorites()
