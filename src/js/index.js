import '../css/style.css';
import '@pnotify/core/dist/BrightTheme.css';

import PNotify, { notice, info, alert, success, error, close } from '@pnotify/core';
import _ from '../../node_modules/lodash/lodash';

import fetchCountries from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import countriesList from '../templates/list-countries.hbs';

const renderRef = document.querySelector('.js-render');
const inputRef = document.querySelector('[data-input="searchQuery"]');

inputRef.addEventListener('submit', _.debounce(onSearch, 500));

function onSearch(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const searchQuery = form.elements.query.value.trim();
  if ((searchQuery = '')) {
    return;
  }

  fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(country) {
  const cardMarkup = countryCard(country);

  renderRef.innerHTML(cardMarkup);

  // const countryListMarkup = countryCard(countriesList);
}
