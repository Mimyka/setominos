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

// function curve(x, freq, width) {
// 	return Math.sin(x * freq) * width);
// }

function animate(x){
	var posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
	console.log(x);
	if (window.matchMedia("(min-width: 750px)").matches) {
		styleList({
			target: document.querySelector('#mecanic .piece'),
			css: [['transform', 'translate(-75px, 40px) rotate(0deg)']]
		});
		styleList({
			target: document.querySelector('.seto_strategy.topL'),
			css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px']]
		});
		styleList({
			target: document.querySelector('.seto_move.btmL'),
			css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 48+'px']]
		});
	} else {
		if (x <= 52.5) {
			styleList({
				target: document.querySelector('.seto_move.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg) rotateX('+(52.5-x)*5+'deg)'],['left', 258-(x*4)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_move.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 48+'px']]
			});
		}
		styleList({
			target: document.querySelector('#mecanic .piece'),
			css: [['transform', 'rotate('+(x-50)*5+'deg)']]
		});
		if (x <= 81) {
			styleList({
				target: document.querySelector('.seto_strategy.topL'),
				css: [['transform', 'translate(-50%, -50%) rotate(-'+x*5.2+'deg)'],['left', (Math.cos(x * 0.3029) * 80)-120+'px']]
			});
		} else{
			styleList({
				target: document.querySelector('.seto_strategy.topL'),
				css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px'],['top', -27+'px']]
			});
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
