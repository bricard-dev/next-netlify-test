import { Select } from '@sanity/ui';
import { set, StringInputProps } from 'sanity';
import { ALLOWED_TIMES } from '../objects/timeValue';

export function TimeValueInput(props: StringInputProps) {
  const { onChange, value = '', readOnly } = props;

  // Récupérer minTime depuis les options du schéma si disponible
  const minTime = (props.schemaType.options as { minTime?: string } | undefined)
    ?.minTime;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(set(newValue));
  };

  // Filtrer les horaires selon minTime
  const availableTimes = minTime
    ? ALLOWED_TIMES().filter((time) => time.value > minTime)
    : ALLOWED_TIMES();

  return (
    <Select value={value} onChange={handleChange} disabled={readOnly}>
      {availableTimes.map((time) => (
        <option key={time.value} value={time.value}>
          {time.title}
        </option>
      ))}
    </Select>
  );
}
