export const calculateCurrentTime = (timeOfDataCalculation: number, timezoneOffset: number) => {
  const currentTimeUTC = new Date(timeOfDataCalculation * 1000);
  const currentTimeTimezone = new Date(currentTimeUTC.getTime() + timezoneOffset * 1000);
  const options = { hour: '2-digit', minute: '2-digit' };
  // @ts-ignore
  return currentTimeTimezone.toLocaleString(undefined, options);
}
