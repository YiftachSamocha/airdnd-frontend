import { useEffect, useState, useRef } from "react";
import { format } from 'date-fns';
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import { stayService } from "../services/stay";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { Who } from "../cmps/MainFilterCmps/Who";
import { Where } from "../cmps/MainFilterCmps/Where";
import { When } from "../cmps/MainFilterCmps/When";

export function MainFilterMobile() {
    const [openType, setOpenType] = useState('where')
    const [whereInput, setWhereInput] = useState('')
    const [whoInput, setWhoInput] = useState('')
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const gFilter = useSelector(state => state.stayModule.filterBy)
    const filterRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 743) {
                navigate('/stay')
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        changeFilterWhere(gFilter.where)
        changeFilterWhen(gFilter.when)
        changeFilterWho(gFilter.who)
        setTimeout(() => {
            setOpenType('where')
        }, 100)
    }, [gFilter])


    function handleChangeWhere({ target }) {
        const { value } = target
        setWhereInput(value)
        if (filterBy.where !== '') setFilterBy(prev => ({ ...prev, where: '' }))
    }

    function changeFilterWhere(location) {
        setFilterBy(prev => ({ ...prev, where: location }))
        if (location.city && location.country) {
            setWhereInput(location.country === 'Im flexible' ? 'Im flexible' : location.city + ', ' + location.country)
        } else {
            setWhereInput('')
        }
        setTimeout(() => {
            setOpenType('when')
        }, 100)
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
    function createParamsStr() {
        let queryStr = '/stay?'
        if (filterBy.where && filterBy.where.city && filterBy.where.country) {
            queryStr += `city=${filterBy.where.city}&country=${filterBy.where.country}&`
        }
        if (filterBy.when && filterBy.when.startDate && filterBy.when.endDate) {
            queryStr += `start_date=${format(filterBy.when.startDate, 'yyyy-MM-dd')}&end_date=${format(filterBy.when.endDate, 'yyyy-MM-dd')}&`
        }
        if (filterBy.who) {
            if (filterBy.who.adults) {
                queryStr += `adults=${filterBy.who.adults}&`
            }
            if (filterBy.who.children) {
                queryStr += `children=${filterBy.who.children}&`
            }
            if (filterBy.who.infants) {
                queryStr += `infants=${filterBy.who.infants}&`
            }
        }
        return queryStr
    }

    function submitFilter() {
        store.dispatch({ type: SET_FILTER_BY, filterBy })
        setTimeout(() => {
            setOpenType('')
        }, 100)
        const queryStr= createParamsStr()
        navigate(queryStr)
    }

    function deleteFilter() {
        const emptyFilter = stayService.getDefaultFilter()
        setFilterBy(prev => ({ ...prev, where: emptyFilter.where, when: emptyFilter.when, who: emptyFilter.who }))
        setWhoInput('')
        setWhereInput('')
        setOpenType('where')

    }

    return <section className={`main-filter mobile`} ref={filterRef} >
        <div className="mobile-container">
            <button className="closing-btn" onClick={() => navigate('/stay')}>x</button>
            <div onClick={() => setOpenType('where')} className={`where-input ${openType === 'where' ? 'selected' : ''}`}>
                <div>
                    <label htmlFor="">Where</label>
                    <input type="text" placeholder="Im flexible" value={whereInput}
                        onChange={handleChangeWhere} />
                </div>
                {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
            </div>

            <div className="when-input">
                <div onClick={() => setOpenType('when')} className={`when-input-all ${openType === 'when' ? 'selected' : ''}`}>
                    <label htmlFor="">When</label>
                    <input type="text" placeholder="Add dates" readOnly
                        value={filterBy.when.endDate && filterBy.when.startDate ?
                            (format(filterBy.when.startDate, 'MMM dd') + ' - ' + format(filterBy.when.endDate, 'MMM dd')) : ''}
                    />
                </div>
                {(openType === 'when') && <When dates={filterBy.when} setDates={changeFilterWhen} />}
            </div>

            <div onClick={() => setOpenType('who')} className={`who-input ${openType === 'who' ? 'selected' : ''}`}>
                <div className="who-content">
                    <div>
                        <label htmlFor="">Who</label>
                        <input type="text" placeholder="Add guests"
                            value={whoInput} readOnly />
                    </div>
                </div>
                {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />}
            </div>
        </div>
        <div className="mobile-btns">
            <button onClick={deleteFilter}>Clear all</button>
            <button onClick={submitFilter}>Search</button>

        </div>
    </section >


}