import {
  DefaultOrderCodeStrategy,
  OrderCodeStrategy,
  RequestContext,
} from "@vendure/core";
import dayjs from "dayjs";

/**
 * Generates id's like AM-140923-J7HG8
 */
export class AMOrderCodeStrategy
  extends DefaultOrderCodeStrategy
  implements OrderCodeStrategy
{
  generate(ctx: RequestContext): string {
    let prefix = "AM";
    const alphanumericCode = super.generate(ctx).slice(0, 5);
    // Do magic here
    return `${prefix}-${dayjs(new Date()).format(
      "DDMMYY"
    )}-${alphanumericCode}`;
  }
}
