import React, {useState, useCallback} from "react"
import {useDropzone} from "react-dropzone"
import {Segment, Icon} from "semantic-ui-react"

export default ({setNewObject}) => {
	const [toUpload, setToUpload] = useState([])

	const onDrop = useCallback(acceptedFiles => {
    let toUploadHolder = toUpload.slice()
		toUploadHolder = acceptedFiles.concat(
			toUploadHolder.filter(
				(i) =>
					acceptedFiles.indexOf(
						acceptedFiles.find((file) => file.path === i.path)
					) === -1
			)
		)
		setToUpload(toUploadHolder)
		let files = new FormData()
		toUploadHolder.forEach((file) => files.append("files", file))
		setNewObject(files)
  }, [toUpload, setNewObject])
	const {
		getRootProps,
		getInputProps,
		isDragActive
	} = useDropzone({onDrop})

	return (
		<Segment>
			<div style={{textAlign: "center"}} {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<Icon size="massive" name="dropbox" />
				) : (
					<Icon size="massive" name="cloud upload" />
				)}
			</div>
			{!toUpload.length ? (
				""
			) : (
				<aside>
					<h4>Files</h4>
					<ul>
						{toUpload.map((file) => (
							<li key={file.path}>
								{file.path} - {file.size} bytes
							</li>
						))}
					</ul>
				</aside>
			)}
		</Segment>
	)
}
