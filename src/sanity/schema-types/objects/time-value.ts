import { defineType } from 'sanity';
import { TimeValueInput } from '../components/time-value-input';

export const timeValueType = defineType({
  name: 'timeValue',
  title: 'Time',
  type: 'string',
  components: {
    input: TimeValueInput,
  },
});

// A function that generates an array of times from 00:00 to 23:30
export function ALLOWED_TIMES() {
  const times: Array<{ title: string; value: string }> = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      times.push({ title: time, value: time });
    }
  }
  return times;
}
