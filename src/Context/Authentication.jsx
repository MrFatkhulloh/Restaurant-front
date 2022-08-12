import { createContext, useEffect, useState } from "react";

const Context = createContext();

function Provider({ children }) {
	const [token, setToken] = useState(
		JSON.parse(window.localStorage.getItem("token")) || false
	);

    useEffect(() => {
        if(token) {
            window.localStorage.setItem('token', JSON.stringify(token))
        } else {
            window.localStorage.removeItem('token')
        }
    },[token])
	return (
		<Context.Provider value={{ token, setToken }}>
			{children}
		</Context.Provider>
	);
}

export { Provider, Context };
