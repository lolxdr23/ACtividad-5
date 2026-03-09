function Button({
                    type = "button",
                    text = "No text provided",
                    action = () => {},
                    variant = "primary",
                    disabled = false,
                }) {
    return (
        <button
            type={type}
            className={`app-button app-button-${variant}`}
            onClick={action}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;