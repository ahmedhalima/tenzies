export default function Die(props) {
    const classItem = props.isHeld ? 'isHeld' : '';
    return (
        <button
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            onClick={props.hold} className={classItem}>
            {props.value}
        </button>
    );
}