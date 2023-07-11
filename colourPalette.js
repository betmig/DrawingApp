// Displays and handles the colour palette.
function ColourPalette() {
    //Global variables to pass selected color and size value to other methods
	var selectedColour;
    var selectedSize;
    // a list of web colour strings
    this.colours = [
        "black", "silver", "gray", "white", "maroon", "red", "purple",
        "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
        "blue", "teal", "aqua"
    ];
    // make the start colour be black
    this.selectedColour = "black";

    var self = this;
    var colourPicker = document.getElementById("colour");
    var hexInput = document.getElementById("hex");

    var colourClick = function () {
        // remove the old border
        var current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");

        // get the new colour from the id of the clicked element
        var c = this.id().split("Swatch")[0];

        // set the selected colour and fill and stroke
        self.selectedColour = c;
        drawingContext.fillStyle = c;
        drawingContext.strokeStyle = c;

        // add a new border to the selected colour
        this.style("border", "2px solid blue");

        // update color picker and hex input
        var hexColor = colorToHex(c);
        colourPicker.value = rgbToHex(hexColor);
        hexInput.value = rgbToHex(hexColor);
    }

    // helper function to convert color names to hex
    function colorToHex(color) {
        var tempElement = document.createElement("div");
        tempElement.style.backgroundColor = color;
        return getComputedStyle(tempElement).backgroundColor;
    }

    // helper function to convert RGB to HEX
    function rgbToHex(rgb) {
        var result = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d*(?:\.\d+)?))?\s*\)$/.exec(rgb);
        if (!result) return rgb;
        return "#" + (1 << 24 | (parseInt(result[1]) & 255) << 16 | (parseInt(result[2]) & 255) << 8 | (parseInt(result[3]) & 255)).toString(16).slice(1);
    }

    // update color on color picker change
    colourPicker.addEventListener("input", function () {
        drawingContext.fillStyle = this.value;
        drawingContext.strokeStyle = this.value;
        hexInput.value = this.value;

        // remove border from the previously selected swatch
        var current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");
    });

    // update color on hex input change
    hexInput.addEventListener("input", function () {
        var hexValue = this.value;
        drawingContext.fillStyle = hexValue;
        drawingContext.strokeStyle = hexValue;
        colourPicker.value = hexValue;

        // remove border from the previously selected swatch
        var current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");
    });

    // load in the colours
    this.loadColours = function () {
        // set the fill and stroke properties to be black at the start of the programme
        // running
        drawingContext.fillStyle = this.colours[0];
		drawingContext.fillStyle = this.colours[0];
        drawingContext.strokeStyle = this.colours[0];

        // for each colour create a new div in the html for the colourSwatches
        for (var i = 0; i < this.colours.length; i++) {
            var colourID = this.colours[i] + "Swatch";

            // using p5.js add the swatch to the palette and set its background colour
            // to be the colour value.
            var colourSwatch = createDiv();
            colourSwatch.class('colourSwatches round');
            colourSwatch.id(colourID);

            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", this.colours[i]);
            colourSwatch.mouseClicked(colourClick);
        }

        select(".colourSwatches").style("border", "2px solid blue");
    };

    // controls size of stroke
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
        size = this.value;
    }

    // call the loadColours function now it is declared
    this.loadColours();
	
}

