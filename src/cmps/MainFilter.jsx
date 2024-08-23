import { useState } from "react";
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

export function MainFilter() {
    const [openType, setOpenType] = useState('')
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const [whereInput, setWhereInput] = useState('')
    const [whoInput, setWhoInput] = useState('')

    function handleChangeWhere({ target }) {
        const { value } = target
        setWhereInput(value)
        if (filterBy.where !== '') setFilterBy(prev => ({ ...prev, where: '' }))
    }

    function changeFilterWhere(location) {
        setOpenType('when')
        setFilterBy(prev => ({ ...prev, where: location }))
        setWhereInput(location.country === 'Im flexible' ? 'Im flexible' : location.city + ', ' + location.country)

    }

    function changeFilterWhen(range) {
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


    return <section className="main-filter" >
        <div onClick={() => setOpenType('where')} className="where-input">
            <label htmlFor="">Where</label>
            <input type="text" placeholder="Search destinations" value={whereInput}
                onChange={handleChangeWhere} />
            {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
        </div>

        <hr />


        <div className="when-input">
            <div onClick={() => setOpenType('when')} >
                <label htmlFor="">Cheak in</label>
                <input type="text" placeholder="Add dates" readOnly
                    value={filterBy.when.startDate ? format(filterBy.when.startDate, 'MMM dd') : ''} />
            </div>
            <hr />
            <div onClick={() => setOpenType('when')}>
                <label htmlFor="">Cheak out</label>
                <input type="text" placeholder="Add dates" readOnly
                    value={filterBy.when.endDate ? format(filterBy.when.endDate, 'MMM dd') : ''} />
            </div>
            {openType === 'when' && <When dates={filterBy.when} setDates={changeFilterWhen} />}
        </div>

        <hr />

        <div onClick={() => setOpenType('who')} className="who-input">
            <div>
                <label htmlFor="">Who</label>
                <input type="text" placeholder="Add guests"
                    value={whoInput} readOnly />
            </div>
            {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />}
            <button onClick={submitFilter}> <img src={searchImg} /></button>
        </div>
    </section >

}