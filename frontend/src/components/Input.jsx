import { useId, useState } from "react";
import "../styles/Input.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
 
export default function Input({
  id,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const generatedId = useId();

    const inputId = id || generatedId;

    const getIcon = () => {
        if (type === "text") return <FaUser aria-hidden="true" />;
        if (type === "email") return <FaEnvelope aria-hidden="true" />;
        if (type === "password") return <FaLock aria-hidden="true" />;
        return null;
    };

  return (
    <div className="input-group">
        <label htmlFor={inputId}>
            {label}
            {required && (
                <span aria-hidden="true">
                    {" *"}
                </span>
            )}
        </label>

        <div className="input-wrapper">
            <span className="input-icon" aria-hidden="true">
                {getIcon()}
            </span>

            <input
                id={inputId}
                name={name}                
                type={
                    isPassword
                    ? (showPassword ? "text" : "password")
                    : type
                }
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                {...props}
            />

            {isPassword && (
                <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                        showPassword
                            ? "Ocultar senha"
                            : "Mostrar senha"
                    }
                >
                    {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
            )}

        </div>
    </div>
  );
}