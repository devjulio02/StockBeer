import { useState } from "react";
import "../styles/Input.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
 
export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const getIcon = () => {
        if (type === "text") return <FaUser />;
        if (type === "email") return <FaEnvelope />;
        if (type === "password") return <FaLock />;
        return null;
    };

  return (
    <div className="input-group">
        <label>{label}</label>

        <div className="input-wrapper">
            <span className="input-icon">
                {getIcon()}
            </span>

            <input
                type={
                    isPassword
                    ? (showPassword ? "text" : "password")
                    : type
                }
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {isPassword && (
                <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye/>}
                </button>
            )}

        </div>
    </div>
  );
}