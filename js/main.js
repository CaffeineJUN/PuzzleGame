const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const tileCount = 16;

let tiles = [];
const dragged = {
    el: null,
    class: null,
    index: null,
};

let isPlaying = false;
let timeInterval = null;
let time = 0;

//function
function setGame(){
    isPlaying = true;
    container.innerHTML = ''

    timeInterval = setInterval(() => {
        playTime.innerText = time;
        time++
    },1000)

    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile))
    setTimeout(() => {
        container.innerHTML = ''
        shuffle(tiles).forEach(tile => container.appendChild(tile))
    },2000);
}

function checkStatus(){
    const currentList = [...container.children]
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute('data-index')) !== index)
    if(unMatchedList.length === 0){
        gameText.style.display = 'block';
        isPlaying = false;
    }
}

function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', index)
        li.classList.add(`list${index}`);
        li.setAttribute('draggable', 'true')
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


//event
container.addEventListener('dragstart', (event) => {
    if(!isPlaying)return
    const obj = event.target
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [ ...obj.parentNode.children].indexOf(obj)
    console.log(dragged.index)
})
container.addEventListener('dragover', (event) => {
    event.preventDefault()
})
container.addEventListener('drop', (event) => {
    if(!isPlaying)return
    const obj = event.target

    if(obj.className !== dragged.class){
        let originPlace;
        let isLast = false;

        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling
        }else{
            originPlace = dragged.el.previousSibling
            isLast = true;
        }
        
        const droppedIndex = [ ...obj.parentNode.children].indexOf(obj)
        console.log(droppedIndex);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj)
    }
    checkStatus
})

startButton.addEventListener('click', () => {
    setGame();
})