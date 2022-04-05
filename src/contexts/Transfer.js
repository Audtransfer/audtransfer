import { createContext, useContext, useState, useEffect } from "react";

const TransferContext = createContext();
TransferContext.displayName = "Transfer";

export default function TransferProvider({children}) {
	const [dataTransfer, setDataTransfer] = useState(null);

	return (
		<TransferContext.Provider
			value={{ dataTransfer, setDataTransfer }}
		>
			{children}
		</TransferContext.Provider>
	)
}

//TODO Hooks
export function useTransferContext() {
	const { dataTransfer, setDataTransfer } = useContext(TransferContext);

	useEffect(() => {
		if(!sessionStorage.getItem('playlisToTransfer')) return;
		setDataTransfer(sessionStorage.getItem('playlisToTransfer'));
		// sessionStorage.clear();
	}, [setDataTransfer])
	

	return { dataTransfer, setDataTransfer }
}