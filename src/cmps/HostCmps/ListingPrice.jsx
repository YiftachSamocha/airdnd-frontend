import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from '../../services/util.service';
import { showErrorMsg } from '../../services/event-bus.service';

export function ListingPrice({ price, onPriceChange }) {
    const [localPrice, setLocalPrice] = useState(price.night);
    const [error, setError] = useState(''); // Error message state
    const inputRef = useRef(null);

    const debouncedChange = useCallback(
        debounce((newPrice) => {
            onPriceChange(newPrice);
        }, 500),
        [onPriceChange]
    );

    // Sync localPrice with the prop when it changes
    useEffect(() => {
        setLocalPrice(price.night);
        resizeInput(price.night);
    }, [price]);

    // Prevent scroll from changing the input value using a non-passive event listener
    useEffect(() => {
        const inputElement = inputRef.current;
        const handleWheel = (e) => e.preventDefault(); // Prevent default behavior

        if (inputElement) {
            inputElement.addEventListener('wheel', handleWheel, { passive: false }); // Non-passive listener
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('wheel', handleWheel); // Cleanup listener on unmount
            }
        };
    }, [])

    function handleChange(ev) {
        let newPrice = ev.target.value;

        setLocalPrice(newPrice);
        resizeInput(newPrice);
    }


    function handleBlur() {
        if (localPrice === '' || localPrice < 10 || localPrice > 10000) {
            setError('Please enter a price between $10 and $10,000');
            showErrorMsg('Oops, there is an issue with your price'); // Display toast message
        } else {
            setError('');
            debouncedChange({ night: localPrice, cleaning: 5 });
        }
    }

    // Function to resize the input dynamically based on its value
    function resizeInput(value) {
        const inputElement = document.querySelector('.price-input input');
        if (inputElement) {
            const length = value.toString().length;
            inputElement.style.width = `${length + 1}ch`; // Resize based on character count
        }
    }

    return (
        <div className="pricing info">
            <h2>Now, set your price</h2>
            <p>You can change it anytime.</p>
            <div className="price-input">
                <span>$</span>
                <input
                    ref={inputRef} // Attach ref to the input

                    type="number"
                    value={localPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="10"
                    max="10000"
                    placeholder={128}
                    className={error ? 'input-error' : ''}
                    style={{ overflow: 'hidden' }}
                />
            </div>
            {error && <p className="error-msg">{error}</p>} {/* Show error if present */}
            <p className="char-limit">Guest Price: ${+localPrice + +price.cleaning}</p>

            {/* <button type="button" className="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Edit" role="img" className="edit-icon">
                    <path d="m18.23 7.35 6.42 6.42L10 28.4c-.38.38-.88.59-1.41.59H3v-5.59c0-.52.21-1.04.59-1.41L18.23 7.35zm9.98-3.56a4.54 4.54 0 0 0-6.42 0l-1.44 1.44 6.42 6.42 1.44-1.44a4.54 4.54 0 0 0 0-6.42z"></path>
                </svg>
            </button> */}
        </div>
    );
}