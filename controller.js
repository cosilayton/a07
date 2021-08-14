

export default class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.events();
    }

    events() {
        // when restart button pressed
        let button = document.querySelector(".reset");
        button.addEventListener("click", (event) => {
            // event.preventDefault();
            this.model.setupNewGame();
            this.view.render();
            // updateBoard(game.getGameState());
            //console.log("you pressed set up");
        });

    }

}





