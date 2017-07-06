//////////////////////////// VARIABLE DEFINITIONS ////////////////////////////
var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var totalH = document.querySelector('html').scrollHeight - scrH;
var posScroll;

var desktopAnimation = [
	new scrollObject({
		target: document.querySelector('.seto_babystep'),
		animation: {
			begin: 400,
			onprogress: function() {
				onMove(document.querySelector('#babystep .piece-container'));
			},
			onend: function() {
				finishMove(document.querySelector('#babystep .piece-container'));
			},
			start: {"x":-140,"y":-90,"unit":"%"},
			end: {"x":-30,"y":-27},
			rotateZ: {
				start: 30,
				end: -50
			}
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_move.btmR'),
		animation: {
			begin: 200,
			onprogress: function() {
				onMove(document.querySelector('#move .piece-container'));
			},
			onend: function() {
				finishMove(document.querySelector('#move .piece-container'));
			},
			start: {"x":-150,"y":-85,"unit":"%"},
			end: {"x":-158,"y":-14},
			rotateZ: 120
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_move2.topR'),
		animation: {
			begin: 380,
			start: {"x":140,"y":-60,"unit":"%"},
			end: {"x":91,"y":40},
			rotateZ: 60
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
		reset: "start",
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

///////////////////////////////// FUNCTIONS /////////////////////////////////

function scrollObject(obj) {
	var _ = this;
	_.target = obj.target;
	_.from = obj.from || obj.target.parentNode;
	_.to = obj.to || obj.target.parentNode;
	_.start = obj.animation.start || {'x':0,'y':0};
	_.end = obj.animation.end || {'x':0,'y':0};
	_.start.unit = (obj.animation.start.unit && obj.animation.start.unit == "%")?"%":"px";
	_.end.unit = (obj.animation.end.unit && obj.animation.end.unit == "%")?"%":"px";
	_.reset = obj.reset || "end";
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
	tV("rotateZ", obj.animation.rotateZ);
	tV("rotateX", obj.animation.rotateX);
	tV("rotateY", obj.animation.rotateY);
	_.begin = obj.animation.begin || 0;

	function tV(trgt, eql, unit) {
		_[trgt] = eql || {"start":0,"end":0};
		_[trgt] = (typeof(_[trgt]) == "number")? {"start":_[trgt],"end":_[trgt]} : _[trgt];
	}

	function gettV(tV, unit) {
		unit = unit || "%";
		return tV + "(" + ((_[tV].start*(1-_.progress)) + (_[tV].end*_.progress)) + unit + ")";
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
			_.progress = (y-_.a.y)/_.ab.y;
			_.onprogress();
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
		_.target.style.transform = "translate("+_.translate+") " + gettV("rotateZ", "deg") + " " + gettV("rotateX", "deg") + " " + gettV("rotateY", "deg");
	}
	_.update = function() {
		if (_.start.unit == "%") {
			_.start = {x: (obj.animation.start.x/100)*Number(_.from.offsetLeft), y: (obj.animation.start.y/100)*Number(_.from.offsetLeft)};
		}
		if (_.end.unit == "%") {
			_.end = {x: (obj.animation.end.x/100)*Number(_.to.offsetLeft), y: (obj.animation.end.y/100)*Number(_.to.offsetLeft)};
		}
		_.a = {x: (Number(_.from.offsetLeft) + _.start.x), y: (Number(_.from.offsetTop) + _.start.y)};
		_.b = {x: (Number(_.to.offsetLeft) + _.end.x), y: (Number(_.to.offsetTop) + _.end.y)};
		_.ab = {
			x: _.b.x - _.a.x,
			y: _.b.y - _.a.y
		};
		_.target.style.left = _[_.reset].x+"px";
		_.target.style.top = _[_.reset].y+"px";
		_.target.style.transform = "translate("+_.translate+") rotateZ(" + _.rotateZ[_.reset] + "deg) rotateX(" + _.rotateX[_.reset] + "deg) rotateY(" + _.rotateY[_.reset] + "deg)";
	}

}

function finishMove(target) {
	target.style.opacity = 0.75;
	target.style.filter = "grayscale(.6)";
	target.style.transform = "scale(.95,.95)";
}

function onMove(target) {
	target.style.opacity = "";
	target.style.filter = "";
	target.style.transform = "";
}

function animate(x){
	posScroll = (document.querySelector('body').scrollTop != 0) ? document.querySelector('body').scrollTop : document.querySelector('html').scrollTop;
	var x = ((posScroll / totalH) * 100).toFixed(2);
	if (window.matchMedia("(min-width: 750px)").matches) {
		for (var i = 0; i < desktopAnimation.length; i++) {
			desktopAnimation[i].animate(posScroll);
		}
	} else {
		document.querySelector('#mecanic .piece').style.transform = 'rotate('+(x-50)*5+'deg)';
		for (var i = 0; i < mobileAnimation.length; i++) {
			mobileAnimation[i].animate(posScroll);
		}
	}
}

/////////////////////////////// EVENT LISTENER ///////////////////////////////

document.onscroll = animate;

window.onresize = function() {
	scrH =  document.documentElement.clientHeight || document.body.clientHeight;
	totalH = document.querySelector('html').scrollHeight - scrH;
	for (var i = 0; i < mobileAnimation.length; i++) {
		mobileAnimation[i].update();
	}
	for (var i = 0; i < desktopAnimation.length; i++) {
		desktopAnimation[i].update();
	}
	document.querySelector('#mecanic .piece').style.transform = '';
	animate();
}
