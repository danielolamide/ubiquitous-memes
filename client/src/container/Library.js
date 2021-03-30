import { useQuery } from "react-query";
import MemeCard from "../components/ui/MemeCard";
import axios from "axios";
export default function Library() {
	const { data, isLoading, err } = useQuery("fetchMemes", async () => {
		const { data } = await axios.get("http://localhost:5000/memes", {
			withCredentials: true,
		});
		return data;
	});
	if (isLoading) {
		return <div>Loading</div>;
	}
	if (err) {
		return <div>Err</div>;
	}
	return (
		<div className="w-full">
			{data[0].bank.map((meme, index) => {
				return <MemeCard meme={meme} key={index} />;
			})}
		</div>
	);
}
