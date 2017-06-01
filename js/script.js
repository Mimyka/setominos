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
