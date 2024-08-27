import { useEffect, useState } from "react";
import { stayService } from "../services/stay";
import { store } from '../store/store'
import { Where } from "./MainFilterCmps/Where";
import { When } from "./MainFilterCmps/When";
import { Who } from "./MainFilterCmps/Who";
import { format } from 'date-fns';
import searchImg from "../assets/imgs/search.png";
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { LabelsFilter } from "./LabelsFilter";

export function MainFilter() {
    const [openType, setOpenType] = useState('')
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const [whereInput, setWhereInput] = useState('')
    const [whoInput, setWhoInput] = useState('')

    useEffect(() => {
        if (filterBy.where) {
            setOpenType('when-start');
        }
    }, [filterBy.where])
    
    useEffect(() => {
        submitFilter()
    }, [filterBy.label])

    function handleChangeWhere({ target }) {
        const { value } = target
        setWhereInput(value)
        if (filterBy.where !== '') setFilterBy(prev => ({ ...prev, where: '' }))
    }

    function changeFilterWhere(location) {
        setFilterBy(prev => ({ ...prev, where: location }))
        setWhereInput(location.country === 'Im flexible' ? 'Im flexible' : location.city + ', ' + location.country)
    }

    function changeFilterWhen(range) {
        if (range.startDate !== filterBy.when.startDate) setOpenType('when-end')
        setFilterBy(prev => ({ ...prev, when: range }))
    }

    function changeFilterWho(capacity) {
        setFilterBy(prev => ({ ...prev, who: capacity }))
        const guestsString = createGuestsString(capacity)
        setWhoInput(guestsString)
    }

    function changeFilterLabel(label) {
        setFilterBy(prev => ({ ...prev, label }))
    }

    function createGuestsString(capacity) {
        const sum = capacity.adults + capacity.children + capacity.infants
        if (sum < 1) return ''
        return sum + ' guests'
    }

    function submitFilter() {
        store.dispatch({ type: SET_FILTER_BY, filterBy })
        setOpenType('')
    }


    return <section>
        {/* <section className={`main-filter ${openType ? 'has-selection' : ''}`} >
            <div onClick={() => setOpenType('where')} className={`where-input ${openType === 'where' ? 'selected' : ''}`}>
                <div>
                    <label htmlFor="">Where</label>
                    <input type="text" placeholder="Search destinations" value={whereInput}
                        onChange={handleChangeWhere} />
                </div>
                {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
            </div>

            <div className="when-input">
                <div onClick={() => setOpenType('when-start')} className={`when-input-start ${openType === 'when-start' ? 'selected' : ''}`}>
                    <label htmlFor="">Cheak in</label>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.startDate ? format(filterBy.when.startDate, 'MMM dd') : ''} />
                </div>

                <div onClick={() => setOpenType('when-end')} className={`when-input-end ${openType === 'when-end' ? 'selected' : ''}`}>
                    <label htmlFor="">Cheak out</label>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.endDate ? format(filterBy.when.endDate, 'MMM dd') : ''} />
                </div>
                {(openType === 'when-start' || openType === 'when-end') && <When dates={filterBy.when} setDates={changeFilterWhen} />}
            </div>

            <div onClick={() => setOpenType('who')} className={`who-input ${openType === 'who' ? 'selected' : ''}`}>
                <div>
                    <label htmlFor="">Who</label>
                    <input type="text" placeholder="Add guests"
                        value={whoInput} readOnly />
                </div>
                {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />}
                <button onClick={submitFilter}> <img src={searchImg} /></button>
            </div>
        </section >
        <hr />
        <LabelsFilter filterBy={filterBy} changeFilterBy={changeFilterLabel} /> */}
    </section>

}