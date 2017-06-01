var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var scrW =  document.documentElement.clientWidth || document.body.clientWidth;
var totalH = document.querySelector('html').scrollHeight - scrH;

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

function animate(x){
	var posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
	// console.log(x);
	if (window.matchMedia("(min-width: 750px)").matches) {
		styleList({
			target: document.querySelector('#mecanic .piece'),
			css: [['transform', 'translate(-75px, 40px) rotate(0deg)']]
		});
		// styleList({
		// 	target: document.querySelector('.seto_strategy.topL'),
		// 	css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px']]
		// });
	} else {
		if (x >50) {
			styleList({
				target: document.querySelector('#mecanic .piece'),
				css: [['transform', 'rotate('+(x-50)*5+'deg)']]
			});
			// styleList({
			// 	target: document.querySelector('.seto_strategy.topL'),
			// 	css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px']]
			// });
		}
	}
}

document.onscroll = animate;

window.onresize = function() {
	scrH =  document.documentElement.clientHeight || document.body.clientHeight;
	scrW =  document.documentElement.clientWidth || document.body.clientWidth;
	totalH = document.querySelector('html').scrollHeight - scrH;
	animate();
}
