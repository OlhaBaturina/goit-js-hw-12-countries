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

inputRef.addEventListener('input', _.debounce(onSearch, 1500));

function onSearch(evt) {
  evt.preventDefault();
  const form = evt.target;
  console.log(form.value);
  const searchQuery = form.value.trim();
if (searchQuery === '') {
    return errorAlert('Empty request, enter your search data')
  }


  fetchCountries(searchQuery)
    .then(markup)
    .catch(
       errorAlert('Not found!')
 );
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
  if (arrayCountries.length > 1 && arrayCountries.length <= 10) {
    warningAlert('Please enter a more precise query');
    renderCountriesList(arrayCountries);
  }
  if (arrayCountries.length > 10) {
    renderRef.innerHTML = '';
    warningAlert('Too many matches found. Please enter a more specific query!');
  }
}


function warningAlert(message) {
  alert({
    title: 'ALARM',
    text: `${message}`,
    delay: 200,
   
  });
}

function errorAlert(message) {
  error({
    title: 'ERROR',
    text: `${message}`,
    delay: 200,

  });
}