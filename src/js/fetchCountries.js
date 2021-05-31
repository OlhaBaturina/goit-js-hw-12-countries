export default fetchCountries(searchQuery);

function fetchCountries(country) {
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(r => {
    return r.json();
  });
}