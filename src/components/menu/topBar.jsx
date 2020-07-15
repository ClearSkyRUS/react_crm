import React from "react"
import {useLocation} from "hooks"
import {Header, Input} from "semantic-ui-react"

export default () => {
	const {pageState, setHistory} = useLocation()
	const setSearch = (queryVal) => {
		setHistory({search: queryVal})
	}
	return (
		<div className="pageHeader">
			<Header as="h5" dividing className="pageHeader-header">
				<span className="pageHeader-header__name capitalize">
					{pageState.title}
				</span>
				<Input
					value={pageState.params.search ? pageState.params.search : ""}
					onChange={(e, {value}) => setSearch(value)}
					className="pageHeader-header__search"
					icon="search"
					size="mini"
					placeholder="Search..."
				/>
			</Header>
		</div>
	)
}
