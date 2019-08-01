import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
// import PixiPlugin from 'gsap/PixiPlugin'
// import PropTypes from 'prop-types'
// https://github.com/inlet/react-pixi
import sequence  from '../assets/images/sprite.png'
import { connect } from 'react-redux'

class Face extends Component {
  /* estado */
  state = {
    pixi_cnt: null,
    container: PIXI.Container,
    TextureCache: PIXI.utils.TextureCache,
    Renderer: PIXI.autoDetectRenderer(450, 450, { transparent: true }),
    Mouse: {
      x: undefined,
			y: undefined,
			xeye: undefined,
			yeye: undefined,
			xhair: undefined,
      yhair: undefined
    },
    flicker1: undefined,
    flicker2: undefined,
    flicker: 0,
    moveMouse: false,
		estado: undefined,
		Sprites: {
			faceB: null,
			hair: null,
			eyes: null,
			shadow: null,
			glasses: null
		},
		StageFace: new PIXI.Container(),
		StageFace1: new PIXI.Container(),
		StageFace2: new PIXI.Container()
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
		// console.log(this.props)
		console.log(this.props.pixiLoader)
		document.captureEvents(Event.MOUSEMOVE)
    document.onmousemove = this.getMouseXY
	}
	/* created */
	/* methods */
	getMouseXY = (e) => {
		let _this = this
		let tempX = e.pageX
		let tempY = e.pageY  
		if (tempX < 0) {tempX = 0}
		if (tempY < 0) {tempY = 0} 
		_this.setState({
			Mouse: {
				x: 10 + tempX / document.body.scrollWidth * 30,
				y: tempY / document.body.scrollHeight * 100,
				xeye: tempX / document.body.scrollWidth * 60,
				yeye: tempY / document.body.scrollHeight * 120,
				xhair: tempX / document.body.scrollWidth * 20,
				yhair: tempY / document.body.scrollHeight * 50
			}
    })
		return true
	}
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

    // eyes
    this.setState({
      flicker1: this.frame(sequence, 816, 0, 408, 408),
      flicker2: this.frame(sequence, 1224, 0, 408, 408),
    })
		
    //Circle
    let circleMask = new PIXI.Graphics()
    circleMask.beginFill(0x9966FF)
    circleMask.drawCircle(0, 0, 175)
    circleMask.endFill()
    circleMask.position.x = (this.state.Renderer.width / 2)
    circleMask.position.y = (this.state.Renderer.height / 2)


		this.setState({
			Sprites: {
				faceB: new PIXI.Sprite(this.frame(sequence, 0, 0, 408, 408)),
				hair: new PIXI.Sprite(this.frame(sequence, 408, 0, 408, 408)),
				eyes: new PIXI.Sprite(this.frame(sequence, 1224, 0, 408, 408)),
				glasses: new PIXI.Sprite(this.frame(sequence, 1632, 0, 408, 408))
			}
		})
		// this.state.Sprites.eyes = new PIXI.Sprite(this.frame(sequence, 1224, 0, 408, 408))
		// this.state.StageFace1.addChild(this.state.Sprites.eyes)

		this.state.StageFace1.addChild(this.state.Sprites.faceB)
		this.state.StageFace1.addChild(this.state.Sprites.hair)
		this.state.StageFace1.addChild(this.state.Sprites.eyes)
		this.state.StageFace1.addChild(circleMask)
		this.state.StageFace1.mask = circleMask
		this.state.StageFace2.addChild(this.state.Sprites.glasses)

		this.state.StageFace.addChild(this.state.StageFace1)
		this.state.StageFace.addChild(this.state.StageFace2)

		this.state.Renderer.render(this.state.StageFace)
		
		// this.setState({ estado: this.fnIni1 })
    this.fnLoop()
		
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

