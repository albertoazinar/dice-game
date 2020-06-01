
var scores, roundScore, activePlayer, isGamePlaying;

init();

//document.getElementById('current-' + activePlayer).textContent = dice;

document.querySelector('#roll').addEventListener('click', function(){ //anonymous function
    if(isGamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';

        diceDOM.src = 'dice-six-faces-'+dice+'.svg';

        //adding the roundScore if the dice value is not 1
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent= roundScore;
            document.getElementById('name-'+activePlayer).innerHTML = '<em>'+'Player '+(activePlayer+1)+'</em>';
        }else{
            nextPlayer();    
        }
    }
});

document.getElementById('hold').addEventListener('click', function(){
    //save value from current score to Global score
    if(isGamePlaying){
        scores[activePlayer] += roundScore;

        //update the UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //check the winner
        if(scores[activePlayer]>= 5){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('.winner')
            isGamePlaying = false;
        }else{
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
            document.getElementById('name-'+activePlayer).innerHTML = '<p>'+'Player '+(activePlayer+1)+'</p>';
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //if-else
            roundScore = 0;
            
            document.querySelector('.player-0-act').classList.remove('.active');

            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';

            document.querySelector('.dice').style.display = 'none';
}

document.getElementById('new-game').addEventListener('click',init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}