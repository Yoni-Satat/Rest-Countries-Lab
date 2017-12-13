let countries = [];

const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';

  // const button = document.querySelector('#show-countries');
  makeRequest(url, requestComplete);

  const select = document.querySelector('select');
  select.addEventListener('change', function() {
    //
    const selectedIndex = this.value;
    countryInfo(countries[selectedIndex]);
  });


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

  const storedJsonString = localStorage.getItem('country');
  let savedCountry = JSON.parse(storedJsonString);
  countryInfo(savedCountry);
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
  const borders = document.createElement('td');
  borders.innerText = getBorderingCountries(country);

  tr.appendChild(name);
  tr.appendChild(capital);
  tr.appendChild(population);
  tr.appendChild(borders);


  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);
}

const getBorderingCountries = function(country) {
  const bords = country.borders;
  let returnString = "";
  for (code of bords) {
    for (country of countries) {
      if (country.alpha3Code === code) {
        returnString += country.name + ", ";
      }
    }
  }
  return returnString;

}







document.addEventListener('DOMContentLoaded', app);
