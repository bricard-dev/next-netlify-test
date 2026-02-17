import { describe, expect, it } from 'vitest';
import type { DayHours } from '@/sanity/queries/settings';
import type { SiteSettings } from '@/sanity/queries/settings';
import {
  formatDaySchedule,
  getGroupedWeekSchedule,
  isOpenNow,
} from '../schedule';

// ---------------------------------------------------------------------------
// formatDaySchedule
// ---------------------------------------------------------------------------

describe('formatDaySchedule', () => {
  it('returns "Fermé" when schedule is null', () => {
    expect(formatDaySchedule(null)).toBe('Fermé');
  });

  it('returns "Fermé" when isOpen is false', () => {
    const schedule: DayHours = { isOpen: false, open: '09:00', close: '18:00' };
    expect(formatDaySchedule(schedule)).toBe('Fermé');
  });

  it('returns "Fermé" when open is missing', () => {
    const schedule: DayHours = { isOpen: true, close: '18:00' };
    expect(formatDaySchedule(schedule)).toBe('Fermé');
  });

  it('returns "Fermé" when close is missing', () => {
    const schedule: DayHours = { isOpen: true, open: '09:00' };
    expect(formatDaySchedule(schedule)).toBe('Fermé');
  });

  it('returns formatted hours for an open day', () => {
    const schedule: DayHours = { isOpen: true, open: '09:00', close: '18:00' };
    expect(formatDaySchedule(schedule)).toBe('09:00 - 18:00');
  });

  it('returns formatted hours with different times', () => {
    const schedule: DayHours = { isOpen: true, open: '08:30', close: '13:00' };
    expect(formatDaySchedule(schedule)).toBe('08:30 - 13:00');
  });
});

// ---------------------------------------------------------------------------
// isOpenNow
// ---------------------------------------------------------------------------

describe('isOpenNow', () => {
  const schedule: DayHours = { isOpen: true, open: '09:00', close: '18:00' };

  it('returns false when schedule is null', () => {
    expect(isOpenNow(null, new Date())).toBe(false);
  });

  it('returns false when isOpen is false', () => {
    const closed: DayHours = { isOpen: false, open: '09:00', close: '18:00' };
    expect(isOpenNow(closed, new Date('2024-01-01T12:00:00'))).toBe(false);
  });

  it('returns true when current time is within the opening hours', () => {
    expect(isOpenNow(schedule, new Date('2024-01-01T12:00:00'))).toBe(true);
  });

  it('returns true when current time equals the opening time', () => {
    expect(isOpenNow(schedule, new Date('2024-01-01T09:00:00'))).toBe(true);
  });

  it('returns false when current time is before opening', () => {
    expect(isOpenNow(schedule, new Date('2024-01-01T08:59:00'))).toBe(false);
  });

  it('returns false when current time equals the closing time', () => {
    expect(isOpenNow(schedule, new Date('2024-01-01T18:00:00'))).toBe(false);
  });

  it('returns false when current time is after closing', () => {
    expect(isOpenNow(schedule, new Date('2024-01-01T19:00:00'))).toBe(false);
  });

  it('returns false when day has no open/close times', () => {
    const noTimes: DayHours = { isOpen: true };
    expect(isOpenNow(noTimes, new Date('2024-01-01T12:00:00'))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getGroupedWeekSchedule
// ---------------------------------------------------------------------------

describe('getGroupedWeekSchedule', () => {
  it('returns [] when settings is null', () => {
    expect(getGroupedWeekSchedule(null)).toEqual([]);
  });

  it('returns [] when settings.hours is undefined', () => {
    const settings = { bakeryName: 'Test' } as SiteSettings;
    expect(getGroupedWeekSchedule(settings)).toEqual([]);
  });

  it('groups Mon-Fri with the same schedule as a range', () => {
    const weekHours: DayHours = { isOpen: true, open: '09:00', close: '18:00' };
    const settings: SiteSettings = {
      bakeryName: 'Test',
      hours: {
        monday: weekHours,
        tuesday: weekHours,
        wednesday: weekHours,
        thursday: weekHours,
        friday: weekHours,
        saturday: { isOpen: false },
        sunday: { isOpen: false },
      },
    };

    const result = getGroupedWeekSchedule(settings);

    const openGroup = result.find((g) => g.formatted === '09:00 - 18:00');
    expect(openGroup).toBeDefined();
    expect(openGroup?.days).toBe('Lun-Ven');

    const closedGroup = result.find((g) => g.formatted === 'Fermé');
    expect(closedGroup).toBeDefined();
    // Saturday (index 5) and Sunday (index 6) are consecutive → range notation
    expect(closedGroup?.days).toBe('Sam-Dim');
  });

  it('lists non-consecutive days with the same schedule separately', () => {
    const sameHours: DayHours = { isOpen: true, open: '09:00', close: '13:00' };
    const settings: SiteSettings = {
      bakeryName: 'Test',
      hours: {
        monday: sameHours,
        tuesday: { isOpen: false },
        wednesday: sameHours,
        thursday: { isOpen: false },
        friday: { isOpen: false },
        saturday: { isOpen: false },
        sunday: { isOpen: false },
      },
    };

    const result = getGroupedWeekSchedule(settings);

    const openGroup = result.find((g) => g.formatted === '09:00 - 13:00');
    expect(openGroup).toBeDefined();
    expect(openGroup?.days).toBe('Lun, Mer');
  });

  it('groups all closed days together', () => {
    const settings: SiteSettings = {
      bakeryName: 'Test',
      hours: {
        monday: { isOpen: false },
        tuesday: { isOpen: false },
        wednesday: { isOpen: false },
        thursday: { isOpen: false },
        friday: { isOpen: false },
        saturday: { isOpen: false },
        sunday: { isOpen: false },
      },
    };

    const result = getGroupedWeekSchedule(settings);
    expect(result).toHaveLength(1);
    expect(result[0].formatted).toBe('Fermé');
    expect(result[0].days).toBe('Lun-Dim');
  });
});
