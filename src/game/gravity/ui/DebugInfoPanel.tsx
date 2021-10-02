import React from "react";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { DebugInfoModel, DebugInfoObject } from "../model/DebugInfoModel";

export interface DebugInfoPanelProps {
  application: ApplicationContainer;
}

export interface DebugInfoPanelPropsState {
  object: DebugInfoObject | null;
}

export class DebugInfoPanel extends React.Component<DebugInfoPanelProps, DebugInfoPanelPropsState> {
  constructor(props: DebugInfoPanelProps) {
    super(props);

    const model = props.application.getComponent(DebugInfoModel);

    model.refreshViewCallback = (object) =>
      this.setState({
        object: object,
      });

    this.state = {
      object: null,
    };
  }

  override render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "50px",
          color: "white",
          mixBlendMode: "difference",
        }}
      >
        <div>Altitude: {this.state.object?.altitude}</div>
      </div>
    );
  }
}
