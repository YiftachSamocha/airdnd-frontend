import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { addDays, addMonths, isBefore, isAfter, format, isSameDay } from 'date-fns';
import { findFirstAvailableNights } from '../../services/util.service';

export function WhenDetails({ dates, onSetDates, stay, breakpoint = 1200, setIsWhenOpen, isWhenOpen }) {
    const [monthsAmount, setMonthsAmount] = useState(2)
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

    const { reservedDates } = stay

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > breakpoint && monthsAmount !== 2) {
                setMonthsAmount(2)
            } else if (window.innerWidth <= breakpoint && monthsAmount !== 1) {
                setMonthsAmount(1)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [breakpoint, monthsAmount])

    useEffect(() => {
        if (!dates.startDate && !dates.endDate) {
            const availableDates = findFirstAvailableNights(reservedDates, 5)
            if (availableDates) {
                onSetDates({
                    startDate: availableDates.startDate,
                    endDate: availableDates.endDate,
                })
            }
        }
    }, [])

    // useEffect(() => {
    //     // Call updateMonthNames after the component mounts and after each render
    //     updateMonthNames()
    // }, [monthsAmount, dates])

    async function handleDateChange(ranges) {
        // onSetDates({ startDate, endDate: null })
        const { selection } = ranges
        const startDate = selection.startDate
        const endDate = selection.endDate

        if (!isSelectingEndDate) {
            setIsSelectingEndDate(true);
            onSetDates({ startDate, endDate: null }); // Start selecting, don't set endDate yet
            return; // Don't close the modal yet
        }

        // When end date is selected, set both dates and close the modal
        if (isSelectingEndDate && startDate && endDate) {
            onSetDates({ startDate, endDate });
            setIsWhenOpen(false); // Close the modal
            setIsSelectingEndDate(false); // Reset the flag
        }
    }

    // function updateMonthNames() {
    //     // Select all elements with the class 'rdrMonthName'
    //     const monthElements = document.querySelectorAll('.rdrMonthName')

    //     // Loop through each element and update the month name
    //     monthElements.forEach((element, index) => {
    //         // Get the current date based on the month element's index
    //         const currentDate = new Date()
    //         const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + index)

    //         // Format the month name to full month name and year (e.g., 'September 2024')
    //         const formattedMonth = format(monthDate, 'MMMM yyyy')

    //         // Update the text content of the month element
    //         element.textContent = formattedMonth
    //     })
    // }

    function getNightsCount(startDate, endDate) {
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const nightsCount = dates.startDate && dates.endDate ? getNightsCount(dates.startDate, dates.endDate) : 0

    function handleClear() {
        onSetDates({ startDate: '', endDate: '' });
    }
    return (
        <div className="when-static">
            <div className="custom-header">
                {nightsCount > 0 ? (
                    <div>
                        <h3>
                            {nightsCount} nights <span>in {stay.location.city}</span>
                            <div>
                                {dates.startDate ? dates.startDate.toDateString() : ''} -{' '}
                                {dates.endDate ? dates.endDate.toDateString() : ''}
                            </div>
                        </h3>
                    </div>
                ) : (
                    <div>
                        <h3>Select checkout date</h3>
                        <div>Minimum stay: 2 nights</div>
                    </div>
                )}
            </div>

            <DateRangePicker
                ranges={[{
                    startDate: dates.startDate || null,
                    endDate: dates.endDate || null,
                    key: 'selection',
                    color: '#f7f7f7'
                }]}
                months={monthsAmount}
                direction="horizontal"
                showDateDisplay={false}
                moveRangeOnFirstSelection={false}
                showPreview={true}
                minDate={new Date()}
                maxDate={addDays(new Date(), 365)}
                staticRanges={[]}
                inputRanges={[]}
                onChange={handleDateChange}
            />
            <div className='btns'>
                <button className='clear btn-link' onClick={handleClear}>Clear</button>
                <button className="black" onClick={() => setIsWhenOpen(false)}>Close</button>
            </div>

        </div>
    )
}
