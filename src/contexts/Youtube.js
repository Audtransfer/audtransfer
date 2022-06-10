import { createContext, useState, useContext } from "react";

const YoutubeContext = createContext();
YoutubeContext.displayName = "Youtube Music";

export default function YoutubeProvider({ children }) {
	const [accessToken, setAccessToken] = useState();
	return (
		<YoutubeContext.Provider
			value={{ accessToken, setAccessToken }}
		>
			{children}
		</YoutubeContext.Provider>
	)
}

export function useYoutubeContext() {
	const { accessToken, setAccessToken } = useContext(YoutubeContext)

	return { accessToken, setAccessToken }
}