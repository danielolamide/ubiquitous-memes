import React from "react";

export default function MemeCard({ meme }) {
	return (
		<a href={meme.url} download={meme.tags[0]}>
			<img src={meme.url} />
		</a>
	);
}
