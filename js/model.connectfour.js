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




export const ConnectFourModel = {
    rows: 6,
    columns: 7,
    board: [],
    players: ["linux", "macos"],
    currentPlayer: "linux",
    gameOver: false,
    winner: null,
    winningCoins: [],

    initBoard(){
        this.board = [];
        this.currentPlayer = "linux";
        this.gameOver = false;
        this.winner = null;
        this.winningCoins = [];

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
    },

    insertCoin(column){
        let coininsert = false;

        if(this.gameOver){
            return coininsert;
        }

        for(let row = this.rows - 1; row >= 0; row--){
          if(this.board[row][column] === null){
              this.board[row][column] = this.currentPlayer;
              this.dispatchInsertCoin({
                  player: this.currentPlayer,
                  row: row,
                  column: column,
                  board: this.board
              });

              let a = this.checkforantidiagonalwin(row, column);
              let b =this.checkfordiagonalwin(row, column);
              let c =this.checkforverticalwin(row, column);
              let d = this.checkforhorizontalwin(row, column);
              let e = this.checkfordraw();

              if(a || b || c || d){
                  this.gameOver = true;
                  this.winner = this.currentPlayer;

                  this.dispatchgameOver({
                      winner: this.winner,
                      winningCoins: this.winningCoins,
                      isDraw: false,
                  });
                  return true

              } else if(e){
                  this.gameOver = true;
                  this.dispatchgameOver({
                      winner: null,
                      winningCoins: [],
                      isDraw: true,
                  });
                  return true
              }
              this.playerChange();
              coininsert = true;
              return coininsert;
          }
        }
        return coininsert;
    },

    checkforhorizontalwin(row, column){
        const player = this.currentPlayer;
        let count = 1;
        let coins = [{ row: row, column: column }];

        let c = column - 1;
        while (c >= 0 && this.board[row][c] === player) {
            count++;
            coins.unshift({ row: row, column: c });
            c--;
        }

        c = column + 1;
        while (c < this.columns && this.board[row][c] === player) {
            count++;
            coins.push({ row: row, column: c });
            c++;
        }

        if (count >= 4) {
            this.winningCoins = coins;
            return true;
        }

        return false;
    },

    checkforverticalwin(row, column){
        const player = this.currentPlayer;
        let count = 1;
        let coins = [{ row: row, column: column }];

        let r = row + 1;
        while (r < this.rows && this.board[r][column] === player) {
            count++;
            coins.push({ row: r, column: column });
            r++;
        }

        if (count >= 4) {
            this.winningCoins = coins;
            return true;
        }

        return false;
    },

    checkfordiagonalwin(row, column){
        const player = this.currentPlayer;
        let count = 1;
        let coins = [{ row: row, column: column }];

        let r = row - 1;
        let c = column - 1;

        while (r >= 0 && c >= 0 && this.board[r][c] === player) {
            count++;
            coins.unshift({ row: r, column: c });
            r--;
            c--;
        }

        r = row + 1;
        c = column + 1;

        while (r < this.rows && c < this.columns && this.board[r][c] === player) {
            count++;
            coins.push({ row: r, column: c });
            r++;
            c++;
        }

        if (count >= 4) {
            this.winningCoins = coins;
            return true;
        }

        return false;
    },

    checkforantidiagonalwin(row, column){
        const player = this.currentPlayer;
        let count = 1;
        let coins = [{ row: row, column: column }];

        let r = row - 1;
        let c = column + 1;

        while (r >= 0 && c < this.columns && this.board[r][c] === player) {
            count++;
            coins.unshift({ row: r, column: c });
            r--;
            c++;
        }

        r = row + 1;
        c = column - 1;

        while (r < this.rows && c >= 0 && this.board[r][c] === player) {
            count++;
            coins.push({ row: r, column: c });
            r++;
            c--;
        }

        if (count >= 4) {
            this.winningCoins = coins;
            return true;
        }

        return false;
    },

    checkfordraw(){
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (this.board[row][column] === null) {
                    return false;
                }
            }
        }

        return true;
    },

    playerChange(){
        if(this.currentPlayer === "linux"){
            this.currentPlayer = "macos";
        } else {
            this.currentPlayer = "linux";
        }
        this.dispatchPlayerChange();
    },





};