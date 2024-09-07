import plusIcon from '../../assets/imgs/icons/plus.svg'
import minusIcon from '../../assets/imgs/icons/minus.svg'


export function NumberInput({ label, value, min = 1, max = 99, onChange }) {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="number-input">
            <label>{label}</label>
            <div className="input-group">
                <button type="button" className="decrement" onClick={handleDecrement}>
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                        <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                    </svg>
                </button>
                <input
                    type="number"
                    value={value}
                    readOnly
                />
                <button type="button" className="increment" onClick={handleIncrement}>
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                        <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}