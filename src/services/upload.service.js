export const uploadService = {
	uploadImg,
}

async function uploadImg(ev) {
	const CLOUD_NAME = 'dn08iwpyq'
	const UPLOAD_PRESET = 'airdnd'
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	// const formData = new FormData()

	// // Building the request body
	// formData.append('file', ev.target.files)
	// formData.append('upload_preset', UPLOAD_PRESET)

	// // Sending a post method request to Cloudinary API
	// try {
	// 	const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
	// 	const imgData = await res.json()
	// 	return imgData
	// } catch (err) {
	// 	console.error(err)
	// 	throw err
	// }

	try {
		const files = ev.target.files
		const uploadPromises = []
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData()
			formData.append('upload_preset', UPLOAD_PRESET)
			formData.append('file', files[i])
			const uploadPromise = fetch(UPLOAD_URL, { method: 'POST', body: formData })
				.then(res => res.json())
			uploadPromises.push(uploadPromise)
		}
		const imgUrls = await Promise.all(uploadPromises)
		return imgUrls
	} catch (err) {
		console.error('Failed to upload', err)
		throw err
	}
}

