Element.prototype.hasClass = function(a) {
	return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClass = function(a) {
	if (!this.hasClass(a)) {
		this.className = [this.className, a].join(" ");
	}
};

Element.prototype.removeClass = function(b) {
	if (this.hasClass(b)) {
		var a = this.className;
		this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
	}
};

Element.prototype.toggleClass = function(a) {
	this[this.hasClass(a) ? "removeClass" : "addClass"](a);
};

Element.prototype.modalize = function(arg) {
  var that = this;
  arg = arg || {};
  arg.close = arg.close || that;

  for (var i = 0; i < arg.open.length; i++) {
    arg.open[i].onclick = toggle;
  }

  for (var i = 0; i < arg.close.length; i++) {
    arg.close[i].onclick = toggle;
  }

	document.querySelector('.overlay').onclick = toggle;

	function toggle() {
		that.toggleClass('open');
		document.querySelector('.overlay').toggleClass('open');
		document.querySelector('html').toggleClass('hidden');
		document.querySelector('body').toggleClass('hidden');
	}
}
