function InputField({
                        label,
                        name,
                        type = "text",
                        placeholder,
                        value,
                        onChange,
                        error,
                    }) {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                className="form-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {error ? <small className="form-error">{error}</small> : null}
        </div>
    );
}

export default InputField;