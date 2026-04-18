type AutocompleteFieldProps<T> = {
  label: string;
  name: string;
  value: string;
  options: T[];
  getLabel: (item: T) => string;
  onChange: (value: string) => void;
};

export function AutocompleteField<T>({
  label,
  name,
  value,
  options,
  getLabel,
  onChange,
}: AutocompleteFieldProps<T>) {
  const filtered = options.filter((x) =>
    getLabel(x).toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <>
      <div>
        <label>{label}:</label>
      </div>

      <div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div>
        <select onChange={(e) => onChange(e.target.value)}>
          <option value="">-- select --</option>
          {filtered.map((x, i) => (
            <option key={i} value={getLabel(x)}>
              {getLabel(x)}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
