var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var scrW =  document.documentElement.clientWidth || document.body.clientWidth;
var totalH = document.querySelector('html').scrollHeight - scrH;
var posScroll;
var ctx = {
	a: getCoordOf(document.querySelector('#babystep .piece')),
	b: getCoordOf(document.querySelector('#move .piece')),
	c: getCoordOf(document.querySelector('#mecanic .piece')),
	d: getCoordOf(document.querySelector('#strategy .piece'))
};

ctx.ab = {
	x: ctx.b.x - ctx.a.x,
	y: ctx.b.y - ctx.a.y
};

ctx.bc = {
	x: ctx.c.x - ctx.b.x,
	y: ctx.c.y - ctx.b.y
};

ctx.cd = {
	x: ctx.d.x - ctx.c.x,
	y: ctx.d.y - ctx.c.y
};

function getCoordOf(target) {
	return {x: Number(target.offsetLeft), y: Number(target.offsetTop)}
}

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

function link(obj) {
	obj.top = obj.top || 0;
	obj.left = obj.left || 0;
	obj.target.alternate = obj.target.alternate || 0;
	obj.transform = (obj.transform)?['transform', obj.transform] : [];
	obj.where = obj.where || 0;
	if (posScroll+obj.where >= obj.from.y && posScroll+obj.where <= obj.to.y ) {
		obj.target.alternate = (((posScroll+obj.where-obj.from.y)/obj.distance.y));
		styleList({
			target: obj.target,
			css: [['left', (obj.distance.x)*obj.target.alternate+(obj.left)+'px'],['top', (obj.distance.y)*obj.target.alternate+(obj.top)+'px'], obj.transform]
		});
	}else if (posScroll+obj.where < obj.from.y) {
		styleList({
			target: obj.target,
			css: [['left', (obj.left)+'px'],['top', (obj.top)+'px'], obj.transform]
		});
			obj.target.alternate = 0;
	}else{
		styleList({
			target: obj.target,
			css: [['left', (obj.distance.x)+(obj.left)+'px'],['top', (obj.distance.y)+(obj.top)+'px'], obj.transform]
		});
	}
}

function animate(x){
	posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
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

		if (x <= 24.5) {
			styleList({
				target: document.querySelector('.seto_babystep'),
				css: [['transform', 'translate(-50%, -50%) rotate(-50deg)'],['left', -680+(x*26)+'px'],['top', -600+(x*23)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_babystep'),
				css: [['transform', 'translate(-50%, -50%) rotate(-50deg)'],['left', -30+'px'],['top', -27+'px']]
			});
		}

		if (x <= 42.5) {
			styleList({
				target: document.querySelector('.seto_move.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 2000-(x*46.25)+'px'],['top', -1070+(x*25)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_move.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 48+'px'],['top', -14+'px']]
			});
		}

		if (x <= 58) {
			styleList({
				target: document.querySelector('.seto_mecanic.topL'),
				css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -1600+(x*26.4)+'px'],['top', -840+(x*13.7)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_mecanic.topL'),
				css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -78+'px'],['top', -45+'px']]
			});
		}

		if (x >= 60) {
			styleList({
				target: document.querySelector('.seto_mecanic.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 1600-(x*28)+'px'],['top', -840+(x*14.7)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_mecanic.btmL'),
				css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', -78+'px'],['top', 45+'px']]
			});
		}

		link({
			target: document.querySelector('.minos_babystep'),
			from: ctx.a,
			to: ctx.b,
			distance: ctx.ab,
			top: 31 + document.querySelector('.minos_babystep').alternate*(-5),
			left: 39 + document.querySelector('.minos_babystep').alternate*(-107),
			transform: 'translate(-50%, -50%) rotate('+(10-(10*document.querySelector('.minos_babystep').alternate))+'deg)',
			where: 300
		});

		link({
			target: document.querySelector('.minos_move'),
			from: ctx.b,
			to: ctx.c,
			distance: ctx.bc,
			top: 85 + document.querySelector('.minos_move').alternate*(-130),
			left: -123 + document.querySelector('.minos_move').alternate*(245),
			transform: 'translate(-50%, -50%)',
			where: 300
		});

		link({
			target: document.querySelector('.seto_mecanic3.topL'),
			from: ctx.c,
			to: ctx.d,
			distance: ctx.cd,
			top: 99 + document.querySelector('.seto_mecanic3.topL').alternate*(-167),
			left: 171 + document.querySelector('.seto_mecanic3.topL').alternate*(-144),
			transform: 'translate(-50%, -50%) rotate(-60deg)',
			where: 200
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
