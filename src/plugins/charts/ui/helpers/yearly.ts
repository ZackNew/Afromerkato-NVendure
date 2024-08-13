import { Apollo, gql } from "apollo-angular";
import { GraphData } from "./graph-data";
import { default as dayjs } from "dayjs";
export class Yearly extends GraphData {
  constructor(protected apollo: Apollo) {
    super(apollo);
  }

  generateXAxis() {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const firstDayOfYear = dayjs(today).startOf("year");
    this.fromDay = firstDayOfYear.toISOString();
    for (let index = 0; index < today.getMonth() + 1; index++) {
      const thisMonth = firstDayOfYear.add(index, "month");
      this.xAxisDateRanges.push({
        start: dayjs(thisMonth).toISOString(),
        end: dayjs(thisMonth).endOf("month").toISOString(),
      });
      this.y_axis.push(0);
    }
    this.x_axis = monthNames.slice(0, today.getMonth() + 1);
  }

  generateYAxis(list: any) {
    for (const item of list) {
      const creationDay = new Date(item["createdAt"]);
      const amount: number = item["totalWithTax"]
        ? parseFloat(item["totalWithTax"]) / 100
        : 1;
      this.y_axis[creationDay.getMonth()] =
        this.y_axis[creationDay.getMonth()] + amount;
    }
  }
}
