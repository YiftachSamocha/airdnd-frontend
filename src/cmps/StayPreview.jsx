export function StayPreview({stay}) {
    return <article className="stay-preview">
        <img src="" alt="" />  imgUrls
        <h3>{stay.name}</h3>
        <h3>{stay.location.country}</h3>
        <h3>${stay.price.night} nigth</h3>
         </article>
}