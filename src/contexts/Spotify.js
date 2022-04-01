import { createContext, useState, useContext } from "react";

const SpotifyContext = createContext();
SpotifyContext.displayName = "Spotify";

export default function SpotifyProvider({ children }) {
	const [accessToken, setAccessToken] = useState()
	const [data, setData] = useState()

	return (
		<SpotifyContext.Provider
			value={{
				accessToken,
				setAccessToken,
				data,
				setData
			}}
		>
			{children}
		</SpotifyContext.Provider>
	)
}

export function useSpotifyContext() {
	const {
		accessToken,
		setAccessToken,
		data,
		setData
	} = useContext(SpotifyContext)

	return {
		accessToken,
		setAccessToken,
		data,
		setData
	}
}