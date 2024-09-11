import { useEffect, useState, useRef } from "react";
import { store } from '../store/store'
import { Where } from "./MainFilterCmps/Where";
import { When } from "./MainFilterCmps/When";
import { Who } from "./MainFilterCmps/Who";
import { format } from 'date-fns';
import searchImg from "../assets/imgs/search.png";
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import { stayService } from "../services/stay";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function MainFilter() {
    const [filterBy, setFilterBy]= useState(stayService.getDefaultFilter())
    const [openType, setOpenType] = useState('')
    const [whereInput, setWhereInput] = useState('')
    const [whoInput, setWhoInput] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const gFilter = useSelector(state => state.stayModule.filterBy)
    const filterRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 743)
    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < 743)
        }

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenType('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        updateGFilterBySearchParams()
    }, [searchParams])

    useEffect(() => {
        updateSearchParams()
        changeFilterWhere(gFilter.where)
        changeFilterWhen(gFilter.when)
        changeFilterWho(gFilter.who)
        setTimeout(() => {
            setOpenType('')
        }, 100)
    }, [gFilter])


    function updateGFilterBySearchParams() {
        const city = searchParams.get('city')
        const country = searchParams.get('country')
        const startDate = searchParams.get('start_date')
        const endDate = searchParams.get('end_date')
        const adults = searchParams.get('adults')
        const children = searchParams.get('children')
        const infants = searchParams.get('infants')
        const pets = searchParams.get('pets')

        const updatedFilterBy = {
            ...gFilter,
            where: {
                city: city || '',
                country: country || ''
            },
            when: {
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null
            },
            who: {
                adults: adults ? +adults : 0,
                children: children ? +children : 0,
                infants: infants ? +infants : 0,
                pets: pets ? +pets : 0
            }
        }

        store.dispatch({ type: SET_FILTER_BY, filterBy: updatedFilterBy })
    }


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
            setOpenType('when-start')
        }, 100)
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
        updateSearchParams()
        setTimeout(() => {
            setOpenType('')
        }, 100)
        if (location.pathname !== '/' && location.pathname !== '/stay') navigate('/stay')
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
                setOpenType('when-start')
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

    function updateSearchParams() {
        const params = new URLSearchParams(searchParams)
        if (filterBy.where.city) params.set('city', filterBy.where.city)
        else params.delete('city')
        if (filterBy.where.country) params.set('country', filterBy.where.country)
        else params.delete('country')
        if (filterBy.when.startDate) {
            const startDate = format(filterBy.when.startDate, 'yyyy-MM-dd')
            params.set('start_date', startDate)
        }
        else params.delete('start_date')
        if (filterBy.when.endDate) {
            const endDate = format(filterBy.when.endDate, 'yyyy-MM-dd')
            params.set('end_date', endDate)
        }
        else params.delete('end_date')
        if (filterBy.who.adults) params.set('adults', filterBy.who.adults)
        else params.delete('adults')
        if (filterBy.who.children) params.set('children', filterBy.who.children)
        else params.delete('children')
        if (filterBy.who.infants) params.set('infants', filterBy.who.infants)
        else params.delete('infants')
        if (filterBy.who.pets) params.set('pets', filterBy.who.pets)
        else params.delete('pets')
        setSearchParams(params)
    }


    return <section className={`main-filter ${openType ? 'has-selection' : ''}`} ref={filterRef} >
        <div onClick={() => setOpenType('where')} className={`where-input ${openType === 'where' ? 'selected' : ''}`}>
            <div>
                <label htmlFor="">Where</label>
                <input type="text" placeholder={isNarrow ? 'Im flexible' : 'Search destinations'} value={whereInput}
                    onChange={handleChangeWhere} />
            </div>
            {isDeleteBtnShown('where') && <button onClick={() => deleteFilter('where')} >x</button>}
            {openType === 'where' && <Where input={whereInput} setInput={changeFilterWhere} />}
        </div>

        <div className="when-input">
            <div>
                <div onClick={() => setOpenType('when-start')} className={`when-input-start ${openType === 'when-start' ? 'selected' : ''}`}>
                    <div>
                        <label htmlFor="startdate">Check in</label>
                        <input type="text" placeholder="Add dates" readOnly id="startdate"
                            value={filterBy.when.startDate ? format(filterBy.when.startDate, 'MMM dd') : ''} />
                    </div>
                    {isDeleteBtnShown('when-start') && <button onClick={() => deleteFilter('when-start')} >X</button>}
                </div>


                <div onClick={() => setOpenType('when-end')} className={`when-input-end ${openType === 'when-end' ? 'selected' : ''}`}>
                    <div>
                        <label htmlFor="enddate">Check out</label>
                        <input type="text" placeholder="Add dates" readOnly id="enddate"
                            value={filterBy.when.endDate ? format(filterBy.when.endDate, 'MMM dd') : ''}
                        />
                    </div>
                    {isDeleteBtnShown('when-end') && <button onClick={() => deleteFilter('when-end')} >X</button>}
                </div>
            </div>

            {(openType === 'when-start' || openType === 'when-end') && <When dates={filterBy.when} setDates={changeFilterWhen} />}
        </div>

        <div onClick={() => setOpenType('who')} className={`who-input ${openType === 'who' ? 'selected' : ''}`}>
            <div className="who-content">
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