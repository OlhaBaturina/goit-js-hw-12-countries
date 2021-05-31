import '../css/style.css';
import './fetchCountries';
import countryCard from '../templates/country.hbs';

const renderRef = document.querySelector('.js-render');
const inputRef = document.querySelector('.input-js');

const searchQuery = '';

inputRef.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault;
  searchQuery = evt.currentTarget.value;
}

fetchCountries(italy)
  .then(renderCountry)
  .catch(error => console.log(error));

function renderCountry(country) {
  renderRef.innerHTML(country);
}
