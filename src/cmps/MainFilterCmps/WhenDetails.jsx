import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { addDays, addMonths, isBefore, isAfter, format } from 'date-fns';
import { findFirstAvailableNights } from '../../services/util.service';

export function WhenDetails({ dates, setDates, stay, breakpoint = 1200 }) {
    const [monthsAmount, setMonthsAmount] = useState(2)

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
                setDates({
                    startDate: availableDates.startDate,
                    endDate: availableDates.endDate,
                })
            }
        }
    }, [reservedDates, dates, setDates])

    useEffect(() => {
        // Call updateMonthNames after the component mounts and after each render
        updateMonthNames()
    }, [monthsAmount, dates])

    function handleDateChange(ranges) {
        const { selection } = ranges
        const startDate = selection.startDate
        const endDate = selection.endDate

        // Update the state with the selected dates
        setDates({
            startDate,
            endDate,
        })

        // Format the dates to a suitable format for the URL, e.g., 'YYYY-MM-DD'
        const formattedStartDate = format(startDate, 'yyyy-MM-dd')
        const formattedEndDate = format(endDate, 'yyyy-MM-dd')

        // Get the current URL search parameters
        const searchParams = new URLSearchParams(window.location.search)

        // Update the 'checkin' and 'checkout' search parameters
        searchParams.set('start_date', formattedStartDate)
        searchParams.set('end_date', formattedEndDate)

        // Update the URL with the new search parameters
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        window.history.replaceState(null, '', newUrl)
    }

    function updateMonthNames() {
        // Select all elements with the class 'rdrMonthName'
        const monthElements = document.querySelectorAll('.rdrMonthName')

        // Loop through each element and update the month name
        monthElements.forEach((element, index) => {
            // Get the current date based on the month element's index
            const currentDate = new Date()
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + index)

            // Format the month name to full month name and year (e.g., 'September 2024')
            const formattedMonth = format(monthDate, 'MMMM yyyy')

            // Update the text content of the month element
            element.textContent = formattedMonth
        })
    }

    function getNightsCount(startDate, endDate) {
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const nightsCount = dates.startDate && dates.endDate ? getNightsCount(dates.startDate, dates.endDate) : 0

    // function findFirstAvailableNights(reservedRanges, nightsNeeded) {
    //     const today = new Date()
    //     let currentDate = addDays(today, 1)
    //     let foundNights = []

    //     while (foundNights.length < nightsNeeded) {
    //         const isReserved = reservedRanges.some(range =>
    //             isBefore(currentDate, new Date(range.end)) && isAfter(currentDate, new Date(range.start))
    //         )

    //         if (!isReserved) {
    //             foundNights.push(currentDate)
    //         } else {
    //             foundNights = [] // Reset if a reserved date is found within the needed range
    //         }

    //         currentDate = addDays(currentDate, 1)

    //         if (foundNights.length === nightsNeeded) {
    //             return {
    //                 startDate: foundNights[0],
    //                 endDate: foundNights[nightsNeeded - 1],
    //             }
    //         }
    //     }
    //     return null // Return null if no suitable range is found
    // }

    return (
        <div className="when-static">
            <div className="custom-header">
                {nightsCount > 0 ? (
                    <div>
                        <h3>
                            {nightsCount} nights in {stay.location.city}
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
        </div>
    )
}
