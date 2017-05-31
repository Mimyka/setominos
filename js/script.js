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

document.querySelector('.modal-buy .btn-buy').onclick = showPart1;
document.querySelector('.form_part1 .btn-form').onclick = showPart2;

function resetDisplay() {
  document.querySelector('.btn-modal').style.display = "flex";
  document.querySelector('.form_part1').style.display = "none";
  document.querySelector('.form_part2').style.display = "none";
}

function showPart1() {
  document.querySelector('.btn-modal').style.display = "none";
  document.querySelector('.form_part1').style.display = "block";
  document.querySelector('.form_part2').style.display = "none";
}

function showPart2() {
  document.querySelector('.btn-modal').style.display = "none";
  document.querySelector('.form_part1').style.display = "none";
  document.querySelector('.form_part2').style.display = "block";
}
