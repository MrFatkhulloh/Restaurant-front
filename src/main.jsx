import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
	uri: "http://localhost:9090/graphql",
	// uri: "https://exam-restaurant.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);
