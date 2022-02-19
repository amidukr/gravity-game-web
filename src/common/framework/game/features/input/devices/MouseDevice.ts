import { InputAxis } from "../types/InputAxis";

export class MouseDevice {
  public static readonly ABSOLUTE_X = new InputAxis({
    axisId: "MOUSE_ABSOLUTE_X",
  });
  public static readonly ABSOLUTE_Y = new InputAxis({
    axisId: "MOUSE_ABSOLUTE_Y",
  });

  public static readonly RELATIVE_X = new InputAxis({
    axisId: "MOUSE_RELATIVE_X",
  });
  public static readonly RELATIVE_Y = new InputAxis({
    axisId: "MOUSE_RELATIVE_Y",
  });
}
