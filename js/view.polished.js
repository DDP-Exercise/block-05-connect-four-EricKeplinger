"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.

//TODO: Show the current player

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.

export const ConnectFourView = {
    winningCoins: [],
    linux: document.getElementById("linux"),
    macos: document.getElementById("macos"),
    controls: document.getElementById("controls"),
    messages: document.getElementById("messages"),
    playfield: document.getElementById("playfield"),

    renderControl(){
        this.controls.innerHTML = "";

        for (let column = 0; column < 7; column++) {
            const button = document.createElement("button");
            button.className = "column-button";
            button.dataset.column = column;
            button.textContent = "↓";

            this.controls.appendChild(button);
        }
    },
    renderBoard(board){
        this.playfield.innerHTML = "";

        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                const circle = document.createElement("div");
                circle.className = "coin";
                circle.dataset.row = row;
                circle.dataset.column = column;

                const value = board[row][column];

                if (value === "linux") {
                    circle.classList.add("linux-coin");
                } else if (value === "macos") {
                    circle.classList.add("macos-coin");
                }

                const isWinningCoin = this.winningCoins.some((coin) => {
                    return coin.row === row && coin.column === column;
                });

                if (isWinningCoin) {
                    circle.classList.add("winning-coin");
                }

                this.playfield.appendChild(circle);
            }
        }
    },

    writeMessages(text){
        this.messages.textContent = text;
    },

    showCurrentPlayer(player){
        this.linux.classList.remove("active-player");
        this.macos.classList.remove("active-player");

        if (player === "linux") {
            this.linux.classList.add("active-player");
            this.writeMessages("Linux's turn!");
        } else if (player === "macos") {
            this.macos.classList.add("active-player");
            this.writeMessages("MacOS's turn!");
        }
    },

    showGameOver(detail){
        if (detail.isDraw) {
            this.winningCoins = [];
            this.writeMessages("Draw! Guess Linux and MacOS are both pretty good.");
            return;
        }

        this.winningCoins = detail.winningCoins;
        this.writeMessages(detail.winner + " is the better OS!");
    },

    bindModelEvents(model){
        document.addEventListener("connectfour:playerchange", (event) => {
            this.showCurrentPlayer(event.detail.currentPlayer);
        });

        document.addEventListener("connectfour:insertCoin", () => {
            this.renderBoard(model.board);
        });

        document.addEventListener("connectfour:gameover", (event) => {
            this.showGameOver(event.detail);
            this.renderBoard(model.board);
        });
    }

};