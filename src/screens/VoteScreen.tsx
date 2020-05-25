import * as React from 'react'

import fireGif from '../../public/fire.gif'
import "./VoteScreen.styl"

interface VoteScreenProps {

}

interface VoteScreenState {

}

export default class VoteScreen extends React.Component<VoteScreenProps, VoteScreenState> {
	render() {
		return <div className="voting">
			<h1 className="votingHeader">Vote for whomever you think has the best Corona Cut!</h1>
			<p>Vote as many times as you'd like!</p>
			<img className="fire" src={fireGif} />
		</div>
	}
}