export default function Button({ text }) {
  return (
    <button className="btn-primary login-button" type="submit">
      {text}
    </button>
  );
}