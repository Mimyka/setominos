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

function scrollObject(obj) {
	var _ = this;
	_.target = obj.target;
	_.from = obj.from || obj.target.parentNode;
	_.to = obj.to || obj.target.parentNode;
	_.start = obj.animation.start || {'x':0,'y':0};
	_.end = obj.animation.end || {'x':0,'y':0};
	_.start.unit = (obj.animation.start.unit && obj.animation.start.unit == "%")?"%":"px";
	_.end.unit = (obj.animation.end.unit && obj.animation.end.unit == "%")?"%":"px";
	if (_.start.unit == "%") {
		_.start = {x: (obj.animation.start.x/100)*Number(_.from.offsetLeft), y: (obj.animation.start.y/100)*Number(_.from.offsetLeft)};
	}
	if (_.end.unit == "%") {
		_.end = {x: (obj.animation.end.x/100)*Number(_.to.offsetLeft), y: (obj.animation.end.y/100)*Number(_.to.offsetLeft)};
	}
	_.onstart = obj.animation.onstart || function(){};
	_.onprogress = obj.animation.onprogress || function(){};
	_.onend = obj.animation.onend || function(){};
	_.a = {x: (Number(_.from.offsetLeft) + _.start.x), y: (Number(_.from.offsetTop) + _.start.y)};
	_.b = {x: (Number(_.to.offsetLeft) + _.end.x), y: (Number(_.to.offsetTop) + _.end.y)};
	_.ab = {
		x: _.b.x - _.a.x,
		y: _.b.y - _.a.y
	};
	_.translate = obj.translate || "-50%, -50%";
	transformValue("rotateZ", obj.animation.rotateZ);
	transformValue("rotateX", obj.animation.rotateX);
	transformValue("rotateY", obj.animation.rotateY);
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
		_.target.style.left = ((_.ab.x*_.progress)+(_.start.x))+"px";
		_.target.style.top = ((_.ab.y*_.progress)+(_.start.y))+"px";
		_.target.style.transform = "translate("+_.translate+") rotateZ(" + ((_.rotateZ.start*(1-_.progress)) + (_.rotateZ.end*_.progress)) + "deg) rotateX(" + ((_.rotateX.start*(1-_.progress)) + (_.rotateX.end*_.progress)) + "deg) rotateY(" + ((_.rotateY.start*(1-_.progress)) + (_.rotateY.end*_.progress)) + "deg)";
	}

}


var desktopAnimation = [
	new scrollObject({
		target: document.querySelector('.seto_babystep'),
		animation: {
			begin: 400,
			start: {"x":-140,"y":-90,"unit":"%"},
			end: {"x":-30,"y":-27},
			rotateZ: {
				start: 30,
				end: -50
			}
		}
	}),
	new scrollObject({
		target: document.querySelector('.minos_babystep'),
		from: document.querySelector('#babystep .piece'),
		to: document.querySelector('#move .piece'),
		animation: {
			begin: 300,
			start: {"x":39,"y":31},
			end: {"x":-123,"y":85},
			rotateZ: {
				start: 10,
				end: 0
			}
		}
	}),
	new scrollObject({
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
	new scrollObject({
		target: document.querySelector('.seto_move.btmL'),
		animation: {
			begin: 200,
			start: {"x":140,"y":-60,"unit":"%"},
			end: {"x":48,"y":-14},
			rotateZ: 240
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_mecanic.topL'),
		animation: {
			begin: 300,
			start: {"x":-140,"y":-80,"unit":"%"},
			end: {"x":-78,"y":-45},
			rotateZ: -60
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_mecanic.btmL'),
		animation: {
			begin: 300,
			start: {"x":-78,"y":45},
			end: {"x":-140,"y":80,"unit":"%"},
			rotateZ: 240
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_strategy2.btmR'),
		animation: {
			begin: 300,
			start: {"x":295,"y":171},
			end: {"x":140,"y":80,"unit":"%"},
			rotateZ: 120
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_mecanic3.topL'),
		from: document.querySelector('#mecanic .piece'),
		to: document.querySelector('#strategy .piece'),
		animation: {
			begin: 200,
			start: {"x":171,"y":99},
			end: {"x":-46,"y":-27},
			rotateZ: -60
		}
	})
];

var mobileAnimation = [
	new scrollObject({
		target: document.querySelector('.seto_move.btmL'),
		animation: {
			begin: 200,
			start: {"x":100,"y":-60},
			end: {"x":48,"y":-14},
			rotateZ: 240,
			rotateX:{
				start: 90,
				end: 0
			}
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_strategy.topL'),
		animation: {
			begin: 200,
			start: {"x":-90,"y":-50},
			end: {"x":-46,"y":-27},
			rotateZ: -60
		}
	})
];

function animate(x){
	posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
	if (window.matchMedia("(min-width: 750px)").matches) {

		// improve scrollObject to replace them when media match
		styleList({
			target: document.querySelector('.seto_strategy.topL'),
			css: [['transform', 'translate(-50%, -50%) rotate(-60deg)'],['left', -46+'px']]
		});
		styleList({
			target: document.querySelector('.seto_move.btmL'),
			css: [['transform', 'translate(-50%, -50%) rotate(240deg)'],['left', 48+'px']]
		});

		for (var i = 0; i < desktopAnimation.length; i++) {
			desktopAnimation[i].animate(posScroll);
		}

	} else {
		styleList({
			target: document.querySelector('#mecanic .piece'),
			css: [['transform', 'rotate('+(x-50)*5+'deg)']]
		});

		for (var i = 0; i < mobileAnimation.length; i++) {
			mobileAnimation[i].animate(posScroll);
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
