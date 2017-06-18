var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var scrW =  document.documentElement.clientWidth || document.body.clientWidth;
var totalH = document.querySelector('html').scrollHeight - scrH;
var posScroll;

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

function linkObject(obj) {
	var _ = this;
	_.target = obj.target;
	_.from = obj.from;
	_.to = obj.to;
	_.start = obj.animation.start || {'x':0,'y':0};
	_.end = obj.animation.end || {'x':0,'y':0};
	_.onstart = obj.animation.onstart || function(){};
	_.onprogress = obj.animation.onprogress || function(){};
	_.onend = obj.animation.onend || function(){};

	// optimise a/b declaration to prepare simple scroll object
	_.a = {x: (Number(obj.from.offsetLeft) + _.start.x), y: (Number(obj.from.offsetTop) + _.start.y)};
	_.b = {x: (Number(obj.to.offsetLeft) + _.end.x), y: (Number(obj.to.offsetTop) + _.end.y)};
	_.ab = {
		x: _.b.x - _.a.x,
		y: _.b.y - _.a.y
	};
	_.translate = obj.translate || "-50%, -50%";
	transformValue("rotate", obj.animation.rotate);
	_.begin = obj.animation.begin || 0;

	function transformValue(trgt, eql) {
		_[trgt] = eql || {"start":0,"end":0};
		_[trgt] = (typeof(_[trgt]) == "number")? {"start":_[trgt],"end":_[trgt]} : _[trgt];
	}

	_.animate = function(y) {
		var executed = false;
		y += _.begin;
		if (y < _.a.y) {
			_.progress = 0;
			if(!executed){
				_.onstart()
				_.mv();
			}
			executed = true;
		}else if (y >= _.a.y && y <= _.b.y) {
			_.onprogress();
			_.progress = (y-_.a.y)/_.ab.y;
			_.mv();
			executed = false;
		}else {
			_.progress = 1;
			if(!executed){
				_.onend()
				_.mv();
			}
			executed = true;
		}
	}
	_.mv = function() {
		_.target.style.left = ((_.ab.x*_.progress)+(_.start.x))+'px';
		_.target.style.top = ((_.ab.y*_.progress)+(_.start.y))+'px';
		_.target.style.transform = "translate("+_.translate+") rotate(" + ((_.rotate.start*(1-_.progress)) + (_.rotate.end*_.progress)) + "deg)";
	}

}

var toAnimate = [
	new linkObject({
		target: document.querySelector('.minos_babystep'),
		from: document.querySelector('#babystep .piece'),
		to: document.querySelector('#move .piece'),
		animation: {
			begin: 300,
			start: {"x":39,"y":31},
			end: {"x":-123,"y":85},
			rotate: {
				start: 10,
				end: 0
			}
		}
	}),
	new linkObject({
		target: document.querySelector('.minos_move'),
		from: document.querySelector('#move .piece'),
		to: document.querySelector('#mecanic .piece'),
		animation: {
			begin: 250,
			onstart: function() {
				document.querySelector('.minos_move').style.display = "none";
				document.querySelector('.minos_babystep').style.display = "";
			},
			onprogress: function() {
				document.querySelector('.minos_move').style.display = "";
				document.querySelector('.minos_babystep').style.display = "none";
			},
			onend: function() {
				document.querySelector('.minos_move').style.display = "";
			},
			start: {"x":-123,"y":85},
			end: {"x":249,"y":-144}
		}
	}),
	new linkObject({
		target: document.querySelector('.seto_mecanic3.topL'),
		from: document.querySelector('#mecanic .piece'),
		to: document.querySelector('#strategy .piece'),
		animation: {
			begin: 200,
			start: {"x":171,"y":99},
			end: {"x":-46,"y":-27},
			rotate: -60
		}
	})
];

function animate(x){
	posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
	if (window.matchMedia("(min-width: 750px)").matches) {
		styleList({
			target: document.querySelector('.seto_strategy.topL'),
			css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px']]
		});
		styleList({
			target: document.querySelector('.seto_move.btmL'),
			css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 48+'px']]
		});

		if (x <= 22.5) {
			styleList({
				target: document.querySelector('.seto_babystep'),
				css: [['transform', 'translate(-50%, -50%) rotate('+(120-(x*6))+'deg)'],['left', -680+(x*27)+'px'],['top', -600+(x*24)+'px']]
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

		if (x >= 75) {
			styleList({
				target: document.querySelector('.seto_strategy2.btmR'),
				css: [['transform', 'translate(-50%, -50%) rotate(120deg)'],['left', -1200+(x*20)+'px'],['top', -730+(x*12)+'px']]
			});
		}else{
			styleList({
				target: document.querySelector('.seto_strategy2.btmR'),
				css: [['transform', 'translate(-50%, -50%) rotate(120deg)'],['left', 295+'px'],['top', 171+'px']]
			});
		}

		for (var i = 0; i < toAnimate.length; i++) {
			toAnimate[i].animate(posScroll);
		}

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
