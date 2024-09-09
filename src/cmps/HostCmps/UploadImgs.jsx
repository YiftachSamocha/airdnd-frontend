import { useState } from "react";
import { onHandleFile } from "../../services/util.service";

export function UploadImgs({imgs, onImgsChange}) {
    // const [imgs, setImgs] = useState([])
    const [uploadClicked, setUploadClicked] = useState(false)

    function handleButtonClick(event) {
        event.preventDefault() // Prevent default behavior if needed
        setUploadClicked(true) // Update state to reflect that the upload button was clicked
        document.getElementById('fileInput').click() // Trigger the hidden file input
    }

    async function uploadImg(ev) {
        ev.preventDefault()
        const uploadedImgs = await onHandleFile(ev)
        
        onImgsChange(uploadedImgs)

        if (uploadedImgs.length === 0) {
            setUploadClicked(false)
        }
    }


    return (
        <section className="imgs">
            <div className='info'>
                <h2>Add some photos of your place</h2>
                <p>You'll need 5 photos to get started. You can add more or make changes later.</p>
            </div>
            <div className={`cloudinary ${uploadClicked ? 'gallery-display' : ''}`}>

                <div className="img-container">
                    {imgs.length === 0 ? (
                        <img
                            className="default-image"
                            src="https://a0.muscache.com/im/pictures/mediaverse/mys-amenities-n8/original/c83b2a87-3be4-43c9-ad47-12dd2aee24c4.jpeg"
                            alt="Default"
                        />
                    ) : (
                        <div className="grid-container">
                            {imgs.map((img, idx) => (
                                <div key={idx} className="grid-item">
                                    <img src={img.secure_url} alt={`Uploaded ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                        )}
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={uploadImg}
                />
                <button
                    onClick={handleButtonClick} type='button'
                // onKeyDown={handleKeyDown}
                >Add photos
                </button>
            </div>
        </section>
    );
}