// ConfettiTool.js
function ConfettiTool() {
    this.name = "confettiTool";
    this.icon = "confettiTool.jpg";
  
    var points = 13;
    var spread = 10;
    var size = 10;
  
    var colourPaletteDiv = document.querySelector('.colourPalette');
    var sizeOptionDiv = document.querySelector('.size-option');
  
    // Get the existing size slider and value span
    var sizeSlider = document.getElementById("myRange");
    var sizeValue = document.getElementById("demo");
  
    // Set initial size value
    sizeValue.textContent = size;
  
    // Add an event listener to update the size variable and display the value when the slider changes
    sizeSlider.addEventListener("input", function() {
      size = sizeSlider.value;
      sizeValue.textContent = size;
    });

    this.onSelect = function() {
      // Hide the text-container, stamps-container, and mirror-container when freehand tool is selected
      document.getElementById("text-container").classList.add("hidden");
      document.getElementById("stamps-container").classList.add("hidden");
      document.getElementById("mirror-container").classList.add("hidden");
      document.getElementById("editable-container").classList.add("hidden");
      };
  
    this.onDeselect = function() {
      // Show the text-container, stamps-container, and mirror-container when freehand tool is deselected
      document.getElementById("text-container").classList.remove("hidden");
      document.getElementById("stamps-container").classList.remove("hidden");
      document.getElementById("mirror-container").classList.remove("hidden");
    document.getElementById("editable-container").classList.remove("hidden");
        };
  
    this.draw = function() {
      var rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
      var currentColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  
      var r = random(5, 10);
      if (mouseIsPressed && toolbox.selectedTool == this) {
        for (var i = 0; i < points; i++) {
          stroke(currentColor);
          strokeWeight(random(size / 2, size));
          var x = random(mouseX - spread, mouseX + spread);
          var y = random(mouseY - spread, mouseY + spread);
          point(x, y);
          point(x + random(-spread / 2, spread / 2), y + random(-spread / 2, spread / 2));
        }
      }
    };
  }
  
