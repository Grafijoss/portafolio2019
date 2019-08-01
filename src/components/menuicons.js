import React, { Component } from 'react'
import { TweenMax, TweenLite, Bounce } from 'gsap'
// import {Route} from 'react-router-dom'
// import { Link, NavLink } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
// import icon1 from '../assets/images/ico1.png'
// import icon2 from '../assets/images/ico2.png'
// import icon3 from '../assets/images/ico3.png'
// import IconMenu from './iconmenu'

class Menuicons extends Component {
  /* estado */
  state = {
		buttons: {
			bt1: undefined,
			bt2: undefined,
			bt3: undefined
		},
		routes: {
			perfil: false
		}
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
		const _this = this
		this.setState({
			buttons: {
				bt1: document.getElementById('bt1'),
				bt2: document.getElementById('bt2'),
				bt3: document.getElementById('bt3')
			}
		})
		this.props.dispatch({
			type: 'ANIMATE_STEP',
			step: 0
		})
		setTimeout(() => {
			_this.fnIni1()
		}, 1500)
	}
	/* created */
	/* methods */
	/* bt1 */
	fnIni1 = () => {
		// let bt = document.getElementById('bt1')
		let cover = this.state.buttons.bt1.getElementsByClassName('cover')
		let icon = this.state.buttons.bt1.getElementsByTagName('i')
		TweenLite.to(cover, 0.3, { css: {height: '100%', width: '100%', top: 0, left: 0}, ease: Bounce.easeOut, onComplete: () => {
			this.fnIni2()
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 1
			})
		}})
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4 })
	}
	/* bt1 */
	/* bt2 */
	fnIni2 = () => {
		//let bt = document.getElementById('bt2')
		let cover = this.state.buttons.bt2.getElementsByClassName('cover')
		let icon = this.state.buttons.bt2.getElementsByTagName('i')
		// TweenLite.to(cover, 0.6, { ease: Bounce.easeOut, height: '100%', width: '100%', top: 0, left: 0 })
		TweenLite.to(cover, 0.5, { css: {height: '100%', width: '100%', top: 0, left: 0}, ease: Bounce.easeOut, onComplete: () => {
			this.fnIni3()
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 2
			})
		}})
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4 })
	}
	/* bt2 */
	/* bt3 */
	fnIni3 = () => {
		// let bt = document.getElementById('bt3')
		let cover = this.state.buttons.bt3.getElementsByClassName('cover')
		let icon = this.state.buttons.bt3.getElementsByTagName('i')
		TweenLite.to(cover, 0.5, { css: {height: '100%', width: '100%', top: 0, left: 0}, ease: Bounce.easeOut, onComplete: () => {
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 3
			})
			setTimeout(() => {
				this.props.dispatch({type: 'ANIMATE_STEP', step: 4})
			}, 1000)
		}})
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4 })
	}
	/* bt2 */
	/* Hidden Buttons*/
	hiddenButtons = () => {
		let allButtons = Object.keys(this.state.buttons)
		allButtons.forEach((key) => {
			let cover = this.state.buttons[key].getElementsByClassName('cover')
			let icon = this.state.buttons[key].getElementsByTagName('i')
			TweenLite.to(cover, 0.5, { css: {height: '0', width: '0', top: '50%', left: '50%'}, ease: Bounce.easeOut, onComplete: () => {
				this.state.buttons[key].style.display = 'none'
			}})
			TweenLite.to(icon, 0.3, { css: {opacity: 0}})
		})
	}
	/* Hidden Buttons*/
	/* Open Right */
	openRight = () => {
		this.hiddenButtons()
		this.props.history.push('/perfil')
	}
	/* methods */
  render() {
		// const { from } = { from: { pathname: "/perfil" } }
		// if (this.state.routes.perfil) {
		// 		console.log('si funciona')
		// 		return <Redirect from="/" to="/perfil" />
		// }
    return (
      <div 
      className="menu-icons">
				<button 
				id="bt1"
				className="main-bt"
				onClick={this.openRight}>
					<span className="cover"></span>
					<i className="fas fa-glasses"></i>
				</button>
				<button 
				id="bt2"
				className="main-bt">
					<span className="cover"></span>
					<i className="fas fa-file-code"></i>
				</button>
				<button 
				id="bt3"
				className="main-bt">
					{/* <IconMenu 
					image={icon3} 
					nameImage={'bt3'}
					prodsImage={[200, 0, 100, 100]} /> */}
					<span className="cover"></span>
					<i className="far fa-comment"></i>
				</button>
			</div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
		aniStep: state.aniStep
  }
}

export default connect(mapStateToProps)(Menuicons)