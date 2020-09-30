import React, {useState} from "react"
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment
} from "semantic-ui-react"

const LoginForm = ({firebase}) => {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	return (
		<Grid textAlign="center" style={{height: "100vh"}} verticalAlign="middle">
			<Grid.Column style={{maxWidth: 450}}>
				<Header as="h2" color="teal" textAlign="center">
					Log-in to your account
				</Header>
				<Form size="large">
					<Segment stacked>
						<Form.Input
							value={login}
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
							onChange={e => setLogin(e.target.value)}
						/>
						<Form.Input
							value={password}
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							onChange={e => setPassword(e.target.value)}
						/>

						<Button
							color="teal"
							fluid
							size="large"
							onClick={() => {
								firebase
									.auth()
									.signInWithEmailAndPassword(
										login,
										password
									)
							}}
						>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default LoginForm
