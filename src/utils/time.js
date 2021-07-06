import moment from "moment";

export const last2Month = () => moment()
  .subtract(2, "months")
  .format("YYYY-MM-DD");
export const lastMonth = () => moment()
  .subtract(1, "months")
  .format("YYYY-MM-DD");
export const today = () => moment().format("YYYY-MM-DD");
