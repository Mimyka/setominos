var ModalEffects = (function() {

	function init() {
		var overlay = document.querySelector( '.overlay' );
		[].slice.call( document.querySelectorAll( '.modal-trigger' ) ).forEach( function( el, i ) {
			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ));
			var close = modal.querySelector('.modal-close');
			function removeModal() {
        for (var i = 0; i < document.querySelectorAll('.modal').length; i++) {
          document.querySelectorAll('.modal')[i].removeClass('open');
        }
        overlay.removeClass('open');
        setTimeout(resetDisplay, 250);
			}
			el.onclick = function() {
        modal.addClass('open');
				overlay.addClass('open');
			};
      overlay.onclick = removeModal;
			close.onclick = removeModal;
		} );
	}

	init();

})();

var form1 = document.querySelector('#modal-buy .form_part1');
var form2 = document.querySelector('#modal-buy .form_part2');

form1.querySelector('.btn').onclick = function() {
  form1.style.display = "none";
  form2.style.display = "flex";
}

function resetDisplay() {
  form1.style.display = "flex";
  form2.style.display = "none";
}
