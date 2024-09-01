import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';

export function When({ dates, setDates, breakpoint = 950 }) {
    const [monthsAmount, setMonthsAmount] = useState(2);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > breakpoint && monthsAmount !== 2) {
                setMonthsAmount(2);
            } else if (window.innerWidth <= breakpoint && monthsAmount !== 1) {
                setMonthsAmount(1);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [breakpoint, monthsAmount]);

    function handleDateChange(ranges) {
        const { startDate, endDate } = ranges.selection;

        // Normalize the dates to avoid time shift issues
        const normalizedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
        const normalizedEndDate = endDate ? new Date(endDate.setHours(0, 0, 0, 0)) : null;

        console.log('Current Stage:', isSelectingEndDate ? 'Selecting End Date' : 'Selecting Start Date');
        console.log('Selected Range:', { startDate: normalizedStartDate, endDate: normalizedEndDate });
        console.log('Previous Dates:', dates);

        if (!isSelectingEndDate) {
            // First click: select the start date
            console.log('Selecting Start Date');
            setDates({ startDate: normalizedStartDate, endDate: null });
            setIsSelectingEndDate(true);
        } else {
            // Second click: select the end date
            if (normalizedStartDate && normalizedEndDate && normalizedStartDate.getTime() !== normalizedEndDate.getTime()) {
                console.log('Selecting End Date');
                setDates({ startDate: dates.startDate || normalizedStartDate, endDate: normalizedEndDate });
            } else {
                console.log('Single Day Selection or Resetting');
                setDates({ startDate: normalizedStartDate, endDate: null });
            }
            setIsSelectingEndDate(false);
        }

        // Log the updated dates immediately after setting them
        setTimeout(() => {
            console.log('Updated Dates:', dates);
            console.log('------------------------------------');
        }, 0); // Using setTimeout to ensure the state is updated before logging
    }

    return (
        <div className="when">
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
                retainEndDateOnFirstSelection={false}
                showPreview={true}
                minDate={new Date()}
                maxDate={addDays(new Date(), 365)}
                staticRanges={[]}
                inputRanges={[]}
                onChange={handleDateChange}
            />
        </div>
    );
}
