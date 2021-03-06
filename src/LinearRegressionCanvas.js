import React, { Component } from "react"
import ReactDOM from "react-dom"

import "./App.css"
import LinearRegression from "./ML/LinearRegression"

class LinearRegressionCanvas extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			mousePos: {x: 0, y: 0},
			dataSet: {x: [], y: []},
			line: {x1: 0, y1: 0, x2: 0, y2: 0},
			linearRegression: {slope: 0, intercept: 0}
		}
		
		this.getCoordinates = this.getCoordinates.bind(this)
		this.drawCircle = this.drawCircle.bind(this)
	}
	
	getCoordinates(e) {
		// abs. size of element
		const rect = ReactDOM.findDOMNode(this.refs["UniqueElementIdentifier"])
			.getBoundingClientRect()
		const
			scaleX
				// relationship bitmap vs. element for X
				= 500 / rect.width,
			scaleY
				// relationship
				= 500 / rect.height
		
		// get mouse x and adjust for el.
		const x = (e.clientX - rect.left) * scaleX
		// get mouse y and adjust for el.
		const y = Math.floor((e.clientY - rect.top) * scaleY)
		const mousePos = {x: x, y: y}
		this.setState({mousePos})
	}
	
	drawLine() {
		const {dataSet} = this.state
		const lr = LinearRegression(dataSet)
		this.setState({
			line: {x1: 0, y1: lr.intercept, x2: 500, y2: 500 * lr.slope + lr.intercept},
			linearRegression: {slope: lr.slope, intercept: lr.intercept}
		})
		
	}
	
	drawCircle() {
		const newData = this.state.mousePos
		this.setState({
			dataSet: {x: [...this.state.dataSet.x, newData.x], y: [...this.state.dataSet.y, newData.y]}
		}, () => {
			this.drawLine()
		})
	}
	
	render() {
		const {dataSet, mousePos, line, linearRegression} = this.state
		return (
			<div className="App">
				<header>
					<h1 className="App-title">Linear Regression - Ordinary Least Squares Method</h1>
					<h1 className="App-title">Y: { linearRegression.slope }x+{ linearRegression.intercept }</h1>
				</header>
				<div>
					<svg
						width="500px" height="500px" style={ {"background": "lightgray"} }
						onMouseMove={ this.getCoordinates }
						onClick={ this.drawCircle }
						ref='UniqueElementIdentifier'
					>
						{ dataSet.x.map((item, index) =>
							<g key={ `data-${index}` }>
								<circle cx={ item } cy={ dataSet.y[index] } r="2" fill="red"/>
								ls
							</g>
						) }
						
						<text x={ mousePos.x } y={ mousePos.y } fill="red">
							({ mousePos.x }, { mousePos.y })
						</text>
						
						{ dataSet.x.length > 1 ?
							<line stroke="blue" strokeWidth="2"
							      x1={ line.x1 }
							      y1={ line.y1 }
							      x2={ line.x2 }
							      y2={ line.y2 }
							/> : null }
					</svg>
				
				</div>
			</div>
		)
	}
}

export default LinearRegressionCanvas

