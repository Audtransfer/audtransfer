import { createContext, useState, useContext } from "react";

const SpotifyContext = createContext();
SpotifyContext.displayName = "Spotify";

export default function SpotifyProvider({ children }) {
	const [accessToken, setAccessToken] = useState();

	return (
		<SpotifyContext.Provider
			value={{ accessToken, setAccessToken }}
		>
			{children}
		</SpotifyContext.Provider>
	)
}

//TODO Hooks
export function useSpotifyContext() {
	const { accessToken, setAccessToken } = useContext(SpotifyContext)

	return { accessToken, setAccessToken }
}