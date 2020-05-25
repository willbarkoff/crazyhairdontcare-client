import * as React from 'react'

// @ts-ignore because typescript doesn't like importing a gif, even though Parcel makes it ok.
import fireGif from '../../public/fire.gif'
import "./VoteScreen.styl"
import api from '../api'
import VoteTiles from './components/VoteTiles'

interface VoteScreenProps {

}

export interface contestant {
	id: number
	name: string
	photoURL: string
	originalPhotoURL: string
	cutName: string
}

interface VoteScreenState {
	isLoading: boolean
	data?: contestantsResponse
}

interface contestantsResponse {
	status: string
	error?: string
	message: string
	contestants: contestant[]
}

export default class VoteScreen extends React.Component<VoteScreenProps, VoteScreenState> {
	constructor(props: VoteScreenProps) {
		super(props)

		this.state = {
			isLoading: true,
		}

		this.load()
	}

	async load() {
		let response = await api.GET("contestants")
		this.setState({
			isLoading: false,
			data: response as contestantsResponse
		})
	}

	render() {
		let body;
		if (this.state.isLoading) {
			body = <p>Loading...</p>
		} else if (this.state.data?.status == "error") {
			body = <p className="error">{this.state.data.error}</p>
		} else {
			body = <VoteTiles data={this.state.data!.contestants} />
		}
		return <div className="voting">
			<h1 className="votingHeader">Vote for the best Corona cut!</h1>
			{!this.state.isLoading && <p>{this.state.data!.message}</p>}
			<img className="fire" src={fireGif} />
			{body}
		</div>
	}
}