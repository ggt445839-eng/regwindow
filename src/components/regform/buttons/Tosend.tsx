type TosendProps = {
    onSubmit: () => void;
};

const Tosend = ({ onSubmit }: TosendProps) => {
    return (
        <button className="button button-primary" onClick={onSubmit}>
            Отправить
        </button>
    );
};

export default Tosend;
