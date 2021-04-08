import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "../container/Tabs";
import { Upload } from "../container/Upload";
import Library from "../container/Library";
import TabButton from "./ui/TabButton";
import TabView from "../components/ui/TabView";

export default function Authenticated() {
	const tabs = [
		{ name: "Upload", comp: <Upload /> },
		{ name: "Library", comp: <Library /> },
	];
	return (
		<Layout>
			<Tabs>
				<div className="flex justify-center w-full py-4">
					{tabs.map((tab, index) => {
						return <TabButton key={index} id={index} value={tab.name} />;
					})}
				</div>
				<div>
					<TabView tabs={tabs} />
				</div>
			</Tabs>
		</Layout>
	);
}
