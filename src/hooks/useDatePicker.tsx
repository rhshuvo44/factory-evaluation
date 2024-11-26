import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

/**
 * Custom hook for managing and validating date selection.
 * @param daysAgo - Number of days in the past to allow.
 */
export const useDatePicker = (daysAgo: number) => {
  const [date, setDate] = useState<string>("");

  const onChange = (_: unknown, dateString: string) => {
    setDate(dateString);
  };

  const disabledDate = (current: Dayjs | null) => {
    if (!current) return false;
    return (
      current.isBefore(dayjs().subtract(daysAgo, "day"), "day") ||
      current.isAfter(dayjs(), "day")
    );
  };

  return { date, onChange, disabledDate };
};
