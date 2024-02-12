//Scriolling Categories-List
function toggleCategories() {
  var categoriesList = document.getElementById('categories-list');
  categoriesList.style.maxHeight = categoriesList.style.maxHeight === '0px' ? categoriesList.scrollHeight + 'px' : '0px';
  
  var arrowImage = document.querySelector('.arrowBMenu');
  arrowImage.classList.toggle('rotate');
}