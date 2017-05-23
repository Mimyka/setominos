// usage = Element.modalize(Object{
  // button: NodeList,
  // close: NodeList
// });

document.querySelector('.buy-modal').modalize({
  open: document.querySelectorAll('.buy-btn'),
  close: document.querySelectorAll('.buy-close')
});
