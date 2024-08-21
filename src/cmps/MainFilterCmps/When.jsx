import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

export function When({dates, setDates}) {
   
    function handleDateChange(ranges) {
        const { selection } = ranges
        setDates({
            startDate: selection.startDate,
            endDate: selection.endDate,
        })
    }
    return <div className="when">
        <DateRangePicker
            ranges={[{ startDate: dates.startDate || new Date(), endDate: dates.endDate || new Date(), key: 'selection', color: '#f7f7f7' }]}
            months={2}
            direction="horizontal"
            showDateDisplay={false}
            moveRangeOnFirstSelection={false}
            showPreview={true}
            minDate={new Date()}
            maxDate={addDays(new Date(), 365)}
            staticRanges={[]}
            inputRanges={[]}
            onChange={handleDateChange} />


    </div>
}