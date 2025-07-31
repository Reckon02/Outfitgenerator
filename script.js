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
// ... (existing clothing data, HTML element references, currentOutfit, getRandomItem) ...

// --- Main Function to Generate and Display an Outfit (UPDATED for slide-in/out text) ---
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

  // --- Phase 1: Fade out and slide out elements that ARE changing (both text and images) ---
  outfitParts.forEach((part) => {
    if (part.newItem.name !== part.currentItem?.name) {
      // Fade out image
      part.imageEl.style.opacity = "0";

      // Fade out text and slide it slightly to the left
      part.nameSpan.style.opacity = "0";
      part.nameSpan.style.transform = "translateX(-20px)"; // Slide left by 20px
      // For items that don't change, explicitly set transform to 0 to prevent previous animation states
    } else {
      part.nameSpan.style.transform = "translateX(0)";
    }
    itemsChanged = true;
  });

  // If no items changed, we don't need to do the timeout or fade-in
  if (!itemsChanged && currentOutfit.top !== null) {
    console.log("No outfit items changed. Skipping animation.");
    return; // Exit the function early
  }

  // --- Phase 2: After a delay, update content and fade/slide in changed elements ---
  setTimeout(() => {
    outfitParts.forEach((part) => {
      // Update text for all items
      part.nameSpan.textContent = part.newItem.name;

      if (part.newItem.name !== part.currentItem?.name) {
        // Update and fade in image
        part.imageEl.src = part.newItem.image;

        if (part.type === "outer" && part.newItem.image === "") {
          part.imageEl.style.opacity = "0"; // Keep outer image transparent if "No outer layer"
        } else {
          part.imageEl.style.opacity = "1"; // Fade in image
        }

        // Fade in text and slide in from the right
        part.nameSpan.style.opacity = "1";
        // When you want it to slide in, set its 'starting' transform to be offset
        // and then animate it back to translateX(0)
        // To achieve a slide-in effect, you first need to set its position
        // where it should "start" its slide *before* setting opacity to 1 and transform to 0.
        // However, since we're using a single transition and changing content,
        // the simplest way is to ensure its transform is reset to 0 when it appears.
        // The previous translateX(-20px) acts as the 'out' position.
        // We'll set it back to 0 here.
        part.nameSpan.style.transform = "translateX(0)"; // Slide back to original position
      } else if (part.type === "outer" && part.newItem.image === "") {
        // Special case for outer: if it didn't change and is "No outer layer", ensure opacity is 0
        part.imageEl.style.opacity = "0";
      } else {
        // Ensure opacity is 1 for items that didn't change
        part.imageEl.style.opacity = "1";
        part.nameSpan.style.opacity = "1";
        part.nameSpan.style.transform = "translateX(0)"; // Ensure static text stays correctly positioned
      }
    });

    // Update the currentOutfit state AFTER all updates are done
    currentOutfit.top = newRandomTop;
    currentOutfit.bottom = newRandomBottom;
    currentOutfit.outer = newRandomOuter;
    currentOutfit.shoes = newRandomShoes;
  }, 200); // Keep this delay shorter than your CSS transition duration

  console.log("Generated Outfit:", {
    top: newRandomTop.name,
    bottom: newRandomBottom.name,
    outer: newRandomOuter.name,
    shoes: newRandomShoes.name,
  });
}

// ... (existing event listener for button and initial call) ...

// --- Event Listener ---
// Initial call to generate the first outfit and set currentOutfit
generateOutfit();

generateOutfitBtn.addEventListener("click", generateOutfit);
