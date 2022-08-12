import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import { Provider as AuthProvider } from "./Context/Authentication";

// const client = new ApolloClient({
// 	uri: "http://localhost:9090/graphql",
// uri: "https://exam-restaurant.herokuapp.com/graphql",
// 	cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
	// uri: "http://localhost:9090/graphql",
	uri: "https://exam-restaurant.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? token : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
