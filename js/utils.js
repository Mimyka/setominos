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
