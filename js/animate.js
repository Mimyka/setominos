"use strict";

//////////////////////////// VARIABLE DEFINITIONS ////////////////////////////
var scrH =  document.documentElement.clientHeight || document.body.clientHeight;
var totalH = document.querySelector('html').scrollHeight - scrH;
var posScroll;

var desktopAnimation = [
	new scrollObject({
		target: document.querySelector('.seto_babystep'),
		animation: {
			begin: 45,
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
			begin: 30,
			onprogress: function() {
				onMove(document.querySelector('#move .piece-container'));
			},
			onend: function() {
				finishMove(document.querySelector('#move .piece-container'));
			},
			start: {"x":-180,"y":-85,"unit":"%"},
			end: {"x":-158,"y":-14},
			rotateZ: 120
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_move2.topR'),
		animation: {
			begin: 50,
			start: {"x":140,"y":-60,"unit":"%"},
			end: {"x":91,"y":40},
			rotateZ: 60
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_mecanic.topR'),
		animation: {
			begin: 40,
			onprogress: function() {
				onMove(document.querySelector('#mecanic .piece-container'));
			},
			onend: function() {
				finishMove(document.querySelector('#mecanic .piece-container'));
			},
			start: {"x":380,"y":-200,"unit":"%"},
			end: {"x":178,"y":-85},
			rotateZ: {
				start: -150,
				end: 60
			},
			rotateX: {
				start: -50,
				end: 0
			},
			rotateY: {
				start: -50,
				end: 0
			}
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_strategy3.topL'),
		animation: {
			begin: 35,
			start: {"x":-150,"y":-110,"unit":"%"},
			end: {"x":-164,"y":-52},
			rotateZ: {
				start: 120,
				end: -60
			}
		}
	}),
	new scrollObject({
		target: document.querySelector('.seto_strategy5.btmL'),
		animation: {
			begin: 70,
			start: {"x":100,"y":-50,"unit":"%"},
			end: {"x":271,"y":1},
			rotateZ: {
				start: 0,
				end: 240
			}
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
	var executed = false;
	var wH =  document.documentElement.clientHeight || document.body.clientHeight;
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
	tV("rotateZ", obj.animation.rotateZ, "deg");
	tV("rotateX", obj.animation.rotateX, "deg");
	tV("rotateY", obj.animation.rotateY, "deg");
	_.begin = (obj.animation.begin/100)*wH || 0;

	function tV(trgt, eql, dU) {
		_[trgt] = eql || {"start":0,"end":0};
		_[trgt] = (typeof(_[trgt]) == "number")? {"start":_[trgt],"end":_[trgt]} : _[trgt];
		_[trgt].unit = _[trgt].unit || dU;
	}

	function gettV(tV) {
		if (_[tV].start == 0 && _[tV].end == 0) {
			return "";
		}
		return " " + tV + "(" + (((_[tV].start*(1-_.progress)) + (_[tV].end*_.progress))).toFixed(0) + _[tV].unit + ")";
	}

	_.animate = function(y) {
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
		_.target.style.left = ((_.ab.x*_.progress)+(_.start.x)).toFixed(0)+"px";
		_.target.style.top = ((_.ab.y*_.progress)+(_.start.y)).toFixed(0)+"px";
		_.target.style.transform = "translate("+_.translate+")" + gettV("rotateZ", "deg") + gettV("rotateX", "deg") + gettV("rotateY", "deg");
	}
	_.update = function() {
		wH =  document.documentElement.clientHeight || document.body.clientHeight;
		_.begin = (obj.animation.begin/100)*wH || 0;
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
		document.querySelector('#mecanic .piece').style.transform = '';
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
	animate();
	document.querySelector('#mecanic .piece').style.transform = '';
}
