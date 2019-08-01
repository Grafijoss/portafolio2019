import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
// import PropTypes from 'prop-types'
import sequence  from '../assets/images/sprite.png'

class Face extends Component {
  /* estado */
  state = {
    prueba: 'jghugug ugiugug',
    pixi_cnt: null,
    container: PIXI.Container,
    TextureCache: PIXI.TextureCache,
		Stage: new PIXI.Container(),
		Stage1: new PIXI.Container(),
		Stage2: new PIXI.Container(),
    Renderer: PIXI.autoDetectRenderer(410, 410, { transparent: true }),
    Mouse: {
      x: undefined,
      y: undefined
    },
    Sprites: {
      faceB: null,
      hair: null,
      eyes: null,
      shadow: null,
      glasses: null
    }
  }
  /* estado */
  componentDidMount (prev_props, prev_state) {
    console.log('si funciona')
    const _this = this
    window.onmousemove = function () {
      _this.setState({ 
        Mouse: {
          x: window.event.clientX,
          y: window.event.clientY
        }
      })
    }
  }
  /* methods */
  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element
    //now we are adding the application to the DOM element which we got from the Ref.
    if(this.pixi_cnt && this.pixi_cnt.children.length<=0) {
       this.pixi_cnt.appendChild(this.state.Renderer.view)
       //The setup function is a custom function that we created to add the sprites. We will this below
       this.setup()
    }
  }
  setup = () => {
    PIXI.loader
      .add('sequence', sequence)
      .load(this.initialize)
  }
  initialize = () => {
    //We will create a sprite and then add it to stage and (0,0) position
    // this.faceBack = new PIXI.Sprite(PIXI.loader.resources['faceBack'].texture)

    // faceBackground
    let faceB = new PIXI.Sprite(this.frame(sequence, 0, 0, 408, 408))
    // console.log((this.state.Renderer.width / 2) - (faceB.width / 2))
    faceB.position.x = (this.state.Renderer.width / 2) - (faceB.width / 2)
    faceB.position.y = (this.state.Renderer.height / 2) - (faceB.height / 2)
    this.state.Stage1.addChild(faceB)

    // hair
    let hair = new PIXI.Sprite(this.frame(sequence, 408, 0, 408, 408))
    hair.position.x = (this.state.Renderer.width / 2) - (hair.width / 2)
    hair.position.y = ((this.state.Renderer.height / 2) - (hair.height / 2)) - 40
		this.state.Stage1.addChild(hair)

		// eyes
    let eyes = new PIXI.Sprite(this.frame(sequence, 1224, 0, 408, 408))
    eyes.position.x = (this.state.Renderer.width / 2) - (eyes.width / 2)
    eyes.position.y = ((this.state.Renderer.height / 2) - (eyes.height / 2)) + 40
		this.state.Stage1.addChild(eyes)
		
		// shadow
    let shadow = new PIXI.Sprite(this.frame(sequence, 816, 0, 408, 408))
    shadow.position.x = (this.state.Renderer.width / 2) - (shadow.width / 2)
    shadow.position.y = (this.state.Renderer.height / 2) - (shadow.height / 2)
    this.state.Stage1.addChild(shadow)

    //Circle
    let circle = new PIXI.Graphics()
    circle.beginFill(0x9966FF)
    circle.drawCircle(0, 0, 175)
    circle.endFill()
    // console.log((this.state.Renderer.width / 2) - (circle.width))
    circle.position.x = (this.state.Renderer.width / 2)
    circle.position.y = (this.state.Renderer.height / 2)
    this.state.Stage1.addChild(circle)

		this.state.Stage1.mask = circle
		// this.state.Renderer.render(this.state.Stage)

		// glasses
    this.state.Sprites.glasses = new PIXI.Sprite(this.frame(sequence, 1632, 0, 408, 408))
    this.state.Sprites.glasses.position.x = (this.state.Renderer.width / 2) - (this.state.Sprites.glasses.width / 2)
    this.state.Sprites.glasses.position.y = (this.state.Renderer.height / 2) - (this.state.Sprites.glasses.height / 2)
    this.state.Sprites.glasses.vx = 0
    this.state.Sprites.glasses.vy = 0
    this.state.Stage2.addChild(this.state.Sprites.glasses)

		this.state.Stage.addChild(this.state.Stage1)
		this.state.Stage.addChild(this.state.Stage2)

    this.state.Renderer.render(this.state.Stage)
    
    // this.loop()
		

  }
  frame = (origin,x,y,w,h) => {
    let texture = null
    let imageFrame = null
    if (typeof origin === 'string') {
      if (this.state.TextureCache[origin]) {
        texture = new PIXI.Texture(this.state.TextureCache[origin])
      }
    } else if (origin instanceof PIXI.Texture) {
      texture = new PIXI.Texture(origin)
    }
    if (!texture) {
      // console.log('La textura no existe')
    } else {
      // console.log('Todo bien')
      imageFrame = new PIXI.Rectangle(x, y, w, h)
      texture.frame = imageFrame
      return texture
    }
  }

  teclado = (keyCode) => {
    var key = {}
    key.code = keyCode
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined
        
    //Funcion que responde al evento keydown
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
      }
      event.preventDefault()
    }

    //Funcion que responde al evento keyup
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
      }
      event.preventDefault()
    }
    window.addEventListener("keydown", key.downHandler.bind(key), false)
    window.addEventListener("keyup", key.upHandler.bind(key), false)
    //Return the `key` object
    return key
  } 

  /* loop */
  // loop = () => {
  //   requestAnimationFrame(this.loop)
  //   this.state.Sprites.glasses.vx = 1
  //   this.state.Sprites.glasses.vy = 1
  //   this.state.Sprites.glasses.x += this.state.Sprites.glasses.vx
  //   this.state.Renderer.render(this.state.Stage)
  // }
  /* loop */
  /* methods */
  render() {
    return (
      <div 
      ref={this.updatePixiCnt}
      className="my-face" />
    )
  }
}


export default Face