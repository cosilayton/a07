// const { default: Game } = require("./game");
import Game from "./engine/game.js";
import the2048View from "./view2.js";
import Controller from "./controller.js"

window.addEventListener('load', () => {
    //console.log("hey");
    let model = new Game(4);
    let view = new the2048View(model);
    let controller = new Controller(model, view);

})