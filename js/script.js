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