  /* loop */
  fnLoop = () => {
		requestAnimationFrame(this.fnLoop)
		TweenMax.to(this.state.Sprites.faceB.position, 0.6, {x: (this.state.Renderer.width / 2) - (this.state.Sprites.faceB.width / 2), y: (this.state.Renderer.height / 2) - (this.state.Sprites.faceB.height / 2)})
		this.nextState(this.props.aniStep)
    this.state.estado()
    this.state.Renderer.render(this.state.StageFace)
  }
  /* loop */
  /* loop1 */
  nextState = (current) => {
    switch (current) {
			case 0:
        this.setState({ estado: this.fnIni1 })
        break
      case 1:
        this.setState({ estado: this.fnIni2 })
        break
      case 2:
        this.setState({ estado: this.fnIni3 })
				break
      default:
        this.setState({ estado: this.fnLoopMouse })
        break
    }
  }
  fnIni1 = () => {
    let centerX = (this.state.Renderer.width / 2) - (this.state.Sprites.glasses.width / 2)
    let centerY = (this.state.Renderer.height / 2) - (this.state.Sprites.glasses.height / 2)
    TweenMax.to(this.state.Sprites.glasses.position, 0.6, {x:centerX - 20, y:centerY - 20})
    TweenMax.to(this.state.Sprites.eyes.position, 0.5, {x:centerX - 30, y:centerY - 40})
    TweenMax.to(this.state.Sprites.hair.position, 0.6, {x:centerX - 30, y:centerY - 70})
    if ( Math.round(this.state.Sprites.eyes.position.y) === (centerY - 40)) {
			// this.nextState(1)
		}
  }
  fnIni2 = () => {
    let centerX = (this.state.Renderer.width / 2) - (this.state.Sprites.glasses.width / 2)
    let centerY = (this.state.Renderer.height / 2) - (this.state.Sprites.glasses.height / 2)
    TweenMax.to(this.state.Sprites.glasses.position, 0.6, {x:centerX + 20, y:centerY - 20})
    TweenMax.to(this.state.Sprites.eyes.position, 0.5, {x:centerX + 30, y:centerY - 40})
    TweenMax.to(this.state.Sprites.hair.position, 0.6, {x:centerX + 30, y:centerY - 70})
    if ( Math.round(this.state.Sprites.eyes.position.x) === (centerX + 30)) {
			// this.nextState(2)
		}
  }
  fnIni3 = () => {
    let centerX = (this.state.Renderer.width / 2) - (this.state.Sprites.glasses.width / 2)
    let centerY = (this.state.Renderer.height / 2) - (this.state.Sprites.glasses.height / 2)
    TweenMax.to(this.state.Sprites.glasses.position, 0.6, {x:centerX, y:centerY + 50})
    TweenMax.to(this.state.Sprites.eyes.position, 0.5, {x:centerX, y:centerY + 60})
    TweenMax.to(this.state.Sprites.hair.position, 0.6, {x:centerX, y:centerY - 20})
    if ( Math.round(this.state.Sprites.eyes.position.y) === (centerY + 60)) {
			// this.nextState()
		}
  }
  fnLoopMouse = () => {
    this.setState({ flicker: this.state.flicker + 1 })
    if (this.state.flicker === 150) {
			this.state.Sprites.eyes.texture = this.state.flicker1
    }
    if (this.state.flicker === 155) {
      this.setState({ flicker: 0 })
      this.state.Sprites.eyes.texture = this.state.flicker2
    }
    if (this.state.Mouse.x) TweenMax.to(this.state.Sprites.glasses.position, 0.5, {x:this.state.Mouse.x, y:this.state.Mouse.y})
    if (this.state.Mouse.xeye) TweenMax.to(this.state.Sprites.eyes.position, 0.3, {x:this.state.Mouse.xeye, y:this.state.Mouse.yeye - 20})
    if (this.state.Mouse.xhair) TweenMax.to(this.state.Sprites.hair.position, 0.5, {x:this.state.Mouse.xhair, y:this.state.Mouse.yhair - 50})
  }
  /* loop1 */
  /* methods */
  render() {
    return (
      <div 
      ref={this.updatePixiCnt}
      className="my-face" />
    )
  }
}

function mapStateToProps(state, props) {
  return {
		aniStep: state.aniStep
  }
}

export default connect(mapStateToProps)(Face)