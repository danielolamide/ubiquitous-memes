import {useSnapshot} from "valtio";
import {TabState } from "../../container/Tabs";

export default function TabView(props) {
	const tabs = [...props.tabs];
	const snap = useSnapshot(TabState);
	const activeTab = snap.activeTab
	return tabs[activeTab].comp;
}
