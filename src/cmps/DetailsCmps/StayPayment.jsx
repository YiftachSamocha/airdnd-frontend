
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatNumberWithCommas } from "../../services/util.service";
import arrowDown from "../../assets/imgs/icons/arrowDown.svg";
import { Who } from "../MainFilterCmps/Who.jsx";
import { When } from "../MainFilterCmps/When.jsx";
import { orderService } from "../../services/order/index.js";
import { isValid } from "date-fns";  // Importing isValid function from date-fns

export function StayPayment({ stay }) {
    const [isWhoOpen, setIsWhoOpen] = useState(false);
    const [isWhenOpen, setIsWhenOpen] = useState(false);

    const [filterCapacity, setFilterCapacity] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
    const [dates, setDates] = useState({ startDate: null, endDate: null });

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const price = formatNumberWithCommas(stay.price.night);
    const total = formatNumberWithCommas(stay.price.night * 5);
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning);

    const toggleWho = () => setIsWhoOpen(!isWhoOpen);
    const toggleWhen = () => setIsWhenOpen(!isWhenOpen);

    useEffect(() => {
        const checkin = searchParams.get('checkin') ? new Date(searchParams.get('checkin')) : null;
        const checkout = searchParams.get('checkout') ? new Date(searchParams.get('checkout')) : null;
        const adults = Number(searchParams.get('adults')) || 1;
        const children = Number(searchParams.get('children')) || 0;
        const infants = Number(searchParams.get('infants')) || 0;
        const pets = Number(searchParams.get('pets')) || 0;

        setDates({ startDate: checkin, endDate: checkout });
        setFilterCapacity({ adults, children, infants, pets });
    }, [searchParams]);

    useEffect(() => {
        if (isValid(dates.startDate) && isValid(dates.endDate)) {
            setIsWhenOpen(false); // Close the modal when both dates are valid
        }
    }, [dates]);

    function updateSearchParams(key, value) {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
    }

    function handleDateChange(newDates) {
        setDates(newDates);
    
        // Update the URL immediately after setting the dates
        if (isValid(newDates.startDate)) {
            updateSearchParams('checkin', newDates.startDate.toISOString().split('T')[0]);
        }
        if (isValid(newDates.endDate)) {
            updateSearchParams('checkout', newDates.endDate.toISOString().split('T')[0]);
        }
    
    }
    


    function displayDateInLocal(date) {
        return date ? date.toLocaleDateString() : 'Add date';
    }

    async function handleReserve(stay) {
        try {
            if (dates.startDate && dates.endDate) {
                updateSearchParams('checkin', dates.startDate.toISOString().split('T')[0]);
                updateSearchParams('checkout', dates.endDate.toISOString().split('T')[0]);
            }
            updateSearchParams('adults', filterCapacity.adults || 1);
            updateSearchParams('children', filterCapacity.children || 0);
            updateSearchParams('infants', filterCapacity.infants || 0);
            updateSearchParams('pets', filterCapacity.pets || 0);

            navigate(`/book/stay/${stay._id}`);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }

    return (
        <div className="payment-cmp">
            <section className="stay-payment sticky">
                <h2>${price} <span>night</span></h2>
                <div className="btn-container">
                    <button className="btn-team" onClick={toggleWhen}>
                        <div className="btn-side">
                            <h4>CHECK-IN</h4>
                            <p>{displayDateInLocal(dates.startDate)}</p>
                        </div>
                    </button>
                    <button className="btn-team" onClick={toggleWhen}>
                        <div className="btn-side">
                            <h4>CHECKOUT</h4>
                            <p>{displayDateInLocal(dates.endDate)}</p>
                        </div>
                    </button>
                    {isWhenOpen && (
                        <When
                            dates={dates}
                            setDates={handleDateChange}
                            breakpoint={743}
                        />
                    )}

                    <button className="btn-team full" onClick={toggleWho}>
                        <div className="btn-side">
                            <h4>GUESTS</h4>
                            <p>{`${filterCapacity.adults + filterCapacity.children + filterCapacity.infants} guests`}</p>
                        </div>
                        <div className="btn-side">
                            <img src={arrowDown} alt="ArrowDown Icon" className="arrow-down-icon" />
                        </div>
                    </button>
                </div>

                <div className="grid-item button-container">
                    <button className="color-change" onClick={() => handleReserve(stay)}>Reserve</button>
                </div>

                <div className="grid-item add-grid">
                    <h5>You won't be charged yet</h5>
                </div>
                <div className="price-calc add-grid">
                    <h3 className="light">${price} <span><span>X</span> 5 nights</span></h3>
                    <h3>${total}</h3>
                </div>
                {cleaningFee > 0 && (
                    <div className="price-calc add-grid">
                        <h3 className="light">Cleaning fee</h3>
                        <h3>${cleaningFee}</h3>
                    </div>
                )}
                <div className="total">
                    <h3>Total</h3>
                    <h3>${total}</h3>
                </div>
                {isWhoOpen && <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} />}
            </section>
        </div>
    );
}