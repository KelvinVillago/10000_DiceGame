console.log('Hello it me');
pageLoader();

// Function to load our page and set event listeners
function pageLoader(){
    console.log('Loading the page with functionality...');
    document.body.style.backgroundColor = '#4a8066'

    const buttons = document.getElementsByClassName('play-button');
    for (let btn of buttons){
        btn.addEventListener('click', decision);
    };
   
}

function decision(e){
    console.log('clicked play button');
    console.log(e.target.value);
    if (e.target.value === 'Play'){
        playGame();
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

class Player{
    constructor(){
        this.hand = [];
        this.score = 0;
    }

    rollNum(){
        return Math.floor(Math.random() * (6 - 1 + 1) + 1);
    }

    rollDice(){
        this.hand = [];
        for(var i = 0; i < 6; i++){
            this.hand.push(this.rollNum());
        }
    }

    getHand(){
        return this.hand
    }

    getScore(){
        return this.score;
    }

    scoreHand(){
        total = 0;
        data = {
            1:[0,100,200,1000,1100,1200,2000],
            2:[0,0,0,200,200,200,400],
            3:[0,0,0,300,300,300,600],
            4:[0,0,0,400,400,400,800],
            5:[0,50,100,500,550,600,1000],
            6:[0,0,0,0,0,0,0]
        }

        //Check for straight
        if(this.hand.sort().join('') == '123456'){
            total = 1500;
        }
        else{
            for(var i=1; i<7; i++){
                let count = this.hand.filter(x => x === i).length;
                total += data[i][count];
            }
        }
        this.score += total;
        return total
    }
}

function playGame(){
    console.log('Playing');
    let table = document.getElementById('dice-table');
    
    player.rollDice();

    for(var i = 0; i < player.getHand().length; i++){
        let newCol = document.createElement('div');
        newCol.classList.add('col-2')
        table.append(newCol);

        let divider = document.createElement('div');
        divider.classList.add('card', 'm-1', 'border-none');
        newCol.append(divider);

        newDataCellImg(divider, `../static/images/${player.getHand()[i]}.jpg`);
    }
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
    console.log(value);
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


let player = new Player();