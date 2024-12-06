import { format } from "date-fns";

export const formatDate = (isoString: Date, dateFormat: string = "dd-MM-yyyy"): string => {
  return format(new Date(isoString), dateFormat);
};