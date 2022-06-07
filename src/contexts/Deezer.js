import { createContext, useState, useContext } from "react";

const DeezerContext = createContext();
DeezerContext.displayName = "Deezer";

export default function DeezerProvider({ children }) {
	const [accessToken, setAccessToken] = useState();
	return (
		<DeezerContext.Provider
			value={{ accessToken, setAccessToken }}
		>
			{children}
		</DeezerContext.Provider>
	)
}

export function useDeezerContext() {
	const { accessToken, setAccessToken } = useContext(DeezerContext)

	return { accessToken, setAccessToken }
}