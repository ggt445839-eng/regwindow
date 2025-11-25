type CancellationProps = {
    onCancel: () => void;
};

const Cancellation = ({ onCancel }: CancellationProps) => {
    return (
        <button className="button button-secondary" onClick={onCancel}>
            Отменить
        </button>
    );
};

export default Cancellation;
