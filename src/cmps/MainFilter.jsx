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

export function MainFilter({ filterBy, setFilterBy }) {
    const [openType, setOpenType] = useState('')
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
                setFilterBy(prev => ({ ...prev, when: { ...prev.when, startDate: emptyFilter.when.startDate } }))
                break
            case 'when-end':
                setFilterBy(prev => ({ ...prev, when: { ...prev.when, endDate: emptyFilter.when.endDate } }))
                break
            case 'who':
                setFilterBy(prev => ({ ...prev, who: emptyFilter.who }))
                setWhoInput('')
                break
        }
    }

    return <section className={`main-filter ${openType ? 'has-selection' : ''}`} >
        <div onClick={() => setOpenType('where')} className={`where-input ${openType === 'where' ? 'selected' : ''}`}>
            <label htmlFor="">Where</label>
            <div>
                <input type="text" placeholder="Search destinations" value={whereInput}
                    onChange={handleChangeWhere} />
                {filterBy.where && <button onClick={() => deleteFilter('where')} >X</button>}
            </div>
            {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
        </div>

        <div className="when-input">
            <div onClick={() => setOpenType('when-start')} className={`when-input-start ${openType === 'when-start' ? 'selected' : ''}`}>
                <label htmlFor="">Cheak in</label>
                <div>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.startDate ? format(filterBy.when.startDate, 'MMM dd') : ''} />
                    {filterBy.when.startDate && <button onClick={() => deleteFilter('when-start')} >X</button>}
                </div>
            </div>


            <div onClick={() => setOpenType('when-end')} className={`when-input-end ${openType === 'when-end' ? 'selected' : ''}`}>

                <label htmlFor="">Cheak out</label>
                <div>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.endDate ? format(filterBy.when.endDate, 'MMM dd') : ''}
                    />
                    {filterBy.when.endDate && <button onClick={() => deleteFilter('when-end')} >X</button>}
                </div>
            </div>
            {(openType === 'when-start' || openType === 'when-end') && <When dates={filterBy.when} setDates={changeFilterWhen} />}
        </div>

        <div onClick={() => setOpenType('who')} className={`who-input ${openType === 'who' ? 'selected' : ''}`}>
            <div>
                <label htmlFor="">Who</label>
                <div>
                    <input type="text" placeholder="Add guests"
                        value={whoInput} readOnly />
                    {filterBy.who && <button onClick={() => deleteFilter('who')} >X</button>}
                </div>
            </div>
            {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />}
            <button onClick={submitFilter} className="search-button"> <img src={searchImg} /></button>
        </div>
    </section >


}