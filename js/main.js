const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const tileCount = 16;

let tiles = [];
tiles = createImageTiles();

shuffle(tiles).forEach(tile => container.appendChild(tile))

function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', index)
        li.classList.add(`list${index}`);
        tempArray.push(li)
    });
    return tempArray;
}

function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        index--;
    }
    return array;
}