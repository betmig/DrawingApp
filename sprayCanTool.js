function SprayCanTool() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    var points = 13;
    var spread = 10;
    var size = 10;

    // get the slider and add an event listener
    var slider = document.getElementById("myRange");
    slider.addEventListener("input", function() {
        size = this.value;
        document.getElementById("demo").innerHTML = this.value;
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
        // Get the size and color from the ColourPalette instance
        var size = document.getElementById("myRange").value;
        var currentColor = drawingContext.strokeStyle;

        var r = random(5, 10);
        if (mouseIsPressed) {
            for (var i = 0; i < points; i++) {
                stroke(currentColor);
                strokeWeight(size);
                point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread));
            }
        }
    };
}
