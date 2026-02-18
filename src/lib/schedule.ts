import type { DayHours, SiteSettings } from '@/sanity/queries/settings';

/**
 * Noms des jours de la semaine en français (commence par lundi)
 */
export const WEEKDAY_NAMES = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
] as const;

/**
 * Clés des jours dans le type WeeklyHours (commence par lundi)
 */
export const WEEKDAY_KEYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type WeekdayKey = (typeof WEEKDAY_KEYS)[number];

/**
 * Obtient les horaires pour un jour spécifique
 */
export function getDaySchedule(
  settings: SiteSettings | null,
  dayKey: WeekdayKey
): DayHours | null {
  if (!settings || !settings.hours) return null;
  return settings.hours[dayKey] || null;
}

/**
 * Obtient les horaires du jour actuel
 */
export function getTodaySchedule(
  settings: SiteSettings | null
): DayHours | null {
  const jsDay = new Date().getDay(); // 0 = dimanche, 1 = lundi, etc.
  // Convertir : dimanche (0) -> index 6, lundi (1) -> index 0, etc.
  const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
  const dayKey = WEEKDAY_KEYS[dayIndex];
  return getDaySchedule(settings, dayKey);
}

/**
 * Formate les horaires en texte lisible
 * Ex: "09:00 - 18:00"
 */
export function formatDaySchedule(schedule: DayHours | null): string {
  if (!schedule || !schedule.isOpen || !schedule.open || !schedule.close) {
    return 'Fermé';
  }

  return `${schedule.open} - ${schedule.close}`;
}

/**
 * Vérifie si la boutique est ouverte maintenant
 * @param schedule - Horaires du jour
 * @param now - Date/heure actuelle (optionnel, par défaut = maintenant)
 */
export function isOpenNow(
  schedule: DayHours | null,
  now: Date = new Date()
): boolean {
  if (!schedule || !schedule.isOpen || !schedule.open || !schedule.close) {
    return false;
  }

  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const { open, close } = schedule;

  return currentTime >= open && currentTime < close;
}

/**
 * Obtient tous les horaires de la semaine sous forme de tableau
 * Utile pour afficher un planning complet
 */
export function getWeekSchedule(
  settings: SiteSettings | null
): Array<{ day: string; schedule: DayHours | null; formatted: string }> {
  return WEEKDAY_KEYS.map((key, index) => ({
    day: WEEKDAY_NAMES[index],
    schedule: getDaySchedule(settings, key),
    formatted: formatDaySchedule(getDaySchedule(settings, key)),
  }));
}

/**
 * Noms abrégés des jours de la semaine (commence par lundi)
 */
const WEEKDAY_SHORT_NAMES = [
  'Lun',
  'Mar',
  'Mer',
  'Jeu',
  'Ven',
  'Sam',
  'Dim',
] as const;

/**
 * Vérifie si un horaire est considéré comme "fermé"
 */
function isClosed(schedule: DayHours | null): boolean {
  return !schedule || !schedule.isOpen || !schedule.open || !schedule.close;
}

/**
 * Compare deux DayHours pour voir s'ils ont les mêmes horaires
 * Tous les jours fermés sont considérés comme identiques
 */
function areSameSchedule(a: DayHours | null, b: DayHours | null): boolean {
  const aClosed = isClosed(a);
  const bClosed = isClosed(b);

  // Si les deux sont fermés, ils sont identiques
  if (aClosed && bClosed) return true;

  // Si un seul est fermé, ils sont différents
  if (aClosed || bClosed) return false;

  // Les deux sont ouverts, comparer les horaires
  return (
    a!.isOpen === b!.isOpen && a!.open === b!.open && a!.close === b!.close
  );
}

/**
 * Vérifie si un tableau d'indices est consécutif
 */
function isConsecutive(indices: number[]): boolean {
  if (indices.length <= 1) return true;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] !== indices[i - 1] + 1) return false;
  }
  return true;
}

/**
 * Formate un groupe de jours
 * Ex: [1,2,3] -> "Lun-Mer" (consécutif)
 * Ex: [1,2,4,5] -> "Lun,Mar,Jeu,Ven" (non consécutif)
 */
function formatDayGroup(indices: number[]): string {
  if (indices.length === 0) return '';
  if (indices.length === 1) return WEEKDAY_SHORT_NAMES[indices[0]];

  if (isConsecutive(indices)) {
    // Plage consécutive : "Lun-Mer"
    return `${WEEKDAY_SHORT_NAMES[indices[0]]}-${WEEKDAY_SHORT_NAMES[indices[indices.length - 1]]}`;
  } else {
    // Liste non consécutive : "Lun,Mar,Jeu"
    return indices.map((i) => WEEKDAY_SHORT_NAMES[i]).join(', ');
  }
}

/**
 * Groupe les jours par horaires identiques
 * Retourne un tableau d'objets { days: string, formatted: string }
 * Ex: [{ days: "Lun-Ven", formatted: "09:00 - 18:00" }, { days: "Sam", formatted: "09:00 - 13:00" }]
 */
export function getGroupedWeekSchedule(
  settings: SiteSettings | null
): Array<{ days: string; formatted: string }> {
  if (!settings || !settings.hours) return [];

  // Créer un tableau de tous les jours avec leurs horaires
  const allDays = WEEKDAY_KEYS.map((key, index) => ({
    index,
    schedule: getDaySchedule(settings, key),
  }));

  // Grouper par horaires identiques
  const groups: Array<{ indices: number[]; schedule: DayHours | null }> = [];

  for (const day of allDays) {
    // Chercher un groupe existant avec les mêmes horaires
    const existingGroup = groups.find((g) =>
      areSameSchedule(g.schedule, day.schedule)
    );

    if (existingGroup) {
      existingGroup.indices.push(day.index);
    } else {
      groups.push({ indices: [day.index], schedule: day.schedule });
    }
  }

  // Formater les groupes
  return groups.map((group) => ({
    days: formatDayGroup(group.indices),
    formatted: formatDaySchedule(group.schedule),
  }));
}
