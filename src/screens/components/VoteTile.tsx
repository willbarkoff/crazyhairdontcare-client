import * as React from 'react'
import { contestant } from '../VoteScreen';

import './VoteTile.styl'
import api from '../../api';

interface VoteTileProps {
	data: contestant
}

interface VoteTileState {
	currentUrl: string
	voteSucceeded: boolean
	isLoading: boolean
}

export default class VoteTile extends React.Component<VoteTileProps, VoteTileState> {
	constructor(props: VoteTileProps) {
		super(props)

		this.state = {
			currentUrl: props.data.photoURL,
			isLoading: false,
			voteSucceeded: false
		}
	}

	mouseEnter() {
		this.setState({
			currentUrl: this.props.data.originalPhotoURL
		})
	}

	mouseExit() {
		this.setState({
			currentUrl: this.props.data.photoURL
		})
	}

	async vote() {
		this.setState({
			isLoading: true
		}, async () => {
			let response = await api.POST("vote", { id: this.props.data.id.toString() })
			if (response.status != "ok") {
				//@ts-ignore typescript doesn't like alert for some reason
				alert("An error occured submitting your vote: " + response.error)
				this.setState({
					isLoading: false
				})
				return
			}
			this.setState({
				voteSucceeded: true,
				isLoading: false
			})
		})
	}

	render() {
		return <div className="contestantTile">
			<img src={this.state.currentUrl} className="contestantPhoto" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseExit.bind(this)} />
			<h1>{this.props.data.name}</h1>
			<h2>{this.props.data.cutName}</h2>
			{this.state.voteSucceeded && <h3>Vote succeeded!</h3>}
			<button onClick={this.vote.bind(this)} disabled={this.state.isLoading}>{this.state.isLoading ? "Submitting..." : "Vote!"}</button>
		</div>
	}
}