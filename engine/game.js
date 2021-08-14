

//  let gameState = {
//      board: [],
//      score: 0,
//      won: false,
//      over: false
//  }




export default class Game {
    
    constructor(dimension) {
        let board = [];
        this.moves = [];
        this.wonevents = [];
        this.loseevents = [];


        this.dimension = dimension;


        this.iboard = [];
        
        for (let k = 0; k < this.dimension * this.dimension; k++) {
            this.iboard.push(0);
        }

        // resets game back to a random starting position (must have 2 tiles on the board)

        

        // generate 2 random tile positions
        let tile1position = this.generateRandomTilePosition(this.dimension*this.dimension);
        //console.log("tile 1 position is " + tile1position);
        let thetile1value = this.generateValuesOfInitialTile();
        //console.log("tile 1 value:" + thetile1value);
        this.iboard[tile1position] = thetile1value;
        // let tile2position = this.generateRandomTilePosition(this.dimension*this.dimension);
        let tile2position = this.generateRandomPositionFromAvailableSpots(this.iboard);
        //console.log("tile 2 position is " + tile2position);
        // generate whehter the tiles will be 2 or 4
        
        let thetile2value = this.generateValuesOfInitialTile();
        //console.log("tile 2 value:" + thetile2value);

        // add them to the board 
        
        this.iboard[tile2position] = thetile2value;

        //console.log(this.iboard);

        this.iscore = 0;
        this.iwon = false;
        this.iover = false;
        

            
    }

    setupNewGame() {

        this.iboard = [];



        for (let k = 0; k < this.dimension * this.dimension; k++) {
            this.iboard.push(0);
        }

        // generate 2 random tile positions
        let tile1position = this.generateRandomTilePosition(this.dimension*this.dimension);
        //console.log("tile 1 position is " + tile1position);
        let thetile1value = this.generateValuesOfInitialTile();
        //console.log("tile 1 value:" + thetile1value);
        this.iboard[tile1position] = thetile1value;
        // let tile2position = this.generateRandomTilePosition(this.dimension*this.dimension);
        let tile2position = this.generateRandomPositionFromAvailableSpots(this.iboard);
        //console.log("tile 2 position is " + tile2position);
        // generate whehter the tiles will be 2 or 4
        
        let thetile2value = this.generateValuesOfInitialTile();
        //console.log("tile 2 value:" + thetile2value);

        // add them to the board 
        
        this.iboard[tile2position] = thetile2value;

        this.iscore = 0;
        this.iwon = false;
        this.iover = false;
        
    }

    generateValuesOfInitialTile() {
        let tilevalue = 0;
        let value = Math.floor(Math.random()*10) + 1;

        if (value == 1) {
            tilevalue = 4;
        } else {
            tilevalue = 2;
        }
        return tilevalue;


    }

    generateRandomTilePosition(max) {
        //console.log("max is " + max);
        let position = Math.floor(Math.random() * Math.floor(max));
        // while (this.iboard[position] != 0) {
        //     // call it again 
        //     console.log("calling it again");
        //     this.generateRandomTilePosition(max);
        // }
        // console.log(position);
        return position;
    }

    generateRandomPositionFromAvailableSpots(boardtobechecked) {
        //console.log("FINDING AVAILABLE SPOTS FOR NEXT RANDOM TILE TO BE ADDED TO BOARD")
        // gather the available positions
        // put them into an array and make their value their index in the board
        // then pick one at random and assign it
        let availablespots = [];
        for (let i = 0; i < this.dimension*this.dimension; i++) {
            if (boardtobechecked[i] == 0) {
                availablespots.push(i);  // so now each entry in available spots has the index of the available spot on the board
            }
        }
        //console.log("The selection of available spots are: " + availablespots);
        //console.log(availablespots);

        let randomindex = availablespots[Math.floor(Math.random() * availablespots.length)];
        
        return randomindex;
    }

    // seeIfSpotIsAvailable(position) {
    //     if (this.iboard[position] == 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }

