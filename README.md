# Wordly Dictionary SPA

**Wordly** is a single page dictionary application that allows users to search for words, view their meanings and even check their synonyms and see examples of how they are used.
The application uses the **Free Dictionary API**, a public dictionary service, to get accurate and up-to-date word information.
Users can also save their favorite words to the **localStorage**, making it easy to revisit previously searched words even after refreshing or reopening the browser.

<p align="center">
  <img src="./assets/Screenshot 2026-07-17 020035.png" alt="Wordly Dictionary SPA Screenshot" width="900">
</p>

---

## Features

- Search for English words
- View definitions and parts of speech
- Display pronunciation text
- Play audio pronunciation (when available)
- View usage examples
- Display synonyms
- Save and remove favorite words using **localStorage**
- User-friendly error handling for invalid or unavailable words
- Responsive design for desktop and mobile devices

---

## Technologies Used

- HTML5
- CSS
- JavaScript (ES6)
- Free Dictionary API
- Browser localStorage

---

## Project Structure

```text
Wordly-Dictionary-SPA/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── index.js
│
└── assets/
    └── Screenshot 2026-07-17 020035.png
```

---

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/Boboinna/wordly-dictionary-spa.git
```

Or download the ZIP file from GitHub.

2. Open the project folder.

3. Open **index.html** in your preferred web browser.

**OR**

Run the project using the **Live Server** extension in Visual Studio Code.

4. Enter an English word into the search field.

5. Click the **Search** button to get the word information.

---

## API Information

This application uses the **Free Dictionary API**.

**Endpoint**

```text
https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

The API provides, when available:

- Definitions
- Parts of speech
- Pronunciation text
- Audio pronunciation
- Usage examples
- Synonyms
- Source URLs

---

## Usage

1. Enter an English word into the search box.
2. Click on **Search**.
3. View the word's:
   - Definition
   - Part of speech
   - Pronunciation
   - Examples
   - Synonyms
4. Play the pronunciation audio if available.
5. Save the word to your favorites or remove it from favorites.

---

## Screenshots

### Home Page

<p align="center">
  <img src="./assets/Screenshot 2026-07-17 020035.png" alt="Wordly Dictionary SPA" width="900">
</p>

---

## GitHub Repository

https://github.com/Boboinna/wordly-dictionary-spa

---

## Limitations

- Some words may not include pronunciation audio.
- Some words may not include usage examples.
- Some words may not include synonyms.
- The application currently supports **English words only**.
- The application requires an internet connection to retrieve dictionary data.

---

## Author

**Wambui**

GitHub: https://github.com/Boboinna

---

## License

This project is intended for **educational purposes only**. You are free to study, modify and use the source code for learning and your own personal projects.








README.md Checklist
Project title
☐ Use the heading “# Wordly Dictionary SPA”.
Project description
☐ Explain what the application does.
☐ Mention that it is a Single Page Application.
☐ Mention that it uses a public dictionary API.
Features
☐ Word search.
☐ Definitions and parts of speech.
☐ Pronunciation text.
☐ Audio pronunciation.
☐ Examples.
☐ Synonyms.
☐ Favorites using localStorage.
☐ Error handling.
☐ Responsive design.
☐ Theme or dynamic styling, when included.
Technologies used
☐ HTML.
☐ CSS.
☐ JavaScript.
☐ Free Dictionary API.
☐ localStorage.
Project structure
☐ Include the folder tree for index.html, css/style.css, js/index.js, assets, and README.md.
How to run the project
☐ Clone or download the repository.
☐ Open the project folder.
☐ Open index.html in a browser or use Live Server.
☐ Enter a word in the search field.
API information
☐ Name the Free Dictionary API.
☐ Include the endpoint format: https://api.dictionaryapi.dev/api/v2/entries/en/{word}.
☐ Briefly explain that the app retrieves meanings, pronunciation, audio, examples, synonyms, and sources when available.
Usage
☐ Enter a word.
☐ Click Search.
☐ View definition and pronunciation details.
☐ Play available audio.
☐ Save or remove the word from favorites.
Screenshots
☐ Add at least one screenshot of the completed application.
☐ Store screenshots inside the assets folder.
☐ Embed the screenshot in the README using a relative path.
Links and final sections
☐ Add the deployed application link under “Live Demo”.
☐ Add the GitHub repository URL when required.
☐ List known limitations.
☐ Mention that some words lack audio, examples, or synonyms.
☐ Mention that the current version supports English words only.
☐ Add the author name and optional GitHub profile.
☐ Add a simple educational-use license statement.

9. Final Submission Check
☐ The layout works on mobile and desktop.
☐ There are no major browser console errors.
☐ The README is complete.
☐ The final code is pushed to GitHub.
☐ The deployed link works.
☐ The GitHub repository link is ready for submission.
