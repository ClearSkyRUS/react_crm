import React, {useContext} from "react"
import {Route, Switch} from "react-router-dom"
import Swipe from "react-easy-swipe"
import {NotificationContainer} from "react-notifications"
import {ItemsContext} from "context"

import {useWindow} from "hooks"

import {Segment, Sidebar, Container, Button} from "semantic-ui-react"

import {MainPage, ModelPage} from "containers"

import {SideBar, TopBar} from "components"

const App = () => {
	const windowContext = useWindow()
	const {store} = useContext(ItemsContext)
	return (
		<div className="AppContent full-heght">
			<Swipe
				onSwipeMove={(position) => windowContext.onSwipeMove(position)}
				onSwipeEnd={() => windowContext.onSwipeEnd()}
			>
				<Sidebar.Pushable
					className="AppContent-pushable full-heght"
					as={Segment}
				>
					<SideBar {...windowContext} store={store} />
					<Sidebar.Pusher
						dimmed={windowContext.isMobile && windowContext.isSidebarVisible}
						className={`AppContent-pushable__pusher full-heght ${
							windowContext.isMobile ? "" : "appDesctop"
						}`}
					>
						<TopBar />
						<Container fluid className="content">
							<Switch>
								<Route exact path="/" component={MainPage} />
								<Route exact path="/models" component={ModelPage} />
							</Switch>
						</Container>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</Swipe>
			<NotificationContainer />
		</div>
	)
}

export default App
