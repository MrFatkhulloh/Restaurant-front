import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'

import { Context } from "../../Context/Authentication";

const LOGIN = gql`
	mutation login($name: String!, $password: String!) {
		login(name: $name, password: $password)
	}
`;

function Login() {
	const navigate = useNavigate()

	const [error, setError] = useState(false)
	const {token, setToken} = useContext(Context)
	const [state, setState] = useState(false)

	useEffect(() => {
		if(state) {
			navigate('/')
		}
	},[state])

	useEffect(() => {
		if(error) {
			console.log(error)
		}
	},[error])

	

    const [logIn] = useMutation(LOGIN, {
        update: (cache, data) => {
			if(data) {
				setToken(data.data.login.access_token)
				window.localStorage.setItem('token', JSON.stringify(data.data.login.access_token))
				setState(true)
			}else {
				setError(true)
			}
        }
    })
	const handleSubmit = (e) => {
		e.preventDefault();

		const { name, password } = e.target;


        logIn({
            variables: {
                name: name.value,
                password: password.value
            }
        })

		e.target.reset()
	};

	return (
		<>
			<div className="container">
				<div className="login-wrapper">
					<form
						onSubmit={handleSubmit}
						action=""
						className="login-form"
					>
						<input type="text" name="name" placeholder="name" />
						<input
							type="text"
							name="password"
							placeholder="password"
						/>
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
