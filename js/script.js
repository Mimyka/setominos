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

function input(target) {
	return encodeURIComponent(document.querySelector("input[name="+target+"]").value);
}

function getXHR() {
		var xhr = null;

		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				xhr = new XMLHttpRequest();
			}
		} else {
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
		}

		return xhr;
}

function request_command(callback) {
		var xhr = getXHR();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText, 1);
        }
    };

		var first_name = input("first_name");
		var last_name = input("last_name");
		var email = input("email");
		var amount = input("amount");
		var adress = input("adress");
		var postal_code = input("postal_code");
		var city = input("city");
    var phone = input("phone");
		var check = document.querySelector("#modal-buy input[name=check]").value;

		xhr.open("POST", "./form.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("first_name="+first_name+"&last_name="+last_name+"&email="+email+"&amount="+amount+"&adress="+adress+"&postal_code="+postal_code+"&city="+city+"&phone="+phone+"&check="+check);
}

function request_member(callback) {
		var xhr = getXHR();
		xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
						callback(xhr.responseText, 2);
				}
		};

		var pseudo = input("pseudo");
		var member_email = input("member_email");
		var check = document.querySelector("#modal-mbr input[name=check]").value;

		xhr.open("POST", "./inscription.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("pseudo="+pseudo+"&member_email="+member_email+"&check="+check);
}

function read(data, b) {
		if(b == 1){
			if (data == "true") {
	        alert("Mail envoyé avec succès !");
	    } else {
					alert("Le mail ne s'est pas envoyé, veuillez vérifier vos informations.");
	    }
		}
		if(b == 2){
			if (data == "true") {
					alert("Inscription effectuée avec succès !");
			} else {
					alert("Veuillez vérifier vos informations et recommencer, l'inscription a échoué.");
			}
		}
}

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
