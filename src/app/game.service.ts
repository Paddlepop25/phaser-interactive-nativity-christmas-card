import { Injectable } from "@angular/core";
import { Game } from 'phaser'
import { CardSCene } from "./scenes/card.scene";

@Injectable()

export class GameService {

  created = false // don't want to create game multiple times
  game: Game
  message = ""

  constructor() {}

  // take in width and height
  createGame(width = 800, height = 600) {
    if (this.created) 
      return
    
    // create the game
    this.game = new Game({
      width, height,
      type: Phaser.AUTO, // type of canvas to use
      parent: 'card', // same as <div id='card'>
      scene: [ CardSCene ] //set of game scene. like start view then transition to actual playing
    })
  } 

  // need to dispose game later coz use resources

}