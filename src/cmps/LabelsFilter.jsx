import { useEffect, useState } from "react";
import { getData } from "../services/stay.data";
import arrowRight from '../assets/imgs/arrow-right.png'
import arrowLeft from '../assets/imgs/arrow-left.png'
import { store } from "../store/store";
import { SET_FILTER_BY } from "../store/reducers/stay.reducer";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export function LabelsFilter() {
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const allLabels = getData('labels')
    const [selectedLabel, setSelectedLabel] = useState(allLabels[0])
    const [searchParams, setSearchParams] = useSearchParams()
    const [size, setSize] = useState(10)
    const [translateX, setTranslateX] = useState(0)
    const LABEL_SIZE = 85

    useEffect(() => {
        const handleResize = () => {
            let rightSize = Math.ceil(window.innerWidth / LABEL_SIZE)
            if (size !== rightSize) {
                setSize(rightSize)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [size, window.innerWidth])

    useEffect(() => {
        if (filterBy.label) setSelectedLabel(filterBy.label)
    }, [filterBy.label])

    useEffect(() => {
        updateSearchParams()
    }, [filterBy])

    useEffect(() => {
        const labelParam = searchParams.get('label')
        if (labelParam) {
            const matchedLabel = allLabels.find(label => label.label === labelParam)
            if (matchedLabel) selectLabel(matchedLabel)
        }
    }, [searchParams, allLabels])

    function changeIndex(direction) {
        let newTranslateX = translateX
        if (direction === 'right') {
            newTranslateX -= LABEL_SIZE * size
            if (newTranslateX < -(LABEL_SIZE * (allLabels.length - size))) {
                newTranslateX = -(LABEL_SIZE * (allLabels.length - size))
            }
        } else {
            newTranslateX += LABEL_SIZE * size
            if (newTranslateX > 0) {
                newTranslateX = 0
            }
        }
        setTranslateX(newTranslateX)
    }

    function selectLabel(label) {
        setSelectedLabel(label)
        store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, label } })
        updateSearchParams()
    }

    function updateSearchParams() {
        const params = new URLSearchParams(searchParams)
        if (selectedLabel.label === 'icons') {
            params.delete('label')
            setSearchParams(params)
            return
        }

        if (selectedLabel) params.set('label', selectedLabel.label)
        else params.delete('label')
        setSearchParams(params)
    }

    return <section className="labels-filter">
        {(translateX < 0) && <button onClick={() => changeIndex('left')}><img src={arrowLeft} alt="" /></button>}
        <section className="labels-container" >
            <div className="main-labels-container" style={{ transform: `translateX(${translateX}px)` }}>
                {allLabels.map(label => (
                    <div key={label.label} onClick={() => selectLabel(label)}
                        className={label.label === selectedLabel.label ? 'selected' : ''}>
                        <img src={label.img} alt={label.label} />
                        <p>{label.label}</p>
                    </div>
                ))}
            </div>
        </section>
        {(translateX > -(LABEL_SIZE * (allLabels.length - size))) && <button onClick={() => changeIndex('right')}><img src={arrowRight} alt="" /></button>}
    </section>
}
