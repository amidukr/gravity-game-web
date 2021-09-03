import { InputAxis } from "./types/InputAxis";

export class AxisUserInput {
  private __axisValues: { [axis: string]: number } = {};

  setCoordinate(axisType: InputAxis, value: number) {
    this.__axisValues[axisType.axisName] = value;
  }

  getCoordinates(axisTypes: Array<InputAxis>): Array<number> {
    return axisTypes.map((x) => this.__axisValues[x.axisName]) || 0;
  }
}
