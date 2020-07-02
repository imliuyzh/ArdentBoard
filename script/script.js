/*
 * Change the color of the icon to the one in the panel
 * when the users move their mouse towards the icon.
 * @param event an event detailing the state of the webpage
 * when the users move their mouse towards the icon
 */
function changeColor(event)
{
	const COLOR = document.querySelector("#color-picker").value;
	event.srcElement.style.color = COLOR;
	event.srcElement.style.transition = "all 0.3s";
	event.srcElement.style.transform = "scale(1.1)";
}

/*
 * Change the color of the icons to black when the users move
 * their mouse away.
 * @param event an event detailing the state of the webpage
 * when the users move their mouse away from the icon
 */
function revertColor(event)
{
	event.srcElement.style.transform = "scale(1)";
	event.srcElement.style.color = "#000000";
	
	let icons = document.querySelectorAll(".las");
	icons.forEach((icon) => icon.style.color = "#000000")
}

/*
 * Change the size of the whiteboard as the users resizing the browser.
 */
function resizeWhiteboard()
{
	let whiteboard = document.querySelector("#whiteboard");
	whiteboard.width = 0.9 * window.innerWidth;
	whiteboard.height = 0.78 * window.innerHeight;
}

/*
 */
function draw(event)
{
	
}

/*
 */
function erase(event)
{
	
}

/*
 * Clear everything on the whiteboard.
 * @param event an event detailing the state of the webpage
 * when the users press the clear button
 */
function clearAll(event)
{
	let whiteboard = document.querySelector("#whiteboard"),
		ctx = whiteboard.getContext("2d");
	ctx.clearRect(0, 0, whiteboard.width, whiteboard.height);
}

/*
 * A "main" function for registering event listeners for all buttons
 * and initializing whatever the webpage needs.
 */
function main()
{
	let elements = document.querySelectorAll(".input-button, #reset");
	elements.forEach((element) => {
		element.addEventListener("mouseover", changeColor);
		element.addEventListener("mouseleave", revertColor);
	});
	resizeWhiteboard()
	window.addEventListener("resize", resizeWhiteboard);
	
	let pen = document.querySelector("#pen");
	pen.addEventListener("click", draw);
	
	let eraser = document.querySelector("#eraser");
	eraser.addEventListener("click", erase);
	
	let clearButton = document.querySelector("#reset");
	clearButton.addEventListener("click", clearAll);
}



// Make sure that the browser will execute main() when the webpage loads.
window.onload = main;