import { useNavigate } from "react-router-dom";

export function Error() {
    const navigate = useNavigate()

    function handleNavigateBack() {
        navigate(`/stay`)
    }

    return (
        <section>
            <div>
                <h1>Oops!</h1>
                <h2>Well, this is unexpected…</h2>
                <h3>Error code: 500</h3>
                <p>An error has occurred and we're working to fix the problem! We’ll be up and running shortly.
                    If you need immediate help from our customer service team about an ongoing reservation, please contact us. 
                    If it isn’t an urgent matter, please visit our Help Center for additional information. 
                    Thanks for your patience!</p>
            </div>
            <div>
                <img src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif" />
            </div>

            <button onClick={handleNavigateBack} className="btn-link">
                Click to return to stays
            </button>
        </section>
    );
}