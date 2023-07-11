function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";
  
	this.axis = "x";
	this.lineOfSymmetry = width / 2;
  
	var self = this;
  
	var previousMouseX = -1;
	var previousMouseY = -1;
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;
  
	var size = 10;
	var colorPicker = document.getElementById("colour");
	var color = colorPicker.value;

	this.onSelect = function() {
		// Hide the text-container, stamps-container, and mirror-container when freehand tool is selected
		document.getElementById("text-container").classList.add("hidden");
		document.getElementById("stamps-container").classList.add("hidden");
		document.getElementById("editable-container").classList.add("hidden");
	  };

	this.onDeselect = function() {
    // Show the text-container, stamps-container, and mirror-container when freehand tool is deselected
    document.getElementById("text-container").classList.remove("hidden");
    document.getElementById("stamps-container").classList.remove("hidden");
	document.getElementById("editable-container").classList.remove("hidden");
      };

  
	this.draw = function() {
	  if (mouseIsPressed) {
		if (previousMouseX == -1) {
		  previousMouseX = mouseX;
		  previousMouseY = mouseY;
		  previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
		  previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
		} else {
		  size = document.getElementById("myRange").value;
		  color = colorPicker.value;
		  stroke(color);
		  strokeWeight(size);
		  line(previousMouseX, previousMouseY, mouseX, mouseY);
  
		  var oX = this.calculateOpposite(mouseX, "x");
		  var oY = this.calculateOpposite(mouseY, "y");
		  line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
		  previousOppositeMouseX = oX;
		  previousOppositeMouseY = oY;
  
		  previousMouseX = mouseX;
		  previousMouseY = mouseY;
		}
	  } else {
		previousMouseX = -1;
		previousMouseY = -1;
		previousOppositeMouseX = -1;
		previousOppositeMouseY = -1;
	  }
	};
  
	this.calculateOpposite = function(n, a) {
	  if (a != this.axis) {
		return n;
	  }
  
	  if (n < this.lineOfSymmetry) {
		return this.lineOfSymmetry + (this.lineOfSymmetry - n);
	  } else {
		return this.lineOfSymmetry - (n - this.lineOfSymmetry);
	  }
	};
  
	this.unselectTool = function() {
	  select(".options").html("");
	};
  
	this.populateOptions = function() {
	  document.querySelector("#directionButton").addEventListener("click", function() {
		if (self.axis == "x") {
		  self.axis = "y";
		  self.lineOfSymmetry = height / 2;
		  this.textContent = 'Make Vertical';
		} else {
		  self.axis = "x";
		  self.lineOfSymmetry = width / 2;
		  this.textContent = 'Make Horizontal';
		}
	  });
  
	  // Add event listener to color picker input
	  colorPicker.addEventListener("input", function() {
		color = colorPicker.value;
	  });
	};
  }
  