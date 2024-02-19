export const getCurrentTimeInTimeZone = (timeZone: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour12: false, // Set to true for 12-hour clock format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return new Date().toLocaleTimeString('en-US', options);
};