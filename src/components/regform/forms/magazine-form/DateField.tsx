interface DateFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    showCheck?: boolean;
    disabled?: boolean;
}

const DateField = ({
                       id,
                       label,
                       type = "datetime-local",
                       value,
                       onChange,
                       showCheck = false,
                       disabled = false,
                   }: DateFieldProps) => {
    return (
        <div className="form-row">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="form-input"
            />
            {showCheck && <span className="check-symbol">✔</span>}
        </div>
    );
};

export default DateField;