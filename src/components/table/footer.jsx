import React from "react"
import {Icon, Label, Table, Pagination} from "semantic-ui-react"

export default ({data, colSpan, paginate}) => {
	return (
		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan={colSpan}>
					<Pagination
						floated="right"
						activePage={data.page}
						onPageChange={paginate}
						firstItem={null}
						lastItem={null}
						prevItem={
							data.hasPrevPage
								? {content: <Icon name="angle left" />, icon: true}
								: null
						}
						nextItem={
							data.hasNextPage
								? {content: <Icon name="angle right" />, icon: true}
								: null
						}
						pointing
						secondary
						totalPages={data.totalPages}
						style={{visibility: data.totalPages === 1 ? "hidden" : "visible"}}
					/>
					<Label>
						Total
						<Label.Detail>{data.totalDocs}</Label.Detail>
					</Label>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>
	)
}
