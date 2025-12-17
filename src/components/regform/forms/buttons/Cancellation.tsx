// src/components/regform/forms/buttons/Cancellation.tsx
interface CancellationProps {
    onCancel: () => void;
    disabled?: boolean;
}

const Cancellation = ({ onCancel, disabled = false }: CancellationProps) => {
    return (
        <button
            className="button button-secondary"
            onClick={onCancel}
            disabled={disabled}
        >
            Отменить
        </button>
    );
};

export default Cancellation;