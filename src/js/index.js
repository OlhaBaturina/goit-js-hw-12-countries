import '../css/style.css';
import fetchCountries from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import countriesList from '../templates/list-countries.hbs';

const renderRef = document.querySelector('.js-render');
const inputRef = document.querySelector('.input-js');

let searchQuery = '';

inputRef.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault;
  searchQuery = evt.target.value;

  fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(country) {
  renderRef.innerHTML(country);
}
