// Formats a project's timeline for display. Supports the CMS start/end
// month-year range and falls back to the legacy single `year` value so existing
// projects keep showing something until the client fills in the new fields.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Sanity `date` fields arrive as "YYYY-MM-DD". Parse the string directly (not via
// Date()) so no timezone shift can bump the month.
function monthYear(iso?: string | null): string | null {
  if (!iso) return null;
  const [y, m] = String(iso).split("-");
  const year = Number(y);
  if (!year) return null;
  const idx = Number(m) - 1;
  return idx >= 0 && idx < 12 ? `${MONTHS[idx]} ${year}` : String(year);
}

export type ProjectPeriodInput = {
  startDate?: string | null;
  endDate?: string | null;
  year?: string | number | null;
};

/**
 * Returns a display label like "Mar 2023 – Jun 2024", "Mar 2023", or the legacy
 * "2020". Empty string when nothing is set (callers hide the field in that case).
 */
export function formatProjectPeriod(p: ProjectPeriodInput): string {
  const start = monthYear(p.startDate);
  const end = monthYear(p.endDate);
  if (start && end) return start === end ? start : `${start} – ${end}`;
  if (start) return start;
  if (end) return end;
  return p.year != null && p.year !== "" ? String(p.year) : "";
}
