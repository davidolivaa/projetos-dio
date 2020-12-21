let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // renderiza o desenho que sera inserido no canvas
let box = 32
let snake = [] // a cobrinha sera um array
snake[0] = {
    x: 8*box,
    y: 8*box
}

let direction = 'right'
let food = {
    x: Math.floor(Math.random()*15 + 1) * box,
    y: Math.floor(Math.random()*15 + 1) * box
}


function criarBG(){
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 16*box, 16*box) // desenha a area/retangulo onde o jogo vai rodar a partir dos parametros
}

function criarCobra(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawfood(){
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}


document.addEventListener('keydown', update) // adiciona ao document o evento keydown, sempre que uma das teclas for pressionada dispara o evento

function update(event){
    if (event.keyCode == 37 && direction != 'right') direction = 'left'
    if (event.keyCode == 38 && direction != 'dowm') direction = 'up'
    if (event.keyCode == 39 && direction != 'left') direction = 'right'
    if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarJogo(){
    if (snake[0].x > 15*box && direction == 'right' ) snake[0].x = 0; 
    if (snake[0].x < 0 && direction == 'left' ) snake[0].x = 16*box; 
    if (snake[0].y > 15*box && direction == 'down' ) snake[0].y = 0; 
    if (snake[0].y < 0 && direction == 'up' ) snake[0].y = 16*box; 

    for(i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert('Game Over :(')
        }
    }

    criarBG()
    criarCobra()
    drawfood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'down') snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random()*15 + 1) * box,
        food.y = Math.floor(Math.random()*15 + 1) * box
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)

