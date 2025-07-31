// Clothing Data
const tops = ["White T-Shirt", "Black T-Shirt"];
const bottoms = ["Black Loose Jeans", "Brown Jeans"];
const outerLayers = ["Cool Jacket", "Green Napapijri"];
const shoes = ["Dark Adidas", "Onitsuka Tigers"];

// HTML Elements
// Get references for the HTML elements where we'll display the outfits
const topItemSpan = document.getElementById("topItem");
const bottomItemSpan = document.getElementById("bottomItem");
const outerItemSpan = document.getElementById("outerItem");
const shoesItemSpan = document.getElementById("shoesItem");
const generateOutfitBtn = document.getElementById("generateOutfitBtn");

// --- Helper Function to Get a Random Item from an Array ---
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// --- Main Function to Generate and Display an Outfit ---
function generateOutfit() {
  // 1. Get a random item for each category
  const randomTop = getRandomItem(tops);
  const randomBottom = getRandomItem(bottoms);
  const randomOuter = getRandomItem(outerLayers);
  const randomShoes = getRandomItem(shoes);

  // 2. Update the HTML with the selected items
  topItemSpan.textContent = randomTop;
  bottomItemSpan.textContent = randomBottom;
  outerItemSpan.textContent = randomOuter;
  shoesItemSpan.textContent = randomShoes;

  console.log("Generated Outfit:", {
    top: randomTop,
    bottom: randomBottom,
    outer: randomOuter,
    shoes: randomShoes,
  });
}

// --- Event Listener ---
// Call generateOutfit once when the page loads to show an initial outfit
generateOutfit();

// Attach the generateOutfit function to the button's click event
generateOutfitBtn.addEventListener("click", generateOutfit);
