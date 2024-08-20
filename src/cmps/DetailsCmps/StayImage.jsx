import { useSelector } from "react-redux";

export function StayImage({ stay }) {
    console.log('stay stayimgsae:', stay)

    if (!stay || !stay.imgs) {
        return <p>No images available</p>
    }
    const imgsToShow = stay.imgs.slice(0, 5) // Take only the first 5 images

    return <section className="details-imgs">
        {imgsToShow.map((imgUrl, imgIndex) => (
            <img key={imgIndex} src={imgUrl} alt={`img-${imgIndex + 1}`}
            className={`img-${imgIndex + 1}`} // Apply the correct class name
            />
        ))}
    </section >
}