import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';

export function When({ dates, setDates, breakpoint = 950 }) {
    const [monthsAmount, setMonthsAmount] = useState(2)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > breakpoint && monthsAmount !== 2) {
                setMonthsAmount(2)
            } else if (window.innerWidth <= breakpoint && monthsAmount !== 1) {
                setMonthsAmount(1)
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [breakpoint, monthsAmount])

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
}