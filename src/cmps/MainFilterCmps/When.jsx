import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';

export function When({ dates, setDates }) {
    const [monthsAmount, setMonthsAmount] = useState(2)
    const [direction, setDirection] = useState('horizontal')
    const BREAKPOINT_WIDE = 920
    const BREAKPOINT_NARROW = 743
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > BREAKPOINT_WIDE && monthsAmount !== 2) {
                setMonthsAmount(2)
            } else if (window.innerWidth <= BREAKPOINT_WIDE && window.innerWidth > BREAKPOINT_NARROW && monthsAmount !== 1) {
                setMonthsAmount(1)
            } else if (window.innerWidth <= BREAKPOINT_NARROW && monthsAmount !== 12) {
                setMonthsAmount(12)
            }

            if (window.innerWidth >= BREAKPOINT_NARROW && direction !== 'horizontal') {
                setDirection('horizontal')
            } else if (window.innerWidth < BREAKPOINT_NARROW && direction !== 'vertical') {
                setDirection('vertical')
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [BREAKPOINT_WIDE, monthsAmount])

    function handleDateChange(ranges) {
        const { selection } = ranges
        setDates({
            startDate: selection.startDate,
            endDate: selection.endDate,
        })
    }

    return <div className="when">
        <DateRangePicker
            ranges={[{
                startDate: dates.startDate || null,
                endDate: dates.endDate || null,
                key: 'selection',
                color: '#f7f7f7'
            }]}
            months={monthsAmount}
            direction={direction}
            showDateDisplay={false}
            moveRangeOnFirstSelection={false}
            showPreview={true}
            minDate={new Date()}
            maxDate={addDays(new Date(), 365)}
            staticRanges={[]}
            inputRanges={[]}
            onChange={handleDateChange}
            preventSnapRefocus={true}
            //calendarFocus="forwards" 
        />
    </div>
}