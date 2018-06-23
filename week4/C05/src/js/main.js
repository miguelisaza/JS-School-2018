function showUserOptions() {
  document.getElementById('userDrop').classList.toggle('show');
}

function showMobileOptions() {
  document.getElementById('mobileDrop').classList.toggle('show');
}

function hideBooksByCities(...cities) {
  cities.forEach((city) => {
    const collection = document.getElementsByClassName(city);
    [].forEach.call(collection, (cit) => {
      cit.style.display = 'none';
    });
  });
}

function showBooks() {
  const locations = ['Cartagena', 'Medellin', 'Quito', 'Digital'];

  locations.forEach((el) => {
    const collection = document.getElementsByClassName(el);
    [].forEach.call(collection, (cit) => {
      cit.style.display = 'block';
    });
  });
}


function filterElements(elName) {
  document.getElementById('filter-title').innerHTML = elName;

  const ch = document.getElementById('il').childNodes;

  ch.forEach((c) => {
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


window.onclick = (event) => {
  if (!event.target.matches('.header img')) {
    const dropdowns = document.getElementsByClassName('user-dropdown-content');
    let i;

    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  if (!event.target.matches('.header i')) {
    const dropdowns = document.getElementsByClassName('mobile-drop-content');
    let i;

    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

