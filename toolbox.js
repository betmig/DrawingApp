function Toolbox() {
	var self = this;
	this.tools = [];
	this.selectedTool = null;
  
	var toolbarItemClick = function() {
	  // Remove any existing borders
	  var items = selectAll(".sideBarItem");
	  for (var i = 0; i < items.length; i++) {
		items[i].style('border', '0')
	  }
  
	  var toolName = this.id().split("sideBarItem")[0];
	  self.selectTool(toolName);
  
	  // Call loadPixels to make sure most recent changes are saved to pixel array
	  loadPixels();
	}
  
	// Add a new tool icon to the html page
	var addToolIcon = function(icon, name) {
	  var sideBarItem = createDiv("<img src='" + icon + "'></div>");
	  sideBarItem.class('sideBarItem')
	  sideBarItem.id(name + "sideBarItem")
	  sideBarItem.parent('sidebar');
	  sideBarItem.mouseClicked(toolbarItemClick);
	};
  
	// Add a tool to the tools array
	this.addTool = function(tool) {
	  // Check that the object tool has an icon and a name
	  if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
		alert("make sure your tool has both a name and an icon");
	  }
	  this.tools.push(tool);
	  addToolIcon(tool.icon, tool.name);
	  // If no tool is selected (i.e. none have been added so far)
	  // make this tool the selected one.
	  if (this.selectedTool == null) {
		this.selectTool(tool.name);
	  }
	};
  
	this.selectTool = function(toolName) {
	  // Search through the tools for one that's name matches toolName
	  for (var i = 0; i < this.tools.length; i++) {
		if (this.tools[i].name == toolName) {
		  // If the tool has an onDeselect method, run it.
		  if (this.selectedTool != null && typeof this.selectedTool.onDeselect === "function") {
			this.selectedTool.onDeselect();
		  }
  
		  // Select the tool and highlight it on the toolbar
		  this.selectedTool = this.tools[i];
		  select("#" + toolName + "sideBarItem").style("border", "2px solid blue");
  
		  // If the tool has an onSelect method, run it.
		  if (typeof this.selectedTool.onSelect === "function") {
			this.selectedTool.onSelect();
		  }
  
		  // If the tool has an options area, populate it now.
		  if (typeof this.selectedTool.populateOptions === "function") {
			if (!this.selectedTool.optionsLoaded) {
			  this.selectedTool.populateOptions();
			  this.selectedTool.optionsLoaded = true;
			}
		  }
		} else {
		  if (this.tools[i].hasOwnProperty("optionsLoaded")) {
			this.tools[i].optionsLoaded = false;
		  }
		}
	  }
	};
  }
  