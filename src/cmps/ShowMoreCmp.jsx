import { useEffect, useState } from 'react'
import { ModalCmp } from './ModalCmp.jsx' // Import the Modal component
import arrowIcon from '../assets/imgs/icons/arrow-right.svg'

export function ShowMoreCmp({ content, limit, type, stay, isModalOpen, toggleModal }) {
    console.log('Modal is open', isModalOpen)
    const buttonClass = type === 'amenities' ? 'white' : 'btn-link'
    const buttonLabel = type === 'amenities'
        ? `Show all ${content.length} amenities`
        : type === 'description'
            ? (
                <>
                    Show more <img src={arrowIcon} alt="Arrow Right" className="arrow-icon" />
                </>
            )
            : 'Show More'

    useEffect(() => {
        console.log('Toggling modal');

    }, [isModalOpen])

    function groupItemsByType(items) {
        return items.reduce(function (acc, item) {
            acc[item.type] = acc[item.type] || []
            acc[item.type].push(item)
            return acc
        }, {})
    }

    function renderItem(item, index) {
        // debugger
        return (
            <div key={index} className={`item ${index}`}>
                <div>
                    {item.imgUrl && (
                        <img
                            src={item.imgUrl}
                            alt={item.name || 'Image'}
                            className="details-icon"
                        />
                    )}
                    <span>{item.name || item.text || item.toString()}</span>
                </div>
                {isModalOpen && <hr />}
            </div>
        )
    }

    function renderContent(items, limit) {
        if (typeof items === 'string') {
            return isModalOpen ? items : items.slice(0, limit)
        }

        if (isModalOpen) {
            const groupedItems = groupItemsByType(items)
            return Object.keys(groupedItems).map((type, index) => (
                <div key={index} className="group">
                    <h3>{type}</h3>
                    {groupedItems[type].map(renderItem)}
                </div>
            ))
        } else {
            return items.slice(0, limit).map(renderItem)
        }
    }

    return (
        <div className={`show-more ${type}-style`}>
            <div className="items">{renderContent(content, limit)}
                {type === 'description' ? '...' : ''}
            </div>
            
            {content.length >= limit && (
                <button onClick={toggleModal} className={buttonClass}>
                    {buttonLabel}
                </button>
            )}

            {isModalOpen && (
                <ModalCmp onClose={toggleModal} type={type} stay={stay}>
                    <p>{renderContent(content, content.length)}</p>
                </ModalCmp>
            )}
        </div>
    )
}