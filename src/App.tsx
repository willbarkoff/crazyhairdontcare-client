import * as React from 'react'
import './App.styl'
import PasswordScreen from './screens/PasswordScreen'
import VoteScreen from './screens/VoteScreen'

interface AppState {
	currentScreen: string
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			currentScreen: "password"
		}
	}

	changeScreen(newScreen: string) {
		this.setState({
			currentScreen: newScreen
		})
	}

	render() {
		switch (this.state.currentScreen) {
			case "password":
				return <PasswordScreen changeScreen={this.changeScreen.bind(this)} />
			case "voting":
				return <VoteScreen />
			default:
				return <h1>404! Page not found.</h1>
		}
	}
}