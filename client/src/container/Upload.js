import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadSVG } from "../assets/upload.svg";
export default function Upload() {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		console.log(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="w-full">
			<input {...getInputProps()} className="outline-none" />
			<div className="flex flex-col items-center w-full">
				<UploadSVG />
				<p>Drag 'n' drop image here, or click to select files</p>
			</div>
		</div>
	);
}
