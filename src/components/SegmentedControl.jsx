import { useId } from 'react';

/**
 * A radio group styled as a segmented control. Built on native radio inputs,
 * so keyboard support (arrow keys, focus, form semantics) comes for free.
 */
export default function SegmentedControl({ legend, options, value, onChange, size = 'md' }) {
  const name = useId();

  return (
    <fieldset className={`segmented segmented--${size}`}>
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="segmented__option" data-tone={option.tone}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="segmented__label">
            {option.tone && <span className="segmented__dot" aria-hidden="true" />}
            {option.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
