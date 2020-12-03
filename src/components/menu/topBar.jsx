import React from "react"
import {useLocation} from "hooks"
import {Header} from "semantic-ui-react"

export default () => {
	const {pageState} = useLocation()
	return (
		<div className="pageHeader">
			<Header as="h5" dividing className="pageHeader-header">
				<span className="pageHeader-header__name capitalize">
					{pageState.title}
				</span>
			</Header>
		</div>
	)
}
