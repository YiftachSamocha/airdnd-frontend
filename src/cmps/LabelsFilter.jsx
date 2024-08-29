import { useEffect, useState } from "react";
import { getData } from "../services/stay.data";
import arrowRight from '../assets/imgs/arrow-right.png'
import arrowLeft from '../assets/imgs/arrow-left.png'
import { store } from "../store/store";
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import { useSelector } from "react-redux";

export function LabelsFilter() {
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const allLabels = getData('labels')
    const [slicedLabels, setSlicedLabels] = useState([])
    const [selectedLabel, setSelectedLabel] = useState(allLabels[0])
    const [startLabel, setStartLabel] = useState(0)
    const max = allLabels.length
    const INDEX_SIZE = 10

    // useEffect(() => {
    //     const newLabels = allLabels.slice(startLabel, startLabel + INDEX_SIZE)
    //     setSlicedLabels(newLabels)
    // }, [startLabel])

    // useEffect(() => {
    //     if (filterBy.label) setSelectedLabel(filterBy.label)
    // }, [filterBy.label])

    function changeIndex(leftRight) {
        let newStart
        if (leftRight === 'right') {
            newStart = startLabel + INDEX_SIZE
            if (newStart + INDEX_SIZE > max) {
                newStart = max - INDEX_SIZE
            }
        }
        else {
            newStart = startLabel - INDEX_SIZE
            if (newStart < 0) {
                newStart = 0
            }
        }
        setStartLabel(newStart)
    }

    function selectLabel(label) {
        setSelectedLabel(label)
        store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, label } })
    }

    return <section className="labels-filter">
        {(startLabel > 0) && <button onClick={() => changeIndex('left')} ><img src={arrowLeft} alt="" /></button>}
        <section className="labels-container">
            {slicedLabels.map(label => {
                return <div key={label.label} onClick={() => selectLabel(label)}
                    className={label.label === selectedLabel.label ? 'selected' : ''}>
                    <img src={label.img} />
                    <p>{label.label}</p>
                </div>
            })}
        </section>
        {(startLabel + INDEX_SIZE) < allLabels.length && <button onClick={() => changeIndex('right')}> <img src={arrowRight} alt="" /> </button>}
    </section>
}