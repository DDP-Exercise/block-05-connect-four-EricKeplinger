"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.

//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.


//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.

//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.

//TODO: Method to change the current player (and dispatch the according event).




const ConnectFourModel = {
    rows: 6,
    columns: 7,
    board: [],
    players: ["linux", "macos"],
    currentPlayer: "linux",
    gameOver: false,
    winner: null,
    winningStones: [],
    initBoard(){
        this.board = [];
        for(let row = 0; row < this.rows; row++){
            const currentRow = [];

            for(let col = 0; col < this.columns; col++){
                currentRow.push(null);
            }

            this.board.push(currentRow);
        }

    },
    dispatchPlayerChange(){
        document.dispatchEvent(new CustomEvent('connectfour:playerchange', {
            detail: {
                currentPlayer: this.currentPlayer
            }
        }));
    },
    dispatchInsertCoin(coin){
       document.dispatchEvent(new CustomEvent('connectfour:insertCoin', {
           detail: coin
       }));
    },
    dispatchgameOver(winner){
        document.dispatchEvent(new CustomEvent('connectfour:gameover', {
            detail: winner
        }));
    }


};