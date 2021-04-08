import React from "react";

export default function MemeCard({ meme }) {
	return (
		<a
			href={meme.url}
			target="_blank"
			rel="noreferrer"
			alt={meme.tags[0]}
			download={meme.tags[0]}
		>
			<img src={meme.url} />
		</a>
	);
}
