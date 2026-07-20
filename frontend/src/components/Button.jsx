export default function Button({ text, type = "submit", ...props }) {
  return (
    <button className="btn-primary login-button" type={type} {...props}>
      {text}
    </button>
  );
}