import React from "react";
import { useSnapshot } from "valtio";
import { TabState } from "../../container/Tabs";

export default function TabButton(props) {
	const snap = useSnapshot(TabState);
	const activeTab = snap.activeTab;
	let buttonStyle = activeTab == props.id ? "bg-blue-100" : "bg-gray-300";
	return (
		<button
			id={props.id}
			className={`${buttonStyle} w-1/2 focus:outline-none`}
			onClick={(e) => (TabState.activeTab = e.target.id)}
		>
			{props.value.toUpperCase()}
		</button>
	);
}
