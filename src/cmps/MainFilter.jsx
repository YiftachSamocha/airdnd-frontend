import { useEffect, useState } from "react";
import { store } from '../store/store'
import { Where } from "./MainFilterCmps/Where";
import { When } from "./MainFilterCmps/When";
import { Who } from "./MainFilterCmps/Who";
import { format } from 'date-fns';
import searchImg from "../assets/imgs/search.png";
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { stayService } from "../services/stay";

export function MainFilter() {
    const [openType, setOpenType] = useState('')
    const [whereInput, setWhereInput] = useState('')
    const [whoInput, setWhoInput] = useState('')
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())

    useEffect(() => {
        if (filterBy.where) {
            setOpenType('when-start')
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

    function createGuestsString(capacity) {
        const sum = capacity.adults + capacity.children + capacity.infants
        if (sum < 1) return ''
        return sum + ' guests'
    }

    function submitFilter() {
        store.dispatch({ type: SET_FILTER_BY, filterBy })
        setOpenType('')
    }

    function deleteFilter(type) {
        const emptyFilter = stayService.getDefaultFilter()
        switch (type) {
            case 'where':
                setFilterBy(prev => ({ ...prev, where: emptyFilter.where }))
                setWhereInput('')
                break
            case 'when-start':
            case 'when-end':
                setFilterBy(prev => ({ ...prev, when: emptyFilter.when }))
                break
            case 'who':
                setFilterBy(prev => ({ ...prev, who: emptyFilter.who }))
                setWhoInput('')
                break
        }
    }
    function isDeleteBtnShown(type) {
        if (type !== openType) return false
        switch (type) {
            case 'where':
                if (!filterBy.where) return false
                break
            case 'when-start':
                if (!filterBy.when.startDate) return false
                break
            case 'when-end':
                if (!filterBy.when.endDate) return false
                break
            case 'who':
                if (filterBy.who.adults <= 0 && filterBy.who.children <= 0 && filterBy.who.infants <= 0) return false
                break
        }
        return true
    }

    return <section className={`main-filter ${openType ? 'has-selection' : ''}`} >
        <div onClick={() => setOpenType('where')} className={`where-input ${openType === 'where' ? 'selected' : ''}`}>
            <div>
                <label htmlFor="">Where</label>
                <input type="text" placeholder="Search destinations" value={whereInput}
                    onChange={handleChangeWhere} />
            </div>
            {isDeleteBtnShown('where') && <button onClick={() => deleteFilter('where')} >x</button>}
            {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
        </div>

        <div className="when-input">
            <div onClick={() => setOpenType('when-start')} className={`when-input-start ${openType === 'when-start' ? 'selected' : ''}`}>
                <div>
                    <label htmlFor="">Check in</label>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.startDate ? format(filterBy.when.startDate, 'MMM dd') : ''} />
                </div>
                {isDeleteBtnShown('when-start') && <button onClick={() => deleteFilter('when-start')} >X</button>}
            </div>


            <div onClick={() => setOpenType('when-end')} className={`when-input-end ${openType === 'when-end' ? 'selected' : ''}`}>
                <div>
                    <label htmlFor="">Check out</label>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.endDate ? format(filterBy.when.endDate, 'MMM dd') : ''}
                    />
                </div>
                {isDeleteBtnShown('when-end') && <button onClick={() => deleteFilter('when-end')} >X</button>}
            </div>
            {(openType === 'when-start' || openType === 'when-end') && <When dates={filterBy.when} setDates={changeFilterWhen} />}
        </div>

        <div onClick={() => setOpenType('who')} className={`who-input ${openType === 'who' ? 'selected' : ''}`}>
            <div>
                <div>
                    <label htmlFor="">Who</label>
                    <input type="text" placeholder="Add guests"
                        value={whoInput} readOnly />
                </div>
                {isDeleteBtnShown('who') && <button onClick={() => deleteFilter('who')} >X</button>}
            </div>
            {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />}
            <button onClick={submitFilter} className="search-button"> <img src={searchImg} /></button>
        </div>
    </section >


}