import * as React from 'react'
import linkState from 'linkstate'
import api from '../api'
import './PasswordScreen.styl'

interface PasswordScreenState {
	password: string
	error: string
	isLoading: boolean
}

interface PasswordScreenProps {
	changeScreen(newScreen: string): void
}

export default class PasswordScreen extends React.Component<PasswordScreenProps, PasswordScreenState> {
	constructor(props: PasswordScreenProps) {
		super(props)
		this.state = {
			password: "",
			error: "",
			isLoading: true
		}
		this.load()
	}

	async load() {
		let response = await api.GET("/contestants")
		if (response.status != "error") {
			// we're already logged in!
			this.props.changeScreen("voting")
			return
		}

		this.setState({
			isLoading: false
		})
	}

	async submit() {
		this.setState({ isLoading: true })
		let response = await api.POST("login", { password: this.state.password })
		if (response.status != "ok") {
			this.setState({ error: response.error, isLoading: false })
			return
		}
		this.props.changeScreen("voting")
	}

	render() {
		return <div className="passwordScreen">
			<div className="centering">
				<h1>Enter the password to continue</h1>
				{this.state.error && <h2 className="errorText">{this.state.error}</h2>}
				<input type="text" className="passwordInput" value={this.state.password} onChange={linkState(this, 'password')} />
				<button onClick={this.submit.bind(this)} disabled={this.state.isLoading}>{this.state.isLoading ? "Loading..." : "Submit!"}</button>
			</div>
		</div>
	}
}