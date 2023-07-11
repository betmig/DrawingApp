function textTool() {
	this.name = "textTool";
	this.icon = "textTool.jpg";
	this.fontFamilies = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Georgia", "Verdana"];
	this.selectedFont = "Arial";
	this.fontSize = 16;
	this.textStyle = "normal"; // add a textStyle property
  
	var colorInput = document.getElementById("colour");
	var hexInput = document.getElementById("hex");
	var swatches = document.querySelectorAll(".colourSwatches");
	var textInput = document.getElementById("textInput");
	var sizeSlider = document.getElementById("myRange");
	var sizeDisplay = document.getElementById("demo");
	var sizeValue = parseInt(sizeSlider.value);
	sizeDisplay.innerHTML = sizeValue;
  
	colorInput.addEventListener("input", function() {
	  drawingContext.fillStyle = colorInput.value; // use fillStyle instead of strokeStyle
	  hexInput.value = colorInput.value;
	});
  
	hexInput.addEventListener("input", function() {
	  drawingContext.fillStyle = hexInput.value; // use fillStyle instead of strokeStyle
	  colorInput.value = hexInput.value;
	});
  
	for (var i = 0; i < swatches.length; i++) {
	  swatches[i].addEventListener("click", function() {
		drawingContext.fillStyle = this.style.backgroundColor; // use fillStyle instead of strokeStyle
		colorInput.value = this.style.backgroundColor;
		hexInput.value = rgbToHex(this.style.backgroundColor);
	  });
	}

	this.onSelect = function() {
		// Hide the text-container, stamps-container, and mirror-container when freehand tool is selected
		document.getElementById("stamps-container").classList.add("hidden");
		document.getElementById("mirror-container").classList.add("hidden");
		document.getElementById("editable-container").classList.add("hidden");
	  };

	this.onDeselect = function() {
    // Show the text-container, stamps-container, and mirror-container when freehand tool is deselected
    document.getElementById("stamps-container").classList.remove("hidden");
    document.getElementById("mirror-container").classList.remove("hidden");
	document.getElementById("editable-container").classList.remove("hidden");
      };

  
	this.draw = function() {
		var currentColor = drawingContext.strokeStyle;
		var currentFont = drawingContext.font;
	  
		if (mouseIsPressed) {
		  if (textInput.value.trim() !== "") {
			noFill(); // set fill to transparent
			stroke(currentColor); // use stroke instead of fill
			strokeWeight(1); // set stroke weight to 1
			textSize(this.fontSize);
			textFont(this.selectedFont);
			textStyle(this.textStyle); // use the current textStyle property
			text(textInput.value, mouseX, mouseY);
		  }
		}
	  };
	this.populateOptions = function() {
	  var fontFamilySelect = document.getElementById("fontSelect");
	  fontFamilySelect.addEventListener("change", function() {
		this.selectedFont = fontFamilySelect.value;
	  }.bind(this));
  
	  sizeSlider.addEventListener("input", function() {
		sizeValue = parseInt(sizeSlider.value);
		sizeDisplay.innerHTML = sizeValue;
		this.fontSize = map(sizeValue, 1, 80, 8, 64);
	  }.bind(this));
	  
	  var boldButton = document.getElementById("boldButton");
	  var italicButton = document.getElementById("italicButton");

	  var normalButton = document.getElementById("normalButton");
		normalButton.addEventListener("click", function() {
		this.textStyle = "normal";
		}.bind(this));

	  boldButton.addEventListener("click", function() {
		this.textStyle = "bold"; // set the textStyle to bold
	  }.bind(this));
	  
	  italicButton.addEventListener("click", function() {
		this.textStyle = "italic"; // set the textStyle to italic
	  }.bind(this));
	};
}
