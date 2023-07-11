function editableShapeTool() {
	this.name = "editableShapeTool";
	this.icon = "assets/editableShapeTool.jpg";
  
	this.shape = "rectangle";
	this.isDrawing = false;
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.strokeWeight = 3;
	let previewColor = "#888";
  
	document.getElementById("colour").addEventListener("input", function () {
	  colourP.selectedColour = this.value;
	});
  
	this.onSelect = function() {
		// Hide the text-container, stamps-container, and mirror-container when freehand tool is selected
		document.getElementById("text-container").classList.add("hidden");
		document.getElementById("stamps-container").classList.add("hidden");
		document.getElementById("mirror-container").classList.add("hidden");
	
		// Call populateOptions
		this.setShapeListener();
	  };
  
	this.onDeselect = function () {
	  document.getElementById("text-container").classList.remove("hidden");
	  document.getElementById("stamps-container").classList.remove("hidden");
	  document.getElementById("mirror-container").classList.remove("hidden");
	};
  
	this.draw = function () {
	  if (mouseIsPressed) {
		if (!this.isDrawing) {
		  this.isDrawing = true;
		  this.startX = mouseX;
		  this.startY = mouseY;
		} else {
		  this.endX = mouseX;
		  this.endY = mouseY;
		}
	  } else {
		if (this.isDrawing) {
		  this.isDrawing = false;
  
		  push();
		  stroke(colourP.selectedColour);
		  strokeWeight(this.strokeWeight);
		  fill(colourP.selectedColour);
		  let startX = Math.min(this.startX, this.endX);
		  let startY = Math.min(this.startY, this.endY);
		  let shapeWidth = Math.abs(this.startX - this.endX);
		  let shapeHeight = Math.abs(this.startY - this.endY);
  
		  if (this.shape === "rectangle") {
			rect(startX, startY, shapeWidth, shapeHeight);
		  } else if (this.shape === "ellipse") {
			ellipseMode(CORNER);
			ellipse(startX, startY, shapeWidth, shapeHeight);
		  } else if (this.shape === "square") {
			let sideLength = Math.max(shapeWidth, shapeHeight);
			rect(startX, startY, sideLength, sideLength);
		  } else if (this.shape === "triangle") {
			triangle(
			  this.startX,
			  this.startY,
			  this.startX + shapeWidth,
			  this.startY,
			  this.startX + shapeWidth / 2,
			  this.startY + shapeHeight
			);
		  }
  
		  pop();
		}
	  }
	};
  
	this.drawPreview = function () {
	  if (this.isDrawing) {
		tempCanvas.clear();
		tempCanvas.fill(previewColor);
		tempCanvas.noStroke();
  
		let startX = Math.min(this.startX, this.endX);
		let startY = Math.min(this.startY, this.endY);
		let shapeWidth = Math.abs(this.startX - this.endX);
		let shapeHeight = Math.abs(this.startY - this.endY);
  
		if (this.shape === "rectangle") {
		  tempCanvas.rect(startX, startY, shapeWidth, shapeHeight);
		} else if (this.shape === "ellipse") {
		  tempCanvas.ellipseMode(CORNER);
		  tempCanvas.ellipse(startX, startY, shapeWidth, shapeHeight);
		} else if (this.shape === "square") {
		  let sideLength = Math.max(shapeWidth, shapeHeight);
		  tempCanvas.rect(startX, startY, sideLength, sideLength);
		} else if (this.shape === "triangle")
        tempCanvas.triangle(
          this.startX,
          this.startY,
          this.startX + shapeWidth,
          this.startY,
          this.startX + shapeWidth / 2,
          this.startY + shapeHeight
        );
      }
    }
	this.setShapeListener = function() {
		// Get the shape select dropdown from the HTML
		let shapeSelect = document.getElementById("editable-select");
		shapeSelect.addEventListener("change", () => {
		  this.shape = shapeSelect.value.toLowerCase();
		});
	  };
  }
  