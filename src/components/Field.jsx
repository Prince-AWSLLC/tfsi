export function Field({ id, label, as = "input", children, className = "", ...rest }) {
  const Control = as;
  const isSelect = as === "select";
  return (
    <div className={`field ${isSelect ? "field-select " : ""}${className}`}>
      <Control id={id} name={id} placeholder=" " {...rest}>
        {children}
      </Control>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export function CheckRow({ name, label, ...rest }) {
  return (
    <label className="check-row">
      <input type="checkbox" name={name} {...rest} />
      <span>{label}</span>
    </label>
  );
}
