interface EmailProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    showCheck?: boolean;
    disabled?: boolean;
}

const Email = ({
                   id,
                   label,
                   type = "email",
                   placeholder,
                   value,
                   onChange,
                   showCheck = false,
                   disabled = false,
               }: EmailProps) => {
    return (
        <div className="form-row">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="form-input"
            />
            {showCheck && <span className="check-symbol">✔</span>}
        </div>
    );
};

export default Email;