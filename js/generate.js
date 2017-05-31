var border_seto = ["#3A8121", "#53D8F5", "#FFF45A", "#BE7D20", "#473DA5", "#B350CB", "#C862A9", "#EB4B24", "#FD992F"];
var border_intr = ["#C862A9", "#E2E807", "#473DA5", "#3A9F23", "#F1791F", "#E44320", "#3A9F23", "#53C8F5", "#4DAF3A"];
var fill_colors = ["#53D8F5", "#3A9F23", "#E4321B", "#C862A9", "#7DD88A", "#FFF837", "#F4791F", "#B350CB", "#504DB5"];

function generate(location, haveClass, type, number, numberLeft, numberTop, numberRight) {
	if (number == null) {number = 1;}
	if (numberLeft == null || numberTop == null || numberRight == null) {numberLeft = numberTop = numberRight = number;}
	if (type.toLowerCase() == "minos") {
		document.querySelector(location).innerHTML += '<svg width="86px" class="minos_' + haveClass + '" height="75.5px" viewBox="0 0 86 75.5"><g><polygon stroke-linejoin="round" stroke-width="4px" stroke="' + border_intr[number - 1] + '" stroke-width="5px" fill="' + fill_colors[number - 1] + '" points="23,3 63,3 83,37.6 63,72.2 23,72.2 3,37.6"/><text y="50" x="31" font-size="40px" font-family="sans-serif" fill="black">' + number + '</text></g></svg>';
	} else if (type.toLowerCase() == "seto") {
		document.querySelector(location).innerHTML += '<svg width="126px" class="seto_' + haveClass + '" height="110px" viewBox="0 0 126 110"><g><polygon stroke-linejoin="round" stroke-width="4px" stroke="' + border_seto[number - 1] + '" fill="white" points="23,3 103,3 123,37.6 83,106.8 43,106.8 3,37.6"/><text font-size="30px" font-family="sans-serif" fill="black" y="56" x="18" >' + numberLeft + '</text><text font-size="30px" font-family="sans-serif" fill="black" y="31" x="55">' + numberTop + '</text><text font-size="30px" font-family="sans-serif" fill="black" y="56" x="93">' + numberRight + '</text><path fill="' + fill_colors[number - 1] + '" d="M 24.5,71 q 34,-19.5 77,0 l -19,34 h -38.2 z"/><path fill="none" stroke-width="6px" stroke="' + border_intr[number - 1] + '" d="M 24.5,71 q 37,-21.5 77,0"/><text font-size="36px" font-family="sans-serif" fill="black" y="95" x="53">' + number + '</text></g></svg>';
	} else if (type.toLowerCase() == "setominos"){
		generate(location, haveClass, "minos", number);
		generate(location, haveClass + "_top", "seto", number, 9, 8, 2);
		generate(location, haveClass + "_topL", "seto", number, 7, 7, 9);
		generate(location, haveClass + "_topR", "seto", number, 2, 9, 1);
		generate(location, haveClass + "_btmR", "seto", number, 1, 1, 3);
		generate(location, haveClass + "_btm", "seto", number, 3, 2, 5);
		generate(location, haveClass + "_btmL", "seto", number, 5, 3, 7);
	}
}

// Intro Séto x1 & Minos x1
generate("#intro .piece-container:first-child .piece", "intro", "seto", 5, 9, 7, 7);
generate("#intro .piece-container:last-child .piece", "intro", "minos", 5);

// Babystep Séto x1 & Minos x1
generate("#babystep .piece", "babystep", "seto", 5, 9, 7, 7);
generate("#babystep .piece", "babystep", "minos", 5);

// Move Séto x2
generate("#move .piece", "move_top", "seto", 6, 7, 7, 9);
generate("#move .piece", "move_topR", "seto", 5, 9, 7, 7);
generate("#move .piece", "move resp", "minos", 5);
generate("#move .piece", "move_btmR resp", "seto", 5, 9, 7, 7);
generate("#move .piece", "move_top resp", "seto", 5, 9, 7, 7);

// Mecanic SétoMinos complet
generate("#mecanic .piece", "mecanic", "setominos", 6);
generate("#mecanic .piece", "mecanic_btm2 resp", "seto", 5);
generate("#mecanic .piece", "mecanic_btmL2 resp", "seto", 5);
generate("#mecanic .piece", "mecanic_topL2 resp", "seto", 5);
generate("#mecanic .piece", "mecanic_topL3 resp", "seto", 8);

// Strategy Séto x2
generate("#strategy .piece", "strategy1", "seto", 9, 9, 5, 8);
generate("#strategy .piece", "strategy2", "seto", 9, 5, 3, 7);

// Modal Minos x1
generate(".modal .piece", "modalMinos", "minos", 1);
