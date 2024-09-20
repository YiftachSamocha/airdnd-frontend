import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { addDays, addMonths, isBefore, isAfter, format, isSameDay, eachDayOfInterval, parseISO } from 'date-fns';
import { findFirstAvailableNights } from '../../services/util.service';
import xIcon from '../../assets/imgs/icons/x.svg'
export function WhenDetails({ dates, onSetDates, stay, breakpoint = 1200, closeWhen, type, monthsAmount }) {
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

    const { reservedDates } = stay
    const [disabledDates, setDisabledDates] = useState([])

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

    console.log(dates, onSetDates, stay, breakpoint = 1200, closeWhen, type, monthsAmount);
    

    useEffect(() => {
        // Create an array of all unavailable dates from reservedDates
        const allDisabledDates = reservedDates.flatMap(({ startDate, endDate }) =>
            eachDayOfInterval({
                start: parseISO(startDate),
                end: parseISO(endDate),
            })
        )
        setDisabledDates(allDisabledDates);
    }, [reservedDates])

    

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
            onSetDates({ startDate, endDate })

            if (typeof closeWhen === 'function') {
                closeWhen() // Close the modal if closeWhen exists
            }

            setIsSelectingEndDate(false) // Reset the flag
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
                <div className='btns top'>
                    <button className="close" onClick={closeWhen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '16px',
                                width: '16px',
                                stroke: 'currentColor',
                                strokeWidth: '2.66667',
                                overflow: 'visible'
                            }}
                        >
                            <path d="M6 6 L26 26 M26 6 L6 26" />
                        </svg>
                    </button>
                    <button className='clear btn-link' onClick={handleClear}>Clear dates</button>
                </div>
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
                <div className="weekdays-fixed">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>
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
                disabledDates={disabledDates}  
            />
            <div className='btns'>
                <button className='clear btn-link' onClick={handleClear}>Clear</button>
                <button className="black" onClick={closeWhen}>Close</button>
            </div>

        </div >
    )
}
