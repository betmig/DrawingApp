//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

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
  

	//draws the line to the screen 
	this.draw = function(){

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				stroke(color[0], color[1], color[2]);
				strokeWeight(size);
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
