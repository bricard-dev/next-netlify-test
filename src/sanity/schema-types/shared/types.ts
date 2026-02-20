/**
 * Types TypeScript partagés pour les schémas Sanity
 */

/**
 * Représente les horaires d'un jour (dayHours)
 */
export type DayHoursValue = {
  isOpen?: boolean;
  open?: string;
  close?: string;
};

/**
 * Représente les horaires hebdomadaires (weeklyHours)
 */
export type WeeklyHoursValue = {
  monday?: DayHoursValue;
  tuesday?: DayHoursValue;
  wednesday?: DayHoursValue;
  thursday?: DayHoursValue;
  friday?: DayHoursValue;
  saturday?: DayHoursValue;
  sunday?: DayHoursValue;
};
