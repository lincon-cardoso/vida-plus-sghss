export const APP_ROLES = ["patient", "doctor", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type DashboardImplementation = "patient" | "medic" | "admin";

const DASHBOARD_IMPLEMENTATION_BY_ROLE: Record<
  AppRole,
  DashboardImplementation
> = {
  patient: "patient",
  doctor: "medic",
  admin: "admin",
};

export function isAppRole(value: string): value is AppRole {
  return APP_ROLES.includes(value as AppRole);
}

export function getDashboardRoute(role: AppRole) {
  return `/roles/${role}/dashboard`;
}

export function getDashboardImplementation(
  role: AppRole,
): DashboardImplementation {
  return DASHBOARD_IMPLEMENTATION_BY_ROLE[role];
}
