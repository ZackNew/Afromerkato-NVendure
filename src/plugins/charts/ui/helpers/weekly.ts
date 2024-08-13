import { Apollo, gql } from "apollo-angular";
import { GraphData } from "./graph-data";
import { default as dayjs } from "dayjs";
export class Weekly extends GraphData {
  constructor(protected apollo: Apollo) {
    super(apollo);
  }

  generateXAxis() {
    const today = new Date();
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    this.x_axis = days.slice(0, today.getDay());
    for (let index = 0; index < today.getDay(); index++) {
      const daysjsVersion = dayjs(today).subtract(index, "days").toISOString();
      this.xAxisDateRanges = [
        {
          start: this.moveToFirstInstanceInDay(daysjsVersion),
          end: this.moveToLastInstanceInDay(daysjsVersion),
        },
        ...this.xAxisDateRanges,
      ];
      this.y_axis.push(0);
    }
    const monday = new Date();
    monday.setDate(today.getDate() - (today.getDay() - 1));
    const mondayStr = monday.toISOString();
    this.fromDay = mondayStr.split("T")[0] + "T00:00:00.000Z";
  }

  generateYAxis(list: any) {
    for (const product of list) {
      const creationDay = new Date(product["createdAt"]);
      const amount: number = product["totalWithTax"]
        ? parseFloat(product["totalWithTax"]) / 100
        : 1;
      this.y_axis[creationDay.getDay() - 1] =
        this.y_axis[creationDay.getDay() - 1] + amount;
    }
  }
}
