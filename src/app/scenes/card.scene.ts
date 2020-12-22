import { GameObjects, Scene } from 'phaser'
import { ANIMS_BONFIRE, AUDIO_AWAY_IN_A_MANGER, Globals, IMG_ANGEL_GABRIEL, IMG_ANGEL_GABRIEL_BW, IMG_BABY_JESUS, IMG_BACKGROUND, IMG_BONFIRE, IMG_DONKEY, IMG_JOSEPH, IMG_MARY, IMG_MERRY_CHRISTMAS, IMG_THREE_WISE_MEN, SCENE_CARD } from '../constants'
import { GameService } from '../game.service'
import { ScreenMapper } from './screen-mapper'

export class CardSCene extends Scene {

  private gabrielBW: GameObjects.Image
  private gameSvc: GameService

  constructor () {
    super(SCENE_CARD)

    //lookup GameService
    this.gameSvc = Globals.injector.get(GameService)
    console.info('>>> message: ', this.gameSvc)
  }

    // every scene will have 3 phases

    // load resource like image
    preload() {
      // load background
      this.load.image(IMG_BACKGROUND, 'assets/background.png') // takes in key and path
      this.load.image(IMG_DONKEY, 'assets/donkey.png') // takes in key and path
      this.load.image(IMG_BABY_JESUS, 'assets/baby_jesus.png') // takes in key and path
      this.load.image(IMG_THREE_WISE_MEN, 'assets/three_wise_men.png') // takes in key and path
      this.load.image(IMG_JOSEPH, 'assets/joseph.png') // takes in key and path
      this.load.image(IMG_MARY, 'assets/mary.png') // takes in key and path
      this.load.image(IMG_ANGEL_GABRIEL_BW, 'assets/angel_gabriel_bw.png') // takes in key and path
      this.load.image(IMG_ANGEL_GABRIEL, 'assets/angel_gabriel.png') // takes in key and path
      this.load.image(IMG_MERRY_CHRISTMAS, 'assets/merry_christmas.png') // takes in key and path
      
      this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', 
      {frameWidth: 230, frameHeight: 312}) // gets 12 images (for the animation)

      // takes in key and array, specific multiple versions of song
      this.load.audio(AUDIO_AWAY_IN_A_MANGER, [
        'assets/audio/away_in_a_manger.mp3',
        'assets/audio/away_in_a_manger.ogg'
      ]) 
    }
    
    // create game objects like alot of bad guys, etc
    create() {
      const mapper = new ScreenMapper({
        scene: this,
        columns: 11, rows: 11
      })

      // takes calculation from screen-mapper.ts
      let img = mapper.placeImageAt(5, 5, IMG_BACKGROUND, 
        { scaleToWidth: 0.85 })


      // mapper.drawGrids() // the red lines

      mapper.placeImageAt(5, 8, IMG_BABY_JESUS, {scaleX: .3, scaleY: .3})
      mapper.placeImageAt(7.5, 7, IMG_THREE_WISE_MEN, {scaleX: .7, scaleY: .7})
      img = mapper.placeImageAt(3, 7, IMG_JOSEPH, {scaleX: .6, scaleY: .6})
      img.x += 20 // make minor adjustments for placement
      img = mapper.placeImageAt(3, 8, IMG_MARY, {scaleX: .4, scaleY: .4})
      img.x -= 30 // make minor adjustments for placement
      img = mapper.placeImageAt(8, 1.5, IMG_MERRY_CHRISTMAS, {scaleX: .5, scaleY: .5})
      img.rotation = Phaser.Math.DegToRad(10)

      this.anims.create({
        key: ANIMS_BONFIRE, 
        frames: this.anims.generateFrameNumbers(IMG_BONFIRE, { start: 0 }),
        frameRate: 10, // how many frames per sec
        repeat: -1 
      })

      let sprite = mapper.placeSpriteAt(4.2, 8, IMG_BONFIRE, {scaleToWidth: .15})

      // miss out the code to play the animation
      sprite.play(ANIMS_BONFIRE)

      img = mapper.placeImageAt(1, 2, IMG_ANGEL_GABRIEL, {scaleToWidth: .2})
      img.rotation = Phaser.Math.DegToRad(20)

      this.gabrielBW = mapper.placeImageAt(1.1, 2.1, IMG_ANGEL_GABRIEL_BW, {scaleToWidth: .2})
      this.gabrielBW.rotation = Phaser.Math.DegToRad(20)
      this.gabrielBW.setInteractive()
      // for angel to transition
      this.gabrielBW.on('pointerover', () => {
        this.add.tween({ 
          targets: this.gabrielBW, 
          duration: 500, // in millisec
          // attributes - can be size, position, etc
          alpha: 0,
          rotation: Phaser.Math.DegToRad(0)
        })
      })
      this.gabrielBW.on('pointerout', () => {
        this.add.tween({
          targets: this.gabrielBW, 
          duration: 500, // in millisec
          // attributes - can be size, position, etc
          alpha: 1,
          rotation: Phaser.Math.DegToRad(20)
        })
      })

      let text = mapper.placeTextAt(0, 8.5, this.gameSvc.message)
      text.x -= 20

      const music = this.sound.add(AUDIO_AWAY_IN_A_MANGER,
        { volume: .6, loop: true })

        music.play()
    }

    // game loop
    // rendering process
    // if your update is long will take longer to load
    // like update 60 frames per second
    update() {

    }


}