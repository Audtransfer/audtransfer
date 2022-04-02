import { createContext, useContext, useState } from "react";

const TransferContext = createContext();
TransferContext.displayName = "Transfer";

export default function TransferProvider({children}) {
	const [dataTransfer, setDataTransfer] = useState();

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

	return { dataTransfer, setDataTransfer }
}