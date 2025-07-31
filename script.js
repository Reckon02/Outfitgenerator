// Clothing Data
const tops = [
  { name: "White T-Shirt", image: "images/white-shirt.webp" },
  { name: "Black T-Shirt", image: "images/black-shirt.webp" },
];
const bottoms = [
  { name: "Brown Jean", image: "images/carhartt.png" },
  { name: "Black Jean", image: "images/black-jeans.png" },
  { name: "Grey Jean", image: "images/grey-jeans.png" },
];
const outerLayers = [{ name: "Jacket", image: "images/jacket.png" }];
const shoes = [
  { name: "Onitsuka Tigers", image: "images/tiger.png" },
  { name: "Sambas", image: "/images/samba.png" },
];

// --- HTML Elements (Cached for easy access) ---
// Text Spans
const topItemSpan = document.getElementById("topItem");
const bottomItemSpan = document.getElementById("bottomItem");
const outerItemSpan = document.getElementById("outerItem");
const shoesItemSpan = document.getElementById("shoesItem");
const generateOutfitBtn = document.getElementById("generateOutfitBtn");

// Image Elements
const topImage = document.getElementById("topImage");
const bottomImage = document.getElementById("bottomImage");
const outerImage = document.getElementById("outerImage");
const shoesImage = document.getElementById("shoesImage");

// --- Store the currently displayed outfit items  ---
let currentOutfit = {
  top: null,
  bottom: null,
  outer: null,
  shoes: null,
};

// --- Helper Function to Get a Random Item from an Array ---
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// --- Main Function to Generate and Display an Outfit (UPDATED for conditional animation) ---
function generateOutfit() {
  // 1. Get a random item OBJECT for each category
  const newRandomTop = getRandomItem(tops);
  const newRandomBottom = getRandomItem(bottoms);
  const newRandomOuter = getRandomItem(outerLayers);
  const newRandomShoes = getRandomItem(shoes);

  // Create an array of objects for easier iteration
  const outfitParts = [
    {
      nameSpan: topItemSpan,
      imageEl: topImage,
      newItem: newRandomTop,
      currentItem: currentOutfit.top,
      type: "top",
    },
    {
      nameSpan: bottomItemSpan,
      imageEl: bottomImage,
      newItem: newRandomBottom,
      currentItem: currentOutfit.bottom,
      type: "bottom",
    },
    {
      nameSpan: outerItemSpan,
      imageEl: outerImage,
      newItem: newRandomOuter,
      currentItem: currentOutfit.outer,
      type: "outer",
    },
    {
      nameSpan: shoesItemSpan,
      imageEl: shoesImage,
      newItem: newRandomShoes,
      currentItem: currentOutfit.shoes,
      type: "shoes",
    },
  ];

  let itemsChanged = false; // Flag to check if any item actually changed

  // --- Phase 1: Fade out elements that ARE changing ---
  outfitParts.forEach((part) => {
    if (part.newItem.name !== part.currentItem?.name) {
      // Check if new item name is different from current
      part.imageEl.style.opacity = "0"; // Fade out
      itemsChanged = true; // Mark that at least one item is changing
    }
  });

  // If no items changed, we don't need to do the timeout or fade-in
  if (!itemsChanged && currentOutfit.top !== null) {
    // currentOutfit.top !== null check prevents console log on initial load
    console.log("No outfit items changed. Skipping animation.");
    return; // Exit the function early
  }

  // --- Phase 2: After a delay, update content and fade in changed elements ---
  setTimeout(() => {
    outfitParts.forEach((part) => {
      // Update text for all items, even if not animating, for consistency
      part.nameSpan.textContent = part.newItem.name;

      if (part.newItem.name !== part.currentItem?.name) {
        // Only update and fade in if it changed
        part.imageEl.src = part.newItem.image;

        // Handle "No outer layer" case for its specific image element
        if (part.type === "outer" && part.newItem.image === "") {
          part.imageEl.style.opacity = "0"; // Keep transparent
        } else {
          part.imageEl.style.opacity = "1"; // Fade in
        }
      } else if (part.type === "outer" && part.newItem.image === "") {
        // Special case for outer: if it didn't change and is "No outer layer", ensure opacity is 0
        part.imageEl.style.opacity = "0";
      } else {
        // Ensure opacity is 1 for items that didn't change and aren't "no outer layer"
        part.imageEl.style.opacity = "1";
      }
    });

    // Update the currentOutfit state AFTER all updates are done
    currentOutfit.top = newRandomTop;
    currentOutfit.bottom = newRandomBottom;
    currentOutfit.outer = newRandomOuter;
    currentOutfit.shoes = newRandomShoes;
  }, 200); // This delay should be shorter than your CSS transition duration

  console.log("Generated Outfit:", {
    top: newRandomTop.name,
    bottom: newRandomBottom.name,
    outer: newRandomOuter.name,
    shoes: newRandomShoes.name,
  });
}

// --- Event Listener ---
// Initial call to generate the first outfit and set currentOutfit
generateOutfit();

generateOutfitBtn.addEventListener("click", generateOutfit);
