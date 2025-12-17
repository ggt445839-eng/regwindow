// src/components/regform/forms/buttons/Tosend.tsx
interface TosendProps {
    onSubmit: () => void;
    text?: string;
    disabled?: boolean;
}

const Tosend = ({ onSubmit, text = "Отправить", disabled = false }: TosendProps) => {
    return (
        <button
            className="button button-primary"
            onClick={onSubmit}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Tosend;