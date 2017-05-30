// usage = Element.modalize(Object{
  // button: NodeList,
  // close: NodeList
// });

document.querySelector('.modal-buy').modalize({
  open: document.querySelectorAll('.btn-buy'),
  close: document.querySelectorAll('.modal-buy .cross')
});
document.querySelector('.modal-mbr').modalize({
  open: document.querySelectorAll('.btn-mbr'),
  close: document.querySelectorAll('.modal-mbr .cross')
});
document.querySelector('.modal-ml').modalize({
  open: document.querySelectorAll('.btn-ml'),
  close: document.querySelectorAll('.modal-ml .cross')
});
document.querySelector('.modal-cgv').modalize({
  open: document.querySelectorAll('.btn-cgv'),
  close: document.querySelectorAll('.modal-cgv .cross')
});

document.querySelector('.a').onclick = display1;
document.querySelector('.b').onclick = display2;

// var tab = document.querySelectorAll('.A, .B, .C');

// div
// form
// form
// >
// "classcommune"
//
// "btn-act"
//
// function functionName() {
//   querySelectorAll('.classecommune .btn-act')[i]
//   toggleClass('open')
//   removeClass('open')
// }

function display1() {
  document.querySelector('.A').style.display = "none";
  document.querySelector('.B').style.display = "block";
}

function display2() {
  document.querySelector('.B').style.display = "none";
  document.querySelector('.C').style.display = "block";
}
