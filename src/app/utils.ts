export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  // Get day name using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export function getDayOfMonth(dateString: string): number {
  return new Date(dateString).getDate();
}
