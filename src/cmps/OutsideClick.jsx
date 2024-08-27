import React, { useEffect, useRef } from 'react';

export function OutsideClick({ onOutsideClick, children }) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // Check if the click is outside the component
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        // Attach the listener to document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick]);

    return <div ref={ref}>{children}</div>;
};


