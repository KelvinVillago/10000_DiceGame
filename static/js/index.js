console.log('Hello it me');
pageLoader();


// Function to load our page and set event listeners
function pageLoader(){
    console.log('Loading the page with functionality...');
    document.body.style.backgroundColor = '#b5b5b5'

    // Get the color buttons and add change background event listener
    const colorButtons = document.getElementsByClassName('light-dark-button');
    for (let btn of colorButtons){
        btn.addEventListener('click', changeBackgroundColor);
    };

    // Get the nav links and add the changeView event listener
    const navLinks = document.getElementsByClassName('nav-link');
    for (let link of navLinks){
        link.addEventListener('click', changeView);
    }

    // Add the brew finder when the form submits
    const findCountryForm = document.querySelector('#find-countries-form');
    findCountryForm.addEventListener('submit', (e) => findCountries(e, 1));

}

// Create a function that will change the background color
function changeBackgroundColor(e){
    console.log('clicked color button');
    console.log(e.target.value);
    if (e.target.value === 'Dark'){
        document.body.style.backgroundColor = '#5c5c5c'
    } else {
        document.body.style.backgroundColor = '#b5b5b5'
    }
}


// Create a function to make this a Single Page App (SPA) by swapping visible divs
function changeView(event){
    // Turn off the element(s) that are visible
    const toTurnOff = document.getElementsByClassName('is-visible');
    for (let element of toTurnOff){
        console.log('Turning off', element);
        element.classList.replace('is-visible', 'is-invisible');
    }

    // Turn on the element based on the link that was clicked
    let idToTurnOn = event.target.name;
    const toTurnOn = document.getElementById(idToTurnOn);
    toTurnOn.classList.replace('is-invisible', 'is-visible');
}


function findCountries(event, pageNumber){
    event.preventDefault();
    // console.dir(event.target.city);
    const countryName = document.getElementsByName('country')[0].value;
    console.log(`Looking for countries with ${countryName}...`);
    const url = `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {if (data.length){displayCountries(data, pageNumber)}})
        .catch(err => console.error(err))
}


// Callback Function for findBreweries that will insert breweries into table
function displayCountries(data, pageNumber){
    data.sort( (a, b) => {
        if (a.city > b.city){return 1}
        else if (a.city < b.city){ return -1}
        else { return 0}
    })
    let table = document.getElementById('country-table');
    

    // write a row for each brewery in data
    let country = data[0]
    let newCol = document.createElement('div');
    newCol.classList.add('col-3')
    table.append(newCol);

    let divider = document.createElement('div');
    divider.classList.add('card', 'm-3', 'border-3', 'border-dark');
    newCol.append(divider);

    const td = document.createElement('td');
    td.innerHTML = `<h2>${country.name.common}</h2>`;
    td.classList.add('text-center', 'display-4')
    divider.append(td);

    //newDataCell(tr, country.name.common);
    newDataCellImg(divider, country?.flags.png);
    newDataCellImg(divider, country?.coatOfArms.png);

    
    let divider2 = document.createElement('div');
    divider2.classList.add('card-body', 'm-3');
    divider.append(divider2);
    newDataCell(divider2, 'Currencies: ' + country?.currencies);
    newDataCell(divider2, 'Capital: ' + (country.capital ? country.capital[0] :  'No Capital'));
    newDataCell(divider2, 'Languages: ' + Object.values(country?.languages).toString());
    
}

// Helper function to create a new data cell for table
function newDataCell(tr, value){
    let td = document.createElement('td');
    td.innerText = value ?? '-';
    tr.append(td);

    
    let b = document.createElement('b');
    tr.append(b);
}

// Helper function to create new data where an image needs to be displayed
function newDataCellImg(tr, value){
    let img = document.createElement('img');
    img.src = value ?? '...'
    if(img.src == "..."){
        img.classList.add('card-img-top')
    }
    img.classList.add('img-fluid', 'p-1', 'width');
    tr.append(img);
}

// Helper function to clear the brewery table
function clearTable(table){
    table.innerHTML = '';
    const buttonsToClear = document.querySelectorAll('.prev-next-btn');
    for (let btn of buttonsToClear){
        btn.remove()
    }
}
