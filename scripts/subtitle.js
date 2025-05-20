const texts =
	  [
		  "Text 1",
		  "Text 2",
		  "Text 3",
		  "Text 4"
	  ]; // Array of texts
const randomIndex = Math.floor(Math.random() * texts.length); // Generate a random index from the array
const subtitle = document.getElementById("flavor"); // Get the subtitle element by ID
subtitle.textContent = texts[randomIndex]; // Set the subtitle text to the randomly selected text from the array