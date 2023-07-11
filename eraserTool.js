function eraserTool() {
  //set an icon and a name for the object
  this.name = "eraserTool";
  this.icon = "eraserTool.jpg";

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
    //get the value of the size slider and convert it to a number
    var size = Number(document.getElementById("myRange").value);

    if (mouseIsPressed) {
      // Set the stroke color to white and the stroke weight to the size
      stroke(255);
      strokeWeight(size);

      // Draw a line between the previous and current mouse positions
      if (mouseX !== pmouseX || mouseY !== pmouseY) {
        line(mouseX, mouseY, pmouseX, pmouseY);
      }
    }
  };
}
