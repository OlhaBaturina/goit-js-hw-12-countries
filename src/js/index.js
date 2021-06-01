import '../css/style.css';
import '@pnotify/core/dist/BrightTheme.css';

import PNotify, { notice, info, alert, success, error, close } from '@pnotify/core';
import _ from '../../node_modules/lodash/lodash';

import fetchCountries from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import countriesList from '../templates/list-countries.hbs';

const renderRef = document.querySelector('.js-render');
const inputRef = document.querySelector('[data-input="searchQuery"]');

const cardMarkup = countryCard(fetchCountries);
const countryListMarkup = countryCard(countriesList);

inputRef.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(evt) {
  evt.preventDefault;
  const searchQuery = evt.target.value.trim();
  if ((searchQuery = '')) {
    return;
  }
  //  очищаем старую разметку
  renderRef.innerHTML('');

  fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(cardMarkup) {
  renderRef.innerHTML(cardMarkup);
}
