function toggleCategories() {
  var categoriesList = document.getElementById('categories-list');
  if (parseFloat(categoriesList.style.maxHeight) === 0) {
    categoriesList.style.maxHeight = categoriesList.scrollHeight + 'px';
  } else {
    categoriesList.style.maxHeight = '0';
  }

  var arrowImage = document.querySelector('.arrowBMenu');
  arrowImage.classList.toggle('rotate');
}


