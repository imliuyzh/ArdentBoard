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
}



// Make sure that the browser will execute main() when the webpage loads.
window.onload = main;