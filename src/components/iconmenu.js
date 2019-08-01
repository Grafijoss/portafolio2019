import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
// import { connect } from 'react-redux'

class IconMenu extends Component {
  /* estado */
  state = {
		pixi_cnt: null,
    container: PIXI.Container,
		thisLoader: new PIXI.loaders.Loader(),
    TextureCache: PIXI.utils.TextureCache,
    Renderer: new PIXI.autoDetectRenderer(100, 100, { transparent: true }),
		StageIcon: new PIXI.Container(),
		Icon: undefined
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
	}
	/* created */
	/* methods */
	updateIconWrrp = (element) => {
    this.pixi_cnt = element
    if(this.pixi_cnt && this.pixi_cnt.children.length<=0) {
       this.pixi_cnt.appendChild(this.state.Renderer.view)
       this.setup()
    }
  }
	setup = () => {
		// console.log(Object.keys(this.state.TextureCache).indexOf(this.props.image))
		console.log(this.props.image)
		console.log(this.state.TextureCache)
		let _that = this
		_that.state.thisLoader
			.add(_that.props.nameImage, _that.props.image)
			.load(_that.initialize)
    // this.state.thisLoader
    //   .add('spriteIcons', this.props.image)
    //   .load(this.initialize)
	}
	initialize = () => {
		// this.fnLoop()
		console.log(this.state.TextureCache)
		this.setState({
			Icon: new PIXI.Sprite(this.frame(this.props.nameImage, ...this.props.prodsImage))
		})
		this.state.StageIcon.addChild(this.state.Icon)
		this.state.Renderer.render(this.state.StageIcon)
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
		// requestAnimationFrame(this.fnLoop)
		// TweenMax.to(this.state.Sprites.faceB.position, 0.6, {x: (this.state.Renderer.width / 2) - (this.state.Sprites.faceB.width / 2), y: (this.state.Renderer.height / 2) - (this.state.Sprites.faceB.height / 2)})
		// this.nextState(this.props.aniStep)
    // this.state.estado()
    // this.state.Renderer.render(this.state.StageFace)
  }
	/* loop */

	/* methods */
	render() {
    return (
      <div 
      ref={this.updateIconWrrp}
      className="icon" />
    )
  }
}


export default IconMenu;