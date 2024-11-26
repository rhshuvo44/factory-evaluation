import dayjs, { Dayjs } from "dayjs";

/**
 * Handles date change for DatePicker.
 * @param setDate - A state setter function to store the selected date.
 */
export const handleDateChange = (setDate: (date: string) => void) => {
    return (_: unknown, dateString: string) => {
        setDate(dateString);
    };
};

/**
 * Disables dates that are more than `daysAgo` days in the past or future dates.
 * @param daysAgo - Number of days in the past to allow.
 */
export const getDisabledDates = (daysAgo: number) => {
    return (current: Dayjs) => {
        if (!current) return false;
        return current.isBefore(dayjs().subtract(daysAgo, "day")) || current.isAfter(dayjs())
    };
};
