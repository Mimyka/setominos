var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var scrW =  document.documentElement.clientWidth || document.body.clientWidth;
var totalH = document.querySelector('body').clientHeight - scrH;
var topSetominos = ((totalH) * 0.546) + (scrH * ((0.65 * 55.5) / 100));
var leftSetominos = 39.5;

function styleList(object) {
	var domTarget = null;
	for (var prop in object) {
		if (prop === "target") {
			domTarget = object[prop];
		}else if (prop === "css") {
			if (typeof(domTarget) === "object") {
				for (cssTab of object[prop]) {
					domTarget.style[cssTab[0]] = cssTab[1];
				}
			}else{console.warn("Unvalid target.");}
		}else{console.warn("Unvalid argument.");}
	}
};

function curve(x, f, w, s, o) {
	if (o == null) {
		o = "+";
	}
	return (o == "+") ? ((Math.sin(x * f) * w) + s) : (-(Math.sin(x * f) * w) + s);
}

document.onscroll = function() {
	var posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
}



styleList({
	target: document.querySelectorAll('.seto_rosace')[0],
	css: [["position","absolute"],["top",(topSetominos+3) + "px"],["left",(scrW * (leftSetominos / 100) + (100+43)) + "px"],['transform', 'rotate(60deg) scale(1,1)']]
});
styleList({
	target: document.querySelectorAll('.minos_rosace')[0],
	css: [["position","absolute"],["top",(topSetominos + 65) + "px"],["left",(scrW * (leftSetominos / 100) + 85) + "px"],['transform', 'rotate(0deg) scale(1,1)']]
});
