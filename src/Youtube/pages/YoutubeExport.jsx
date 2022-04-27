import axios from "axios";
import { useEffect, useState } from "react";
import { useYoutubeContext } from "../../contexts/Youtube";
import TrackLists from "../components/Export/TrackLists";

const youtubeEndpoint = "https://youtube.googleapis.com/youtube/v3";
const youtubeUserEndpoint = `${youtubeEndpoint}/channels`;
const youtubePlaylistEndpoint = `${youtubeEndpoint}/playlists`;

export default function YoutubeExport() {
    const { accessToken } = useYoutubeContext();
	const [user, setUser] = useState({})
	const [data, setData] = useState({})
	const [selectedPlaylist, setSelectedPlaylist] = useState()

	useEffect(() => {
		axios.get(`${youtubeUserEndpoint}?part=snippet&mine=true`, {headers:{Authorization: "Bearer " + accessToken}})
		.then(response => {
            console.log(response.data);
			//axios.get(`${youtubePlaylistEndpoint}?part=snippet&mine=true`, {headers:{Authorization: "Bearer " + accessToken}})
			//.then(response => {setData(response.data)})
		})
		.catch(err => { console.log(err) });
	},[accessToken])

	return (<>
	</>)
}
