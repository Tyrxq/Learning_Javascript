const ATTACK_VALUE = 10;
const Monster_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const  HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";


let chosenMaxLife;
try{
    chosenMaxLife = getMaxedValues();
}catch(error) {
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used.');
}
let lastLogEntry;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function getMaxedValues() {
    const enteredValue = prompt('Maxinun life for you and the monster.', '100');
    const parsedValue = parseInt(enteredValue);
    if(isNaN(parsedValue) || parsedValue <=0){
        throw{message: 'Invalid user input, not a number!'};
    }
    return parsedValue;
}

function writeTOLogLog(ev,val,monsterHealth,playerHealth){
    let logEntry ={  
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth

    };
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        //If this key does not exist it then it's created in the object pretty neat
        logEntry.target = "MONSTER";
        battleLog.push(logEntry);
    } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry ={
            event: ev,
            value: val,
            target: "MONSTER" ,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    } else if(ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry ={
            event: ev,
            value: val,
            target: "PLAYER" ,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    } else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry ={
            event: ev,
            value: val,
            target: "PLAYER" ,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    }else if(ev === LOG_EVENT_GAME_OVER){
        logEntry ={
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        battleLog.push(logEntry);
    }
}

adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    hasBonusLife = true;
    resetGame(chosenMaxLife);
}

function endRound(){
    const intialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(Monster_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage; 
    writeTOLogLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;            
        removeBonusLife();
        currentPlayerHealth = intialPlayerHealth;
        setPlayerHealth(intialPlayerHealth);
        alert("Bonus Life Used");

    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You won");
        writeTOLogLog(LOG_EVENT_GAME_OVER,playerDamage,"Player Won",currentPlayerHealth);
        reset();
        
    }
    else if(currentPlayerHealth <= 0 && currentMonsterHealth >0){
        alert("You lose");
        writeTOLogLog(LOG_EVENT_GAME_OVER,playerDamage,"Monster Won",currentPlayerHealth);
        reset();
    }
    else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert("You have a draw");
        writeTOLogLog(LOG_EVENT_GAME_OVER,playerDamage,"Draw",currentPlayerHealth);
        reset();
    }
}

function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode === "ATTACK"){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    }
    else if (mode === "STRONG_ATTACK"){
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    writeTOLogLog(logEvent,monsterDamage,currentMonsterHealth,currentPlayerHealth); 

  endRound();
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal past your max health. Stop whinning!")
        healValue = chosenMaxLife - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeTOLogLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
    endRound();
}

function attackHandler() {
   attackMonster("ATTACK");
   
}

function strongAttackHandler(){
    attackMonster("STRONG_ATTACK");
}
//for of loop is for arrays
// for in loop is for objects and it gets the keys
function printLogHandler(){
    let i = 0;// used to see if any new events were added   
    let newEvent = true; //boolean is used to detect a new event
    /*
        The battleLog is an array storing the event objects which constains
        keys and values depending on the event. This for loop prints 
        the values and keys in a bullet point format.
    */
    for(let battleObeject of battleLog){
        if(!lastLogEntry && lastLogEntry !== 0 || lastLogEntry < i){// not set and does not equal zero
            for(let key in battleObeject){
                const output =  `${key}: ${battleObeject[key]}`
                if(newEvent){
                    console.log(output); 
                    newEvent = false;
                }
                else{
                    console.log("     * "+ output);
                    
                }
                lastLogEntry = i; 
            }
        }
        newEvent = true;
        i++;
        

    }
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);