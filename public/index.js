let countries = [];

const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';

  const button = document.querySelector('#show-countries');
  button.addEventListener('click', function(thing) {
    makeRequest(url, requestComplete);
  });

  const select = document.querySelector('select');
  select.addEventListener('change', function() {
    //
    const selectedIndex = this.value;
    countryInfo(countries[selectedIndex]);
  });

  const jsonString = localStorage.getItem('country');
  let savedCountry = JSON.parse(jsonString);
  countryInfo(savedCountry);
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  // call open to get the url (kind of like a prepare stage):
  request.open('GET', url);
  // sending the request message:
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function() {
  if(this.status !== 200) return;
  // console.log(this); to check that the status is 200!
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  // console.log(countries);
  populateList(countries);
}

const populateList = function(countries) {
  const select = document.querySelector('select');
  countries.forEach(function(country, index) {
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });
}

const countryInfo = function(country) {
  const tr = document.querySelector('#info');

  tr.innerHTML = '';

  const name = document.createElement('td');
  name.innerText = country.name;
  const capital = document.createElement('td');
  capital.innerText = country.capital;
  const population = document.createElement('td');
  population.innerText = country.population;
  tr.appendChild(name);
  tr.appendChild(capital);
  tr.appendChild(population);
  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);
}







document.addEventListener('DOMContentLoaded', app);
