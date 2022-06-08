import axios from "axios";
import { useHistory } from "react-router";
import { useYoutubeContext } from "../../contexts/Youtube";

const basicEndpoint = "https://youtube.googleapis.com/youtube/v3";

export default function YoutubeImport() {
	const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
	const { accessToken } = useYoutubeContext();
	const history = useHistory();

	const handleCreate = () => {
		let today = new Date();
		today = today.toLocaleString("pt-BR");
		axios.post(
				`${basicEndpoint}/playlists?part=snippet%2Cstatus`,
				{
					snippet: {
					  	title: dataTransfer.playlistName,
					  	description: `Audtransfer created this at: ${today}`,
					},
					status: {
					  	privacyStatus: dataTransfer.public? "public" : "private"
					}
				},
				{headers: {Authorization: "Bearer " + accessToken }}
			)
			.then(async response => {
				console.log(response.data);
				console.log(new Date());
				await new Promise(r => setTimeout(r, 10000));
				const urlBase = `${basicEndpoint}/playlistItems?part=snippet`;

				if(dataTransfer.playlistOrigin === "YouTube") {
					console.log("same origin");
					dataTransfer.tracks.map(async item => {
						console.log(new Date());
						console.log(item.trackId);
						await new Promise(r => setTimeout(r, 3000));
						await axios.post(
							urlBase, 
							{
								snippet: {
									playlistId: response.data.id,
									resourceId: {
										kind: "youtube#video",
										videoId: item.trackId
									}
								}
							},
							{headers: {Authorization: "Bearer " + accessToken }})
							.then(response => console.log(response.data))
							.catch((err) => console.log(err));
					});
				}
				else {
					console.log("foreign origin");
					dataTransfer.tracks.map(async item => {
						let vidID = await handleSearch(item);
						console.log(new Date());
						console.log(vidID);
						await new Promise(r => setTimeout(r, 3000));
						await axios.post(
							urlBase, 
							{
								snippet: {
									playlistId: response.data.id,
									resourceId: {
										kind: "youtube#video",
										videoId: vidID
									}
								}
							},
							{headers: {Authorization: "Bearer " + accessToken }})
							.then(response => console.log(response.data))
							.catch((err) => console.log(err));
					});
				}
		
				sessionStorage.clear();
				history.push("/success");
			})
			.catch((err) => console.log(err));
	};

	const handleSearch = async (item) => {
		const { data } = await axios.get(
			`${basicEndpoint}/search?part=snippet&maxResults=50&q=${item.trackName}%20${item.artistName}&type=video`,
			{headers: {Authorization: "Bearer " + accessToken}}
		);

        if (
            data.items.find(x => 
            x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === (item.artistName.toUpperCase() + " - TOPIC").replace(/[^\w\s]/gi, '')
            && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, '')))
            )
            return data.items.find(x => 
                x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === (item.artistName.toUpperCase() + " - TOPIC").replace(/[^\w\s]/gi, '')
                && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, ''))
                ).id.videoId;

        if (
            data.items.find(x => 
            x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === (item.artistName.toUpperCase() + " VEVO").replace(/[^\w\s]/gi, '')
            && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, '')))
            )
            return data.items.find(x => 
                x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === (item.artistName.toUpperCase() + " VEVO").replace(/[^\w\s]/gi, '')
                && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, ''))
                ).id.videoId;

        if (
            data.items.find(x => 
            x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === item.artistName.toUpperCase().replace(/[^\w\s]/gi, '')
            && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, '')))
            )
            return data.items.find(x => 
                x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '') === item.artistName.toUpperCase().replace(/[^\w\s]/gi, '')
                && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, ''))
                ).id.videoId;

        if (
            data.items.find(x => 
            x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '').startsWith(item.artistName.toUpperCase().replace(/[^\w\s]/gi, ''))
            && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, '')))
            )
            return data.items.find(x => 
                x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '').startsWith(item.artistName.toUpperCase().replace(/[^\w\s]/gi, ''))
                && x.snippet.title.toUpperCase().replace(/[^\w\s]/gi, '').includes(item.trackName.toUpperCase().replace(/[^\w\s]/gi, ''))
                ).id.videoId;

        if (
            data.items.find(x => 
            x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '').startsWith(item.artistName.toUpperCase().replace(/[^\w\s]/gi, '')))
            )
            return data.items.find(x => 
                x.snippet.channelTitle.toUpperCase().replace(/[^\w\s]/gi, '').startsWith(item.artistName.toUpperCase().replace(/[^\w\s]/gi, ''))
                ).id.videoId;

		return data.items[0].id.videoId;
	};
  
	return (
		<div className="create wrapper">
		  {dataTransfer && (
			<>
			  <div className="create-buttons">
				<button onClick={handleCreate}>Create the Playlist</button>
			  </div>
	
			  <h3 className="create-title">Playlist name: {dataTransfer.playlistName}</h3>
			  <ul className="playlist-table seamless">
				{dataTransfer.tracks?.map((item) => (
				  <li className="playlist-table__item" key={item.trackId}>
					{item.trackName} - {item.artistName}
				  </li>
				))}
			  </ul>
			</>
		  )}
		</div>
	);
}
