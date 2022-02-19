import { InputAxis } from "./types/InputAxis";

export class AxisUserInput {
  private __axisValues: { [axis: string]: number | undefined } = {};

  setCoordinate(axisType: InputAxis, value: number) {
    this.__axisValues[axisType.axisId] = value;
  }

  getCoordinates(axisTypes: Array<InputAxis>): Array<number> {
    return axisTypes.map((x) => this.__axisValues[x.axisId] || 0);
  }
}