    loadGame(gameState) {
        // given a game state object it loads that board and score, etc
        this.iboard = gameState.board;
        this.iscore = gameState.score;
        this.iwon = gameState.won;
        this.iover = gameState.over;

    }

    move(direction) {
        // given string ups, down, right, left it makes the appropriate shift and adds a random tile
        this.direction = direction;
        if (this.won == true || this.over == true) {
            // can't move because it's over
            return; 
        }

        // have to see what's around the tile and if any combinations happen 
        if (direction == "up") {
            
                // a move can be made
                // traverse in the direction in column upwards until you reach a tile w the same value 
                // or if there's an open spot

                // if no combinations, then jsut goes to first openn spot
                // add a random tile by calling on functions

                // this.board[0].map((col, i) => this.board.map(row => row[i]))


                // You need to transpose the the board (can look this up) so that you can analyze 
                // the columns instead of rows. There is more than one way to do this but basically 
                // we are just checking all the columns. Same idea again, go through every column and 
                // combineTiles like we did above. 


                // tranpose the board
                let transposedboard = [];
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        transposedboard[this.dimension * i + j] = this.iboard[this.dimension * j + i];
                    }
                }

                //console.log("the transposed board is: " + transposedboard);

                // combine
                for (let i = 0; i <= this.dimension * (this.dimension - 1); i+=this.dimension) {
                    //console.log("*****Row number: " + i);
                    let currentrow = [];
                    for (let j = i; j < i+this.dimension; j++) {
                        currentrow.push(transposedboard[j]);
                    }
                    //console.log("The row before combining" + currentrow);
                    //let reverse = currentrow.reverse();
                    // console.log("The reversed row before combinining which is the row you need to combine: " + reverse);
                    let thenewrow = this.combineTilespart2(currentrow, this);
                    //console.log("The row after combining " + thenewrow);
                    //let reversednewrow = thenewrow.reverse(); MAY NEED TO BRING THIS BACK

                    // for (let n = i; n < i+this.dimension; n++) {
                    //     for (let m = 0; m < this.dimension; m++) {
                    //         transposedboard[n] = thenewrow[m];
                    //     }
                    // }
                    let m = 0;
                    let x = i;
                    while (m < this.dimension) {
                        transposedboard[x] = thenewrow[m];  // change back to reversednewrow if this goes badly
                        x++;
                        m++;
                    }

                    //console.log("the transposed board after 1 row is " + transposedboard);
                    //console.log("Should go to next for loop index");
                }

                //console.log("out of the for loop, should now add tiles");

                // add tiles
                let value = this.generateValuesOfInitialTile(); 
                //console.log("new value to be added to the board is: " + value);
                let position = this.generateRandomPositionFromAvailableSpots(transposedboard);
                //console.log("the position of the new value is " + position);
                transposedboard[position] = value;

                // tranpose back
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        this.iboard[this.dimension * i + j] = transposedboard[this.dimension * j + i];
                    }
                }

                
                

             
                
            
            
        }

        if (direction == "down") {
            
                // a move can be made
                // traverse in the direction in column upwards until you reach a tile w the same value 
                // or if there's an open spot

                // if no combinations, then jsut goes to first openn spot
                // add a random tile by calling on functions

                // this.board[0].map((col, i) => this.board.map(row => row[i]))


                // You need to transpose the the board (can look this up) so that you can analyze 
                // the columns instead of rows. There is more than one way to do this but basically 
                // we are just checking all the columns. Same idea again, go through every column and 
                // combineTiles like we did above. 


                // tranpose the board
                let transposedboard = [];
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        transposedboard[this.dimension * i + j] = this.iboard[this.dimension * j + i];
                    }
                }

                //console.log("the transposed board is: " + transposedboard);

                // combine
                for (let i = 0; i <= this.dimension * (this.dimension - 1); i+=this.dimension) {
                    //console.log("*****Row number: " + i);
                    let currentrow = [];
                    for (let j = i; j < i+this.dimension; j++) {
                        currentrow.push(transposedboard[j]);
                    }
                    //console.log("The row before combining" + currentrow);
                    let reverse = currentrow.reverse();   // comment out if it doesn't work
                    //console.log("The reversed row before combinining which is the row you need to combine: " + reverse);
                    let thenewrow = this.combineTilespart2(reverse, this);   // change back to currentrow if it doesn't work
                    //console.log("The row after combining " + thenewrow);
                    let newrow = thenewrow.reverse();

                    // for (let n = i; n < i+this.dimension; n++) {
                    //     for (let m = 0; m < this.dimension; m++) {
                    //         transposedboard[n] = thenewrow[m];
                    //     }
                    // }
                    let m = 0;
                    let x = i;
                    while (m < this.dimension) {
                        transposedboard[x] = newrow[m];  
                        x++;
                        m++;
                    }

                    //console.log("the transposed board after 1 row is " + transposedboard);
                    //console.log("Should go to next for loop index");
                }

                //console.log("out of the for loop, should now add tiles");

                // add tiles
                let value = this.generateValuesOfInitialTile(); 
                //console.log("new value to be added to the board is: " + value);
                let position = this.generateRandomPositionFromAvailableSpots(transposedboard);
                //console.log("the position of the new value is " + position);
                transposedboard[position] = value;

                // tranpose back
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        this.iboard[this.dimension * i + j] = transposedboard[this.dimension * j + i];
                    }
                }

             

            
            

        } 


        if (direction == "right") {

            // pull out the rows
            // combine every single row usinng the combinetiles method 

            
                let currentrow = [];
                for (let i = 0; i <= this.dimension * (this.dimension - 1) + 1; i+=this.dimension) {
                    currentrow = [];
                    for (let j = i; j < i+this.dimension; j++) {
                        currentrow.push(this.iboard[j])
                    }
                    //console.log("The row before combining" + currentrow);
                    let reverse = currentrow.reverse();
                    let thenewrow = this.combineTilespart2(reverse, this);
                    let newrow = thenewrow.reverse();
                    //console.log("The row after combining " + thenewrow);

                    // for (let n = i; n < i+this.dimension; n++) {
                    //     for (let m = 0; m < this.dimension; m++) {
                    //         this.iboard[n] = thenewrow[m];
                    //     }
                    // }
                    let m = 0;
                    let x = i;
                    while (m < this.dimension) {
                        this.iboard[x] = newrow[m];  // change back to thenewrow
                        x++;
                        m++;
                    }

                }

                let value = this.generateValuesOfInitialTile();
                let position = this.generateRandomPositionFromAvailableSpots(this.iboard);
                //console.log("the random position chosen is " + position);
                this.iboard[position] = value;
            
            
        }

        if (direction == "left") {
            
                for (let i = 0; i < this.dimension * (this.dimension - 1) + 1; i+=this.dimension) {
                    let currentrow = [];
                    for (let j = i; j < i+this.dimension; j++) {
                        currentrow.push(this.iboard[j]);
                    }
                    // console.log("The row before combining" + currentrow);
                    //let reverse = currentrow.reverse();
                    let thenewrow = this.combineTilespart2(currentrow, this);
                    
                    // let reversednewrow = thenewrow.reverse();
                    // console.log("The row after combining " + thenewrow);
;
                    // for (let n = i; n < i+this.dimension; n++) {
                    //     for (let m = 0; m < this.dimension; m++) {
                    //         this.iboard[n] = thenewrow[m];
                    //     }
                    // }
                    let m = 0;
                    let x = i;
                    while (m < this.dimension) {
                        this.iboard[x] = thenewrow[m];  // change back to reversednewrow if doesn't work
                        x++;
                        m++;
                    }

                }

                let value = this.generateValuesOfInitialTile();
                //console.log("value to be added is " + value);
                let position = this.generateRandomPositionFromAvailableSpots(this.iboard);
                //console.log("the random position chosen is " + position);
                this.iboard[position] = value;
            
            

        }

        for (let i = 0; i < this.moves.length; i++) {
            this.moves[i](this.getGameState());
        }

        // if won, then call the win callback array 
        if (this.thegameiswon() == true) {
            this.iwon = true;
            for (let i = 0; i < this.wonevents.length; i++) {
                this.wonevents[i](this.getGameState());
            }
        }

        if (this.thegameislost() == true) {
            this.iover = true;
            for (let i = 0; i < this.loseevents.length; i++) {
                this.loseevents[i](this.getGameState());
            }
        }

        //let state = this.overallMovesPossible();

        // let state2 = this.generateRandomPositionFromAvailableSpots(this.iboard);
        // let state3 = false;
        // if (state2.length == 0) {
        //     state3 = false;
        // } else {
        //     state3 = true;
        // }
        // console.log("There are more moves to make " + state3);


        // if over, then call lose callback array

    }

    // generateRandomPositionFromAvailableSpots() {
    //     // gather the available positions
    //     // put them into an array and make their value their index in the board
    //     // then pick one at random and assign it
    //     let availablespots = [];
    //     for (let i = 0; i < this.dimension*this.dimension; i++) {
    //         if (this.iboard[i] == 0) {
    //             availablespots.push(i);  // so now each entry in available spots has the index of the available spot on the board
    //         }
    //     }

    //     let randomindex = availablespots[Math.floor(Math.random() * availablespots.length)];
        
    //     return randomindex;
    // }

    toString() {
        // returns a text/ascii version of the game board
        
        let tempboard = [];
        // this.dimension = dimension;
        //let board = [];
        //console.log(this.dimension);
        //console.log(this.iboard);
        for (let k = 0; k < this.dimension; k++) {
            let cellrow = [];
            for (let j = 0; j < this.dimension; j++) {
                // console.log("Dimension is" + this.dimension);
                // console.log("K is " + k);
                // console.log("J is" + j);
                // console.log(this.dimension*k + j);
                cellrow.push(this.iboard[this.dimension * k + j]);
            }
            tempboard.push(cellrow);
        }
        let nnewboard = tempboard.join("\n");
        return nnewboard;

    }

    onMove(callback) {
        // callback function as an input and registers that function as a listener to the move event
        // everytime a move is made the game should call all previously regstered move callbacks, passing in the
        // current game's gameState as an argument to the function

        this.moves.push(callback);

    }

    onWin(callback) {
        // Takes a callback function as input and registers that function as a listener to the win event
        // When the player wins the game (by making a 2048 tile), the game should call all previously 
        // registered win callbacks, passing in the game's current gameState as an argument to the function

        this.wonevents.push(callback);


    }

    thegameiswon() {
        // if (this.iscore == 2048) {
        //     this.iwon = true;
        //     return true;
        // } else {
        //     return false;
        // }
        // use includes to go through this.iboard has value 2048
        if (this.iboard.includes(2048) == true) {
            return true;
        } else {
            return false;
        }
    }

    thegameislost() {
        // if (this.overallMovesPossible(this.iboard, this.dimension) == false && this.iscore != 2048) {
        //     this.iover = true;
        //     return true;
        // } else {
        //     return false;
        // }

        let array = this.availableSpots(this.iboard);

        if (array.length != 0) {
            // array length has stuff in it so the game can keep playing
            return false;
        } else {
            // array length is 0 so there are no available moves so need to check for combos
            if (this.overallMovesPossible() == false) {
                return true;
            } else {
                return false;
            }
        }
        
    }

    availableSpots(boardtobechecked) {
        let availablespots = [];
        for (let i = 0; i < this.dimension*this.dimension; i++) {
            if (boardtobechecked[i] == 0) {
                availablespots.push(i);  // so now each entry in available spots has the index of the available spot on the board
            }
        }
        return availablespots;
    }
    

    onLose(callback) {
        // Takes a callback function as input and registers that function as a listener to the move event. 
        // When the game transitions into a state where no more valid moves can be made, the game should 
        // call all previously registered lose callbacks, passing in the game's current gameState as an 
        // argument to the function

        this.loseevents.push(callback);
    }

    get gameState() {

        return {
            board: [...this.iboard],
            score: this.iscore,
            won: this.iwon,
            over: this.iover
        }
    };

    getGameState() {
        // Returns a accurate gameState object representing the current game state

        // let currentGame = new gameState();
        // currentGame.board = board;
        // currentGame.score = score;
        // currentGame.won = won;
        // currentGame.over = over;
        // return currentGame;


        // return this.gameState;
        return {
            board: [...this.iboard],
            score: this.iscore,
            won: this.iwon,
            over: this.iover
        }
}


    // make a combineTiles method

    combineTitles(tile1, tile2) {
        // tile 2 represents the "next" tile, the further one is the one you would replace the combined value with
        if (this.iboard[tile1] == this.iboard[title2]) {
            let newvalue = this.iboard[title2] * 2;
            this.iboard[tile2] = newvalue;

            // then remove tile 1
            this.iboard[tile1] = 0;
        }
    }


    // make a isPossible method (checks if a single cell can move)
    // Move_Possible: This should be a boolean that tells you if 
    // you can actually move things. You can move stuff if they have the 
    // same value OR if there is open space so account for both of these
    movePossible(row_col) {


        for (let i = 0; i < this.dimension; i++) {
            let j = i+1; 
            if (row_col[i] == row_col[j]) {  // maybe add condition row_col[i] = 0
                return true;
            } 

            if (row_col[i] != row_col[j] && j == this.dimension - 1) {
                return false;
            }
        }

        return false;
    }


    // make a areCellsMovable method (checks if any of the cells on the grid can move)

    // This should tell you if anything can be moved on the board at all. 
    // it pretty much validates if the game is over or can continue. 
    // You can't move in a certain direction if none of the tiles can move or combine. 
    // If you can't move or combine in anything directions the game is over!
    overallMovesPossible() {
        let rowofrows = [];
        let colofcols = [];

        // slicing into rows
        for (let i = 0; i <= this.dimension * (this.dimension - 1); i+=this.dimension) {
            let currentrow = [];
            for (let j = i; j < i+this.dimension; j++) {
                currentrow.push(this.iboard[j]);
            }
            rowofrows.push(currentrow);

        }

        // slicing into columns
        for (let i = 0; i < this.dimension; i++) {
            let currentcol = [];
            for (let j = i; j <= i+this.dimension*(this.dimension-1); j+=this.dimension) {
                currentcol.push(this.iboard[j]);
            }
            colofcols.push(currentcol);

        }

        // go through row of rows and call movePossible
        for (let k = 0; k < rowofrows.length; k++) {
            if (this.movePossible(rowofrows[k]) == true) {
                return true;
            } 
        }

        for (let j = 0; j < colofcols.length; j++) {
            if (this.movePossible(colofcols[j]) == true) {
                return true;
            } 
        }
        return false;

        

    }

    combineTilespart2(row_col, instance) {

        let finallist = [];
    
        let editedrow_col = [];
        for (let i = 0; i < this.dimension; i++) {
            // remove the 0s
            if (row_col[i] != 0) {
                editedrow_col.push(row_col[i]);
            }
    
        }
    
        for (let j = 0; j < editedrow_col.length; j++) {
            let currenttile = editedrow_col[j];
            if (editedrow_col[j+1] == currenttile) {
                finallist.push(currenttile*2);
                instance.iscore += currenttile*2;
                if (currenttile * 2 == 2048) {
                    instance.iwon = true;
                }
                j++;
            } else {
                finallist.push(currenttile);
            }
        }
    
        // number of zeroes that need to be added to the end of the final list
        let zeroes = this.dimension - finallist.length;
    
        for (let k = 0; k < zeroes; k++) {
            finallist.push(0);
        }   
    
        return finallist;
    };




}




