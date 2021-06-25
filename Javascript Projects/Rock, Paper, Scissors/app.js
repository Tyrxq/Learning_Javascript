const startGameBtn = document.getElementById('start-game-btn');
//can store functions in varibales
//also can use an anonmous function
const start = function startGame() {
    console.log("Game is starting...");
}; //add semicolon when doing so

//terenary statement var1 === var2 ? 1 : 0;
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS"; 
const DEFAULT_CHOICE = ROCK;
const DRAW = 'DRAW';
const PLAYER_WINS = 'PLAYER_WINS';
const COMPUTER_WINS = 'COMPUTER_WINS';
let gameIsRunning = false;

const getPlayerChoice = ()=>{
    const selection = prompt(`${ROCK.charAt(0)+ROCK.substring(1).toLowerCase()},${PAPER.charAt(0) + PAPER.substring(1).toLowerCase()},${SCISSORS.charAt(0) + SCISSORS.substring(1).toLowerCase()}?`, "").toUpperCase();
    if (selection !== ROCK && 
        selection !== PAPER && 
        selection !== SCISSORS
    ){    
        alert("Invalid Choice! You get rock.");
        return DEFAULT_CHOICE;
    }
    return selection;
}

const getComputerChoice = ()=>{
    const randomChoice = Math.random();
    if (randomChoice < .34){
        return ROCK;
    }else if(randomChoice <.67){
        return PAPER;
    }
    return SCISSORS;
 }
//default parameter
const getWinner = (pChoice ,cChoice = ROCK)=>{
    if(pChoice === cChoice){
        return DRAW;
    }
    else if((pChoice === ROCK && cChoice === SCISSORS) || 
            (pChoice === PAPER && cChoice === ROCK) || 
            (pChoice === SCISSORS && cChoice === PAPER)
            ){
        return  PLAYER_WINS;
    }
    return   COMPUTER_WINS ;
}
//startGameBtn.addEventListener('click', startGame);
// const person = {
//     name: "Max",
//     greet: function greet(){
//         console.log("hello");
//     }
// };

//console.log(typeof startGame);
/*functions are objects*/
//console.dir(startGame);
//person.greet();
startGameBtn.addEventListener('click', function() {
    if(gameIsRunning){
        return;
    }
    gameIsRunning = true;
    start();
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    const winner = getWinner(playerSelection,computerSelection);
    message = `You picked ${playerSelection.toLowerCase()}, computer picked ${computerSelection.toLowerCase()}, therefore you `;
    if(winner=== DRAW){
        message+= "draw.";
    }else if (winner === PLAYER_WINS){
        message+= "won.";
    }
    else{
        message+= "lost.";
    }
    alert(message);
    gameIsRunning= false;

})
//...spread operator ... allows you to create an args by putting the arguements in an array.
// also can you use the keyword arguments 
// created a callback function
const sum = (functHandler,...args)=>{
    //arrow function returns num
    const idk = (number)=> number;
    let sum = 0;
    for(const num of args){
        sum+= idk(num);
    }
    functHandler(sum);
    return sum;
}
const showResult = (message,num) => {
    alert(message + num);
}
//bind is how to prepare an funtion to be callback with arguements
// very useful with eventlistners
console.log(sum(showResult.bind(this, "Idek what this is "),1,2,3,4,5,6));

