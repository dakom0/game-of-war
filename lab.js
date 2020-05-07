
const message = document.querySelector(".message");
const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
const user = document.querySelector(".user");
const res = document.querySelector(".res");
let cards = [];
let players = [];
let deals= [];
let round = [];
let inplay = [];
  

        
    const suits = ['hearts', 'spades', 'clubs', 'diams'];
    const ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'King', 'Queen'];



buttons.forEach(function(item){
  item.addEventListener("click",playGame);
  
  
})

function playGame(e){
  let temp = e.target.textContent;
  console.log(temp);
  if(temp == "Start"){
    btnToggle();
    startGame();
    let tempRuns = document.querySelector("input").value;
    res.innerHTML = "";
    round= 0;
        for (let x = 0; x < tempRuns; x++) {
            while(deals[0].length>=1 && deals[1].length>=1){
            if(deals[0].length>=1 && deals[1].length>=1){
            if(inplay){
                message.innerHTML = "Round "+ (x+1);
                makeCards();
        } 
        }
    }
    }   
  }
}

function btnToggle(){
    buttons[0].classList.toggle("hide");
    buttons[1].classList.toggle("hide");
}

function startGame(){
    inplay = true;
    let numberPlayers = document.querySelector("input").value;
    buildDeck();
    setupPlayers(numberPlayers);
    dealCards(0);
    makeCards();
    document.querySelector("input").value ="1";

}
function showCard(el,card){
    if (card!=undefined){
        el.style.backgroundColor = "white";
        let html1 = "";
        let html2 = card.rank+ "<br>&" + card.suit+";";
        let div = document.createElement("div");
        div.classList.add("card");

        let span1 = document.createElement("span");
        span1.innerHTML = html2;
        div.appendChild(span1);

        let span2 = document.createElement("span");
        span2.innerHTML = html1;
        span2.classList.add("big");
        div.appendChild(span2);
        el.appendChild(div);
 
    }
}

function makeCards(){
    let tempHolder = [];
    let curWinner={
        "high": null,
        "player": null
    }
    let playoff = [];
    for (let x = 0; x < players.length; x++) {
        players[x].innerHTML = "";
        let card = deals[x].shift();


        if (curWinner.high == card.value) {
            console.log("tie");
            if(playoff.length == 0){
                playoff.push(
                    {
                        "player":curWinner.player,
                        "card":curWinner.card
                    }
                );
                playoff.push(
                    {
                        "player":x,
                        "card":card
                    });
            }
        }
        if (!curWinner.high || curWinner.high<card.value) {
            curWinner.high = card.value;
            curWinner.player = x;
            curWinner.card = card;
        }

        tempHolder.push(card);
        showCard(players[x],card);
        console.log(deals);  
    }
    console.log(curWinner);
    console.log(tempHolder);
    upddater(curWinner.player,tempHolder);

}

function upddater(winner,tempHolder){

    tempHolder.sort(function(){
        return .5-Math.random();
    })

    for (let record of tempHolder){
        deals[winner].push(record);   
    }
    for (let x = 0; x < players.length; x++) {
        let div = document.createElement("div");
        div.classList.add("stats");
        div.innerHTML= deals[x].length<1 ? "Lost": "Cards: " + (deals[x].length);
        players[x].appendChild(div);
        console.log(deals[1].length)
    }
    
    res.innerHTML += "Player "+(winner+1)+ " won "+ tempHolder.length+ " cards.<br>";
}

function dealCards(playerCard){
    playerCard = (playerCard>= players.length)? 0 : playerCard;
    if(cards.length>0){
        let randIndex = Math.floor(Math.random()*cards.length);
        let card = cards.splice(randIndex,1)[0];
        deals[playerCard].push(card);
        playerCard++;
        return dealCards(playerCard);


    }else{
        message.textContent = "cards dealt";
        message.classList.toggle("hide");
        return;
    }

}

function setupPlayers(num){
    players = [];
    deals = [];
    for (let x = 0; x < num; x++) {
    let div = document.createElement("div");
    div.setAttribute("id","player"+(x+1));
    div.classList.add("player");
    let div1 =document.createElement("div");
    div1.textContent = "Player"+(parseInt(x)+1);
    players[x]= document.createElement("div");
    div.appendChild(div1);
    div.appendChild(players[x]);
    gameplay.appendChild(div);
    deals.push([]);    
    }
}

function buildDeck(){
    cards = [];
    for(let i=0; i<suits.length; i++){
        for (let j = 0; j < ranks.length; j++) {
            let card = {};
            card.suit = suits[i];
            card.rank = ranks[j];
            card.value = (j+1);
            cards.push(card)
            
        }
    }
}