import React from "react";
import Avatar from "./ui/Avatar";
export default function Layout(props) {
	return (
		<div className="flex flex-col w-full p-6">
			<div className="flex justify-center w-full">
				<Avatar />
			</div>
			<div className="w-full">{props.children}</div>
		</div>
	);
}
