/*
 * A class for all the operations used in this web application
 * 
 * @note I was going to put it in a separate JS module; however,
 * Chromium-based browsers will not run because their cross-domain
 * policies do not allow JS modules to be referenced as local files
 * unless they are run as a web server
 */
class Utilities
{
	// A variable to decide whether the browser should draw shapes
	// on the whiteboard
	static drawing = false;
	
	/*
	 * Change the cursor of the whiteboard to "crosshair" or "cell" depending
	 * which button is clicked
	 * @param event an event detailing the state of the webpage
	 * when the users click the pen/eraser icon
	 */
	static changeInputState(event)
	{
		document.querySelector("#whiteboard").style.cursor =
			(event.srcElement.id === "pen-icon" || event.srcElement.id === "pen")
				? "crosshair" : "cell";
	}
	
	/*
	 * Change the color of the icon to the one in the panel
	 * when the users move their mouse towards the icon
	 * @param event an event detailing the state of the webpage
	 * when the users move their mouse towards the icon
	 */
	static changeColor(event)
	{
		const COLOR = document.querySelector("#color-picker").value;
		event.srcElement.style.color = COLOR;
		event.srcElement.style.transition = "all 0.3s";
		event.srcElement.style.transform = "scale(1.1)";
	}
	
	/*
	 * Change the color of the icons to black when the users move
	 * their mouse away
	 * @param event an event detailing the state of the webpage
	 * when the users move their mouse away from the icon
	 */
	static revertColor(event)
	{
		event.srcElement.style.transform = "scale(1)";
		event.srcElement.style.color = "#000000";
		
		let icons = document.querySelectorAll(".las");
		icons.forEach((icon) => icon.style.color = "#000000")
	}
	
	/*
	 * Change the size of the whiteboard as the users resizing the browser
	 */
	static resizeWhiteboard()
	{
		let whiteboard = document.querySelector("#whiteboard"),
			context = whiteboard.getContext("2d"),
			data = context.getImageData(0, 0, whiteboard.width, whiteboard.height);
		whiteboard.width = 0.8 * window.innerWidth;
		whiteboard.height = 0.8 * window.innerHeight;
		context.putImageData(data, 0, 0);
	}
	
	/*
	 * Refer to the appropriate action when the users click on the whiteboard
	 * @param event an event detailing the state of the webpage
	 * when the users click on the whiteboard
	 */
	static drawOrErase(event)
	{
		Utilities.drawing = (event.type === "mousedown") ? true
			: (event.type === "mouseup") ? false : Utilities.drawing;
		let color = (document.querySelector("#whiteboard").style.cursor === "crosshair")
			? document.querySelector("#color-picker").value : "white";
		
		let whiteboard = document.querySelector("#whiteboard"),
			whiteboardInfo = whiteboard.getBoundingClientRect(),
			context = whiteboard.getContext("2d");
			
		if (event.type !== "mouseup" && Utilities.drawing === true)
		{
			context.lineWidth = document.querySelector("#thickness").value;
			context.strokeStyle = color;
			context.lineTo(event.x-whiteboardInfo.left, event.y-whiteboardInfo.top);
			context.stroke();
		}
		else
		{
			context.beginPath();
		}
	}
	
	/*
	 * Clear everything on the whiteboard
	 * @param event an event detailing the state of the webpage
	 * when the users press the clear button
	 */
	static clearAll(event)
	{
		let whiteboard = document.querySelector("#whiteboard"),
			ctx = whiteboard.getContext("2d");
		ctx.clearRect(0, 0, whiteboard.width, whiteboard.height);
	}
}

/*
 * A function for registering event listeners for all buttons
 * and initializing whatever the webpage needs.
 */
function main()
{
	// Change the color of the icon to the one in the color panel when 
	// users move to it
	let elements = document.querySelectorAll(".input-button, #reset");
	elements.forEach((element) => {
		element.addEventListener("mouseover", Utilities.changeColor);
		element.addEventListener("mouseleave", Utilities.revertColor);
	});

	// Change the type of input when users click the pen/eraser button
	document.querySelectorAll("#pen, #eraser")
			.forEach((inputButton) => 
				inputButton.addEventListener("click", Utilities.changeInputState))
	
	// Erase everything on the whiteboard when users click on the clear button
	let clearButton = document.querySelector("#reset");
	clearButton.addEventListener("click", Utilities.clearAll);
	
	// React to the users when they click on the whiteboard
	let whiteboard = document.querySelector("#whiteboard");
	whiteboard.addEventListener("mouseup", Utilities.drawOrErase);
	whiteboard.addEventListener("mousedown", Utilities.drawOrErase);
	whiteboard.addEventListener("mousemove", Utilities.drawOrErase);
	
	// Change the cursor style on the whiteboard
	whiteboard.style.cursor = "crosshair";
	
	// Resize the whiteboard as the browser window changes
	window.addEventListener("resize", Utilities.resizeWhiteboard);
	Utilities.resizeWhiteboard();
}



// Make sure that the browser will execute main() when the webpage loads.
window.onload = main;