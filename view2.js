const keycodes = {
    39: "right",
    37: "left",
    38: "up",
    40: "down"
}

const getKeyCode = (event) => {
    return keycodes[event.keyCode
    ];
};

class the2048View {
    constructor(game) {
        this.game = game;
        this.tiles = document.querySelectorAll('.grid-items');
        this.score = document.querySelector('#score i');
        this.events();
        this.render();
    }

    // createBoard () {
    //     this.div = document.createElement('div');

    //     let board = document.createElement('board'); // HTML tag

    //     // <div id="grid-item0" class = "grid-items"></div>
    //     for (let r = 0; r <= 12; r += 4) {
    //         let row = document.createElement('row');
    //         for (let j = 0; j < 4; j++) {
    //             let tileview = document.createElement('tile');
    //             // let tile = model.iboard[j];


    //             row.append(tileview);
    //         }
    //         board.append(row);
    //     }

    //     document.querySelector('body').appendChild(board);
    // }

    events() {
        window.addEventListener('keyup', (event) => {
            event.preventDefault();
            let keycode = getKeyCode(event);
            if (keycode == 'up') {
                //event.preventDefault();
                this.game.move("up");
                this.render();
            } else if (keycode == 'right') {
                //event.preventDefault();
                this.game.move("right");
                this.render();
            } else if (keycode == 'left') {
                //event.preventDefault();
                this.game.move("left");
                this.render();
            } else if (keycode == 'down') {
                //event.preventDefault();
                this.game.move("down");
                this.render();
            }
            console.log(keycode);
        });
    }

    clear() {
        this.tiles.forEach(tile => tile.innerHTML = '');
    }

    render() {
        // this.tiles.forEach((item, index) => {
        //     const number = this.game.iboard[index];

        //     if (number != 0) {
        //         item.innerHTML = number;
        //     } else {
        //         item.innerHTML = '';
        //     }

        // });

        // get rid of this if it doesn't work
        for (let i = 0; i < this.tiles.length; i++) {
            let number = this.game.iboard[i];
            if (number != 0) {
                this.tiles[i].innerHTML = number;
            } else {
                this.tiles[i].innerHTML = '';
            }
        }

        this.score.innerHTML = this.game.iscore;
    }
}

export default the2048View;

