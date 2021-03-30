//import React from "react";
import { proxy } from "valtio";
//import { devtools } from "zustand/middleware";

const TabState = proxy({
	activeTab: 0,
});
function Tabs(props) {
	return props.children;
}

export { Tabs, TabState };
