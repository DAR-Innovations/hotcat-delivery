import moment from "moment";

export const formatDateToDDMMYYY = (date: string) => {
  return moment().format("DD MMM YYYY, hh:mm A");
};
