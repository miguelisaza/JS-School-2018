'use strict';

function showUserOptions() {
  document.getElementById('userDrop').classList.toggle('show');
}

function showMobileOptions() {
  document.getElementById('mobileDrop').classList.toggle('show');
}

function hideBooksByCities() {
  for (var _len = arguments.length, cities = Array(_len), _key = 0; _key < _len; _key++) {
    cities[_key] = arguments[_key];
  }

  cities.forEach(function (city) {
    var collection = document.getElementsByClassName(city);
    [].forEach.call(collection, function (cit) {
      cit.style.display = 'none';
    });
  });
}

function showBooks() {
  var locations = ['Cartagena', 'Medellin', 'Quito', 'Digital'];

  locations.forEach(function (el) {
    var collection = document.getElementsByClassName(el);
    [].forEach.call(collection, function (cit) {
      cit.style.display = 'block';
    });
  });
}

function filterElements(elName) {
  document.getElementById('filter-title').innerHTML = elName;

  var ch = document.getElementById('il').childNodes;

  ch.forEach(function (c) {
    if (c.className === 'selected') {
      c.className = '';
    }
  });

  showBooks();
  if (elName === 'Quito') {
    document.getElementById('quito-filter').classList.add('selected');
    hideBooksByCities('Cartagena', 'Medellin', 'Digital');
  }
  if (elName === 'Cartagena') {
    document.getElementById('cartagena-filter').classList.add('selected');
    hideBooksByCities('Quito', 'Medellin', 'Digital');
  }
  if (elName === 'Medellin') {
    document.getElementById('medellin-filter').classList.add('selected');
    hideBooksByCities('Cartagena', 'Quito', 'Digital');
  }
  if (elName === 'Digital') {
    document.getElementById('digital-filter').classList.add('selected');
    hideBooksByCities('Cartagena', 'Medellin', 'Quito');
  }
  if (elName === 'Personal') {
    document.getElementById('personal-filter').classList.add('selected');
  }
  if (elName === 'New Releases') {
    document.getElementById('releases-filter').classList.add('selected');
  }
}

window.onclick = function (event) {
  if (!event.target.matches('.header img')) {
    var dropdowns = document.getElementsByClassName('user-dropdown-content');
    var i = void 0;

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  if (!event.target.matches('.header i')) {
    var _dropdowns = document.getElementsByClassName('mobile-drop-content');
    var _i = void 0;

    for (_i = 0; _i < _dropdowns.length; _i++) {
      var _openDropdown = _dropdowns[_i];
      if (_openDropdown.classList.contains('show')) {
        _openDropdown.classList.remove('show');
      }
    }
  }
};