document.addEventListener("DOMContentLoaded", () => {
  // fetch element ids
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const message = document.getElementById("message");
  const results = document.getElementById("results");
  const favorites = document.getElementById("favorites");

  let favoriteWords = getFavorites();
  let activeWord = "";
  let activeFavoriteButton = null;

  function normalizeWord(word) {
    return word.trim().toLowerCase();
  }

  function storeFavorites() {
    localStorage.setItem("wordly-favorites", JSON.stringify(favoriteWords));
  }

  // Check whether a word is already saved.
  function isFavorite(word) {
    return favoriteWords.includes(normalizeWord(word));
  }

  // Keep the save button text and state in sync with the saved list.
  function updateFavoriteButtonState(word, button) {
    const saved = isFavorite(word);
    button.textContent = saved ? "Saved" : "Add to Favorites";
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
  }

  function searchWord(word) {
    const trimmedWord = word.trim();

    if (trimmedWord === "") {
      displayError("Please enter a value", "red");
      return;
    }

    input.value = trimmedWord;
    displayError("Searching...", "blue");
    fetchWord(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(trimmedWord)}`);
  }

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
      const placeholder = document.createElement("p");
      placeholder.innerHTML = "";
      placeholder.textContent = "Search for a word to see results.";
      placeholder.className = "empty";
      results.appendChild(placeholder);
    }
  }

  // form submit event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchWord(input.value);
  });

  // display results
  function displayWord(data) {
    results.innerHTML = "";

    const item = data[0];
    activeWord = item.word;
      
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    const resultHeader = document.createElement("div");
    resultHeader.className = "result-header";

    const resultName = document.createElement("h3");
    resultName.textContent = item.word;

    const resultPhonetics = document.createElement("p");
    resultPhonetics.textContent = item.phonetic;

    resultHeader.appendChild(resultName);
    resultHeader.appendChild(resultPhonetics);

    const resultActions = document.createElement("div");
    resultActions.className = "result-actions";

    const resultAudio = document.createElement("audio");
    resultAudio.controls = true;

    if(item.phonetics && item.phonetics.length > 0) {
      // because a lot of words have first audio as empty, we check if the first audio is empty and use the second one if it is
      if(item.phonetics[0].audio === "" && item.phonetics[1].audio !== "" ) {
        const audioUrl = item.phonetics[1].audio;
        resultAudio.src = audioUrl;
      } else if(item.phonetics[0].audio !== "") {
        const audioUrl = item.phonetics[0].audio;
        resultAudio.src = audioUrl;
      }
      // To make sure it exists before appending
      resultActions.appendChild(resultAudio); 
    }

    const favButton = document.createElement("button");
    favButton.type = "button";
    favButton.className = "favorite-save-button";
    favButton.addEventListener("click", () => saveFavorite(item.word));

    resultActions.appendChild(favButton);

    const resultMeanings = document.createElement("div");
    resultMeanings.className = "result-meanings";

    // display the first definition for each meaning in the meanings obj
    for (let i = 0; i < item.meanings.length; i++) {
      const meaningItem = document.createElement("div");
      meaningItem.className = "meaning-item";

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

      meaningItem.appendChild(partOfSpeech);
      meaningItem.appendChild(definition);
      meaningItem.appendChild(synonyms);
      meaningItem.appendChild(example);
      resultMeanings.appendChild(meaningItem);
    }

    const sourceUrl = document.createElement("a");
    sourceUrl.href = item.sourceUrls[0];
    sourceUrl.target = "_blank";
    sourceUrl.textContent = "Source: " + item.sourceUrls[0];

    updateFavoriteButtonState(item.word, favButton);

    resultCard.appendChild(resultHeader);
    resultCard.appendChild(resultActions);
    resultCard.appendChild(resultMeanings);
    resultCard.appendChild(sourceUrl);
    results.appendChild(resultCard);

    displayError("Word loaded.", "green");

    activeFavoriteButton = favButton;
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
  // Read the saved favorites list from local storage.
  function getFavorites() {
    const storedFavorites = localStorage.getItem("wordly-favorites");

    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }

    return [];
  }

  // Save Favorite
  function saveFavorite(word) {
    const normalizedWord = normalizeWord(word);

    if (!normalizedWord || favoriteWords.includes(normalizedWord)) {
      updateFavoriteButtonState(word, activeFavoriteButton);
      return;
    }

    favoriteWords.unshift(normalizedWord);
    storeFavorites();
    displayFavorites();
    updateFavoriteButtonState(word, activeFavoriteButton);
  }

  // Remove Favorite
  function removeFavorite(word) {
    const normalizedWord = normalizeWord(word);
    favoriteWords = favoriteWords.filter((favoriteWord) => favoriteWord !== normalizedWord);
    storeFavorites();
    displayFavorites();
    updateFavoriteButtonState(activeWord, activeFavoriteButton);

  }

  // Display Favorites
  function displayFavorites() {
    favorites.innerHTML = "";

    if (favoriteWords.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "empty";
      emptyState.textContent = "No favorite words saved yet";
      favorites.appendChild(emptyState);
      return;
    }

    const list = document.createElement("div");
    list.className = "favorite-list";

    favoriteWords.forEach((favoriteWord) => {
      const item = document.createElement("div");
      item.className = "favorite-item";

      // when clicked, word is searched
      const wordButton = document.createElement("button");
      wordButton.type = "button";
      wordButton.className = "favorite-word-button";
      wordButton.textContent = favoriteWord;
      wordButton.addEventListener("click", () => searchWord(favoriteWord));

      // remove from favorite list
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "favorite-remove-button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", (e) => {
        // Prevent the click from also triggering the word search button.
        e.stopPropagation();
        removeFavorite(favoriteWord);
      });

      item.appendChild(wordButton);
      item.appendChild(removeButton);
      list.appendChild(item);
    });

    favorites.appendChild(list);

  }

  // clear results when the input is cleared
  function clearResults() {
    results.innerHTML = "";
    
    const placeholder = document.createElement("p");
    placeholder.textContent = "Search for a word to see results.";
    results.appendChild(placeholder);
  }

  // event listener to clear results once input is cleared
  input.addEventListener("input", () => {
    if(input.value === "") {
      clearResults();
      displayError("Please enter a value", "red");
    }
  });

  displayFavorites();

});
