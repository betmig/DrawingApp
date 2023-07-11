function stampTool() {
  this.name = "stampTool";
  this.icon = "stampTool.jpg";
  this.optionsLoaded = false;
  this.emoji = "❤️";
  this.size = 36;

  this.onSelect = function() {
		// Hide the text-container, stamps-container, and mirror-container when freehand tool is selected
		document.getElementById("text-container").classList.add("hidden");
		document.getElementById("mirror-container").classList.add("hidden");
    document.getElementById("editable-container").classList.add("hidden");
	  };

	this.onDeselect = function() {
    // Show the text-container, stamps-container, and mirror-container when freehand tool is deselected
    document.getElementById("text-container").classList.remove("hidden");
    document.getElementById("mirror-container").classList.remove("hidden");
    document.getElementById("editable-container").classList.remove("hidden");
      };


  this.draw = function () {
    if (mouseIsPressed) {
      push();
      textAlign(CENTER, CENTER);
      textSize(this.size); // set the text size to the current size
      text(this.emoji, mouseX, mouseY);
      pop();
    }
  };

  this.populateOptions = function () {
    if (!this.optionsLoaded) {
      optionsDiv = select(".options");
      stampOptions = select("#stamp-options");

      emojiSelect = select("#emoji-select");
      emojiSelect.changed(() => {
        this.emoji = emojiSelect.value();
      });

      sizeSlider = select("#myRange");
      sizeSlider.input(() => {
        this.size = sizeSlider.value();
        textSize(this.size); // set the text size to the current size
      });

      textSize(this.size);
      this.optionsLoaded = true;
    }
  }; 
}
