export function StayToKnow({ stay }) {
    const { thingsToKnow } = stay;

    // Select 3 items from each section
    const selectedHouseRules = thingsToKnow.houseRules.slice(0, 3);
    const selectedSafetyProperty = thingsToKnow.safetyProperty.slice(0, 3);
    const selectedCancellationPolicy = [thingsToKnow.cancellationPolicy]; // Only one item as per the structure

    return (
        <section className="things-to-know">
            <h3>Things to know</h3>
            <div className="content">
            <div className="house-rules">
                <h4 className="things-to-know-title">House Rules</h4>
                <ul>
                    {selectedHouseRules.map((item, index) => (
                        <li key={index}>{item.txt}</li>
                    ))}
                </ul>
            </div>

            <div className="safety">
                <h4 className="things-to-know-title">Safety Property</h4>
                <ul>
                    {selectedSafetyProperty.map((item, index) => (
                        <li key={index}>{item.txt}</li>
                    ))}
                </ul>
            </div>

            <div className="cancellation">
                <h4 className="things-to-know-title">Cancellation Policy</h4>
                <ul>
                    {selectedCancellationPolicy.map((item, index) => (
                        <li key={index}>{item.txt}</li>
                    ))}
                </ul>
            </div>
            </div>
           
        </section>
    );
}
