

const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0

const brickrowCount = 13
const brickcolumnCount = 5
const delay = 500
const ballColor = '#0095dd'
const scoreFont = '20px Arial'

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 5,
    dx: 8,
    dy: -8,
    visible: true
}

const paddle = {
    x: canvas.width / 2-50,
    y: canvas.height-20,
    w: 100,
    h: 10,
    speed: 15,
    dx: 0,
    visible: true
}
const brickInfo = {
    padding: 15,
    w: 70,
    h: 20,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

//创建砖块
const bricks = [];
for (let i = 0; i < brickrowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickcolumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }
    }
}

//画球
let drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? ballColor : 'transparent';
    ctx.fill();
    ctx.closePath();
}

let drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = paddle.visible ? ballColor : 'transparent';
    ctx.fill();
    ctx.closePath();
}

let drawScore = () => {
    ctx.font = scoreFont;
    ctx.fillText(`Score:${score}`, canvas.width - 100, 30);
}
let drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? ballColor : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}
let increaseScore=()=>{
    score++
    if(score%(brickrowCount*brickcolumnCount)==0){
        ball.visible=false;
        paddle.visible=false;
        setTimeout(()=>{
            showAllbricks();
            score=0;
            paddle.x=canvas.width/2-50;
            paddle.y=canvas.height-20;
            ball.x=canvas.width/2;
            ball.y=canvas.height/2;
            ball.visible=true;
            paddle.visible=true
        },delay)
    }
    
}

let showAllbricks=()=>{
    bricks.forEach(column=>{
        column.forEach(brick => {
            brick.visible=true
        });
    })
}
let movePaddle = () => {
    paddle.x += paddle.dx;
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}
let moveBall=()=>{
    ball.x+=ball.dx;
    ball.y+=ball.dy;
    if(ball.x+ball.size>canvas.width||ball.x-ball.size<0){
        ball.dx*=-1;
    }
    if(ball.y+ball.size>canvas.height||ball.y-ball.size<0){
        ball.dy*=-1;
    }
    if(
        ball.x>paddle.x&&
        ball.x<paddle.x+paddle.w&&
        ball.y+ball.size>paddle.y
    ){
        ball.dy*=-1;
    }
    bricks.forEach(column=>{
        column.forEach(brick=>{
            if(brick.visible){
                if(
                    ball.x-ball.size>brick.x&&
                    ball.x<brick.x+brick.w&&
                    ball.y+ball.size>brick.y&&
                    ball.y-ball.size<brick.y+brick.h
                ){
                    ball.dy*=-1;
                    brick.visible=false;
                    increaseScore();
                }
            }
        })
    })

    if(ball.y+ball.size>canvas.height){
        showAllbricks();
        score=0
    }
}

let draw=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
}
let update=()=>{
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}
update()
let keyDown=(e)=>{
    if(e.key==='Right'||e.key==='ArrowRight'){
        paddle.dx=paddle.speed;
    }else if(e.key==='Left'||e.key==='ArrowLeft'){
        paddle.dx=-paddle.speed;
    }
}
let keyUp=(e)=>{
    if(e.key==='Right'||e.key==='ArrowRight'||e.key==='Left'||e.key==='ArrowLeft'){
        paddle.dx=0;
    }
}

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)
rulesBtn.addEventListener('click',()=>{
    rules.classList.add('show')
})
closeBtn.addEventListener('click',()=>{
    rules.classList.remove('show')
})

