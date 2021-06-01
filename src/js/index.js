import '../css/style.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/BrightTheme.css';
import PNotify, { notice, info, alert, success, error, close } from '@pnotify/core';

import _ from '../../node_modules/lodash/lodash';

import fetchCountries from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import countriesList from '../templates/list-countries.hbs';

const renderRef = document.querySelector('.js-render');
const inputRef = document.querySelector('[data-input="searchQuery"]');

inputRef.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(evt) {
  evt.preventDefault();
  const form = evt.target;
  console.log(form.value);
  const searchQuery = form.value.trim();
if (searchQuery === '') {
    return error('Empty request, enter your search data')
  }


  fetchCountries(searchQuery)
    .then(markup)
    .catch(error => console.log(error));
}

function renderCountry(country) {
  const cardMarkup = countryCard(country);
  renderRef.innerHTML = cardMarkup;
}

function renderCountriesList(country) {
  const cardMarkup = countriesList(country);
  renderRef.innerHTML = cardMarkup;
}

function markup(arrayCountries) {
  if (arrayCountries.length === 1) {
    renderCountry(arrayCountries);
  }
  if (arrayCountries.length > 1 && arrayCountries.length < 10) {
    notice('Please select a country from the list');
    renderCountriesList(arrayCountries);
  }
  if (arrayCountries.length > 10) {
    renderRef.innerHTML = '';
    alert('Too many matches foundю Please enter a more specific query!');
  }
}

