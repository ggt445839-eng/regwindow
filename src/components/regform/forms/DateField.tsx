const DateField = ({
                       id,
                       label,
                       type,
                       placeholder,
                       value,
                       onChange,
                       showCheck
                   }: {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    showCheck?: boolean;
}) => {
    return (
        <div className="form-row">
            <label htmlFor={id} className="form-label">{label}</label>

            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="form-input"
            />

            {showCheck && <div>✔</div>}
        </div>
    );
};

export default DateField;
