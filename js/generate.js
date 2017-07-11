var border_seto = ["#3A8121", "#53D8F5", "#FFF45A", "#BE7D20", "#473DA5", "#B350CB", "#C862A9", "#EB4B24", "#FD992F"];
var border_intr = ["#C862A9", "#E2E807", "#473DA5", "#3A9F23", "#F1791F", "#E44320", "#3A9F23", "#53C8F5", "#4DAF3A"];
var fill_colors = ["#53D8F5", "#3A9F23", "#E4321B", "#C862A9", "#7DD88A", "#FFF837", "#F4791F", "#B350CB", "#504DB5"];

function generate(location, haveClass, type, number, numberLeft, numberTop, numberRight) {
	if (number == null) {number = 1;}
	if (numberLeft == null || numberTop == null || numberRight == null) {numberLeft = numberTop = numberRight = number;}
	if (type.toLowerCase() == "minos") {
		document.querySelector(location).innerHTML += '<svg width="86px" class="minos_' + haveClass + '" height="75.5px" viewBox="0 0 86 75.5"><g><polygon stroke-linejoin="round" stroke-width="4px" stroke="' + border_intr[number - 1] + '" stroke-width="5px" fill="' + fill_colors[number - 1] + '" points="23,3 63,3 83,37.6 63,72.2 23,72.2 3,37.6"/><text y="50" x="31" font-size="40px" font-family="sans-serif" fill="#000">' + number + '</text></g></svg>';
	} else if (type.toLowerCase() == "seto") {
		document.querySelector(location).innerHTML += '<svg width="126px" class="seto_' + haveClass + '" height="110px" viewBox="0 0 126 110"><g><polygon stroke-linejoin="round" stroke-width="4px" stroke="' + border_seto[number - 1] + '" fill="url(#pattern)" points="23,3 103,3 123,37.6 83,106.8 43,106.8 3,37.6"/><text font-size="30px" font-family="sans-serif" fill="#000" y="56" x="18" >' + numberLeft + '</text><text font-size="30px" font-family="sans-serif" fill="#000" y="31" x="55">' + numberTop + '</text><text font-size="30px" font-family="sans-serif" fill="#000" y="56" x="93">' + numberRight + '</text><path fill="' + fill_colors[number - 1] + '" d="M 24.5,71 q 34,-19.5 77,0 l -19,34 h -38.2 z"/><path fill="none" stroke-width="6px" stroke="' + border_intr[number - 1] + '" d="M 24.5,71 q 37,-21.5 77,0"/><text font-size="36px" font-family="sans-serif" fill="#000" y="95" x="53">' + number + '</text></g></svg>';
	} else if (type.toLowerCase() == "setominos"){
		generate(location, haveClass, "minos", number);
		generate(location, haveClass + " topR", "seto", number, 7, 8, 2);
		generate(location, haveClass + " btmR", "seto", number, 2, 9, 3);
		generate(location, haveClass + " btm", "seto", number, 3, 4, 5);
		generate(location, haveClass + " btmL", "seto", number, 5, 5, 7);
		generate(location, haveClass + " topL", "seto", number, 7, 6, 9);
		generate(location, haveClass + " top", "seto", number, 9, 7, 7);
	}
}

var rndTable = [2,3,4,5];

var rand0 = rndTable[Math.floor(Math.random()*rndTable.length)];
var rand1 = rndTable[Math.floor(Math.random()*rndTable.length)];
while(rand1 == rand0){
	rand1 = rndTable[Math.floor(Math.random()*rndTable.length)];
}
document.querySelector('#intro .piece-container:first-child .piece-name').style.color = fill_colors[rand0-1];
document.querySelector('#intro .piece-container:last-child .piece-name').style.color = fill_colors[rand1-1];

// Intro Séto x1 & Minos x1
generate("#intro .piece-container:first-child .piece", "intro", "seto", rand0, 9, 7, 7);
generate("#intro .piece-container:last-child .piece", "intro", "minos", rand1);

// Babystep
generate("#babystep .piece", "babystep", "seto", 5, 5, 5, 7);
generate("#babystep .piece", "babystep", "minos", 5);

// Move
generate("#move .piece", "move btmL resp2", "seto", 9, 8, 6, 1);
generate("#move .piece", "move topR resp2", "seto", 5, 7, 6, 9);
// resp
generate("#move .piece", "move resp", "minos", 5);
generate("#move .piece", "move btmR resp", "seto", 9, 9, 5, 8);
generate("#move .piece", "move btmL resp", "seto", 5, 3, 4, 5);
generate("#move .piece", "move top resp", "seto", 5, 7, 6, 9);
generate("#move .piece", "move topL resp", "seto", 5, 5, 5, 7);
generate("#move .piece", "move2 topR resp", "seto", 5, 9, 7, 7);

// Mecanic
generate("#mecanic .piece", "mecanic", "setominos", 5);
// resp
generate("#mecanic .piece", "mecanic2 top resp", "seto", 9, 7, 4, 9);
generate("#mecanic .piece", "mecanic2 topR resp", "seto", 9, 9, 5, 8);
generate("#mecanic .piece", "mecanic2 btmR resp", "seto", 9, 8, 6, 1);
generate("#mecanic .piece", "mecanic3 btmR resp", "seto", 6, 9, 6, 8);

// Strategy
generate("#strategy .piece", "strategy topL resp2", "seto", 8, 6, 1, 5);
generate("#strategy .piece", "strategy btmR resp2", "seto", 8, 1, 2, 6);
// resp
generate("#strategy .piece", "strategy resp", "setominos", 5);

generate("#strategy .piece", "strategy2 resp", "minos", 9);
generate("#strategy .piece", "strategy2 top resp", "seto", 9, 7, 4, 9);
generate("#strategy .piece", "strategy2 topR resp", "seto", 9, 9, 5, 8);
generate("#strategy .piece", "strategy2 btmR resp", "seto", 9, 8, 6, 1);
generate("#strategy .piece", "strategy3 btmR resp", "seto", 6, 9, 6, 8);
generate("#strategy .piece", "strategy3 topL resp", "seto", 6, 9, 8, 2);
generate("#strategy .piece", "strategy4 top resp", "seto", 7, 9, 4, 8);
generate("#strategy .piece", "strategy5 btmL resp", "seto", 4, 9, 8, 8);
