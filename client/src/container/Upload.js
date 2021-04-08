import React from "react";
import { proxy, useSnapshot } from "valtio";
import axios from "axios";

export const inputState = proxy({ tags: "", meme: null });
export function Upload() {
	const snap = useSnapshot(inputState, { sync: true });
	const handleInputChanged = (e) => {
		inputState.tags = e.target.value;
	};
	const handleFileChange = (e) => {
		inputState.meme = e.target.files[0];
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		let formData = new FormData(e.target);
		//formData.append("meme", inputState.meme);
		formData.append("tags", inputState.tags);
		const result = await axios
			.post("http://localhost:5000/memes", formData, {
				withCredentials: true,
				//headers: { "content-type": "multipart/form-data" },
			})
			.catch((err) => console.log(err));
		console.log(result);
	};
	return (
		<div className="flex flex-col w-full">
			<form method="post" onSubmit={handleUpload} encType="multipart/form-data">
				<div>
					<input
						type="file"
						onChange={handleFileChange}
						name="meme"
						accept="image/*"
					/>
				</div>
				<div className="w-1/3">
					<input
						type="text"
						value={snap.tags}
						onChange={handleInputChanged}
						placeholder="Type your tags and separate them by commas"
						className="w-full border-2"
					/>
				</div>
				<button className="w-1/5 border-2" type="submit">
					Upload
				</button>
			</form>
		</div>
	);
}
