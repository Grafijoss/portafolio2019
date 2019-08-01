import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TweenMax, TweenLite } from 'gsap'
import ReactDOM from 'react-dom'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion'

// import * as PIXI from 'pixi.js'
// import { TweenMax } from 'gsap'
// import { connect } from 'react-redux'

class Perfil extends Component {
	/* estado */
	constructor(props) {
		super(props)
		this.state = {
			wrrp: undefined
		}
	}
	/* created */
	componentDidMount (prev_props, prev_state) {
		let _this = this
		this.props.dispatch({
			type: 'OPEN_RIGHT',
			open: true
		})
		this.setState({
			wrrp: ReactDOM.findDOMNode(this.refs.wrrpInfo)
		})
		setTimeout(() => {
			TweenLite.to(_this.state.wrrp, 0.6, { css: {left: '0'}})
		}, 500)
	}
	/* created */
	/* methods */
	back = () => {
		this.props.dispatch({
			type: 'OPEN_RIGHT',
			open: false
		})
		this.props.history.push('/')
	}
	/* methods */
	render() {
		console.log('aqui entro a prueba')
    return (
			<div 
			className="wrrp-info-left"
			ref="wrrpInfo">
				<Container
				bsPrefix="welcome-container container h-100">
					<Row
					bsPrefix="row header-logo">
						<h1 onClick={this.back}>
							Esto es una prueba
						</h1>
					</Row>
				</Container>
			</div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
		aniStep: state.aniStep
  }
}

export default connect(mapStateToProps)(Perfil)