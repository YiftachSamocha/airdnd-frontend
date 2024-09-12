import { useState } from "react";
import { ShowMoreCmp } from "../ShowMoreCmp.jsx";

export function StayAmenities({ stay, toggleModal, isModalOpen }) {

    // Function to group amenities by type
//     function groupItemsByType(items) {
//         return items.reduce((acc, item) => {
//             const type = item.type || 'Other';
//             if (!acc[type]) acc[type] = [];
//             acc[type].push(item);
//             return acc;
//         }, {});
//     }

//     // Render grouped amenities
//     function renderGroupedAmenities(items) {
//         const groupedItems = groupItemsByType(items);

//         return Object.keys(groupedItems).map((type, index) => (
//             <div key={index} className="modal-group">
//                 <h3>{type}</h3>
//                 {groupedItems[type].map((item, i) => (
//                     <div key={i} className={`item ${i}`}>
//                         <div>
//                             {item.imgUrl && (
//                                 <img src={item.imgUrl} alt={item.name || 'Image'} className="modal-details-icon" />
//                             )}
//                             <span>{item.name || item.text || item.toString()}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         ));
//     }

//     // This function will render content based on the modal state
//     function renderContent() {
//         // return isModalOpen
//         //     ? renderGroupedAmenities(stay.amenities)
//         //     : (
//         <ShowMoreCmp
//             content={stay.amenities}
//             limit={10}
//             modalType="amenities"
//             toggleModal={toggleModal}
//         />
//         // );
//     }

//     return (
//         <>
//             <section className={'flow-amenities'}>
//                 <h3>What this place offers</h3>
//                 <div className={'amenities-list flow-list'}>
//                     <ShowMoreCmp
//                         content={stay.amenities}
//                         limit={10}
//                         modalType="amenities"
//                         toggleModal={toggleModal}
//                     />
//                 </div>
//             </section>

//             {isModalOpen && (
//                 <section className="modal-amenities">
//                     <h3>What this place offers</h3>
//                     <div className="amenities-list modal-list">
//                         {renderGroupedAmenities(stay.amenities)}
//                     </div>
//                 </section>
//             )}
//         </>

//     )
// }

    return (
        <section className="flow-amenities">
            <h3>What this place offers</h3>
            <div className="amenities-list flow-list">
                <ShowMoreCmp
                    content={stay.amenities}
                    limit={10}
                    modalType="amenities"
                    toggleModal={toggleModal}

                />
            </div>
        </section>
    );
}