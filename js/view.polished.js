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
    controls: document.getElementById("controls"),
    messages: document.getElementById("messages"),
    playfield: document.getElementById("playfield"),

    rendercontrol(){
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
                circle.className = "cell";
                circle.dataset.row = row;
                circle.dataset.column = column;

                const value = board[row][column];

                if (value === "linux") {
                    circle.classList.add("linux-coin");
                } else if (value === "macos") {
                    circle.classList.add("macos-coin");
                }

                this.playfield.appendChild(circle);
            }
        }
    },

    writeMessages(text){
        this.messages.textContent = text;
    }

};