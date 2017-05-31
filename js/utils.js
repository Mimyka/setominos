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
    arg.open[i].onclick = function() {
			that.addClass('open');
    	change("addClass");
    }
  }

  for (var i = 0; i < arg.close.length; i++) {
    arg.close[i].onclick = function() {
			that.removeClass('open');
    	change("removeClass");
			resetDisplay();
    }
  }

	document.querySelector('.overlay').onclick = function() {
		for (var i = 0; i < document.querySelectorAll('.modal').length; i++) {
			document.querySelectorAll('.modal')[i].removeClass('open');
		}
		change("removeClass");
		resetDisplay();
	}

	function change(el) {
		document.querySelector('.overlay')[el]('open');
		document.querySelector('html')[el]('hidden');
		document.querySelector('body')[el]('hidden');
	}
}
