function FreehandTool() {
	// set an icon and a name for the object
	this.icon = "freehand.jpg";
	this.name = "freehand";
  
	// to smoothly draw we'll draw a line from the previous mouse location
	// to the current mouse location. The following values store
	// the locations from the last frame. They are -1 to start with because
	// we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
  
	// make the default stroke 10 pixels in size and black in color
	var size = 10;
  
	// get the slider and add an event listener
	var slider = document.getElementById("myRange");
	slider.addEventListener("input", function() {
	  size = this.value;
	  document.getElementById("demo").innerHTML = this.value;
	});
  
	// get the color picker and add an event listener
	var colorPicker = document.getElementById("colour");
	colorPicker.addEventListener("input", function() {
	  var c = hexToRgb(this.value);
	  color = [c.r, c.g, c.b];
	});
  
	// get the hex input field and add an event listener
	var hexInput = document.getElementById("hex");
	hexInput.addEventListener("input", function() {
	  var c = hexToRgb(this.value);
	  color = [c.r, c.g, c.b];
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

	// set the size of the stroke
	this.setSize = function(newSize) {
	  size = newSize;
	};
  
	// set the color of the stroke using an RGB array
	this.setColor = function(newColor) {
	  color = newColor;
	};
  
	// set the color of the stroke using a hex code
	this.setHexColor = function(hexCode) {
	  var c = hexToRgb(hexCode);
	  color = [c.r, c.g, c.b];
	};
  
	// draw the tool
	this.draw = function() {
	  // if the mouse is pressed
	  if (mouseIsPressed) {
		// check if the previousX and Y are -1. set them to the current
		// mouse X and Y if they are.
		if (previousMouseX == -1) {
		  stroke(color[0], color[1], color[2]);
		  strokeWeight(size);
		  previousMouseX = mouseX;
		  previousMouseY = mouseY;
		}
		// if we already have values for previousX and Y we can draw a line from
		// there to the current mouse location
		else {
		  line(previousMouseX, previousMouseY, mouseX, mouseY);
		  previousMouseX = mouseX;
		  previousMouseY = mouseY;
		}
	  }
	  // if the user has released the mouse we want to set the previousMouse values
	  // back to -1.
	  // try and comment out these lines and see what happens!
	  else {
		previousMouseX = -1;
		previousMouseY = -1;
	  }
	};
  }
  
  // helper function to convert a hex code to an RGB array
  function hexToRgb(hex) {
	var r = parseInt(hex.substring(1, 3), 16);
	var g = parseInt(hex.substring(3, 5), 16);
	var b = parseInt(hex.substring(5, 7), 16);
	return { r: r, g: g, b: b };
  }
  
