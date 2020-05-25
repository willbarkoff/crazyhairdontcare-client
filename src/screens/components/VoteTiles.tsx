import * as React from 'react'
import { contestant } from '../VoteScreen'
import VoteTile from './VoteTile'

import "./VoteTiles.styl"

interface VoteTilesProps {
	data: contestant[]
}

export default class VoteTiles extends React.Component<VoteTilesProps, {}> {
	render() {
		return <div className="voteTiles">
			{this.props.data.map((contestant, i) => {
				return <div className="voteTile" key={i}>
					<VoteTile data={contestant} />
				</div>
			})}
		</div>
	}
}