import './ModalSmall.css';

function ModalSmall({ isVisible, left, text, index, toSwitch }) {

    const arrowPosition = {
        0: 'left',
        1: 'center',
        2: 'center',
        3: 'center', 
        4: 'right'
    }

    return (
        <div className={window.innerWidth > 500 ? 'modal__small' : `modal__small ${arrowPosition[index]}`} style={{ display: isVisible ? 'block' : 'none', left: `${left}%` }}>
            <p className="modal__small__text">{text}</p>
            <button className="modal__small__btn" onClick={toSwitch}>Понятно</button>
        </div>
    );
}

export default ModalSmall;