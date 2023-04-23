import React from "react";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { DebugInfoModel, DebugInfoObject } from "./DebugInfoModel";

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
  
  renderAsString(v: any): string {
    if(typeof v == "string") return v
    
    return JSON.stringify(v)
  }

  override render() {
    const attributes = this.state.object?.attributes || {}

    return (
      <div
        style={{
          position: "fixed",
          top: "50px",
          color: "white",
          mixBlendMode: "difference",
        }}
      >
        {
          Object.keys(attributes ).map(p => <div key={p}>{p}: {this.renderAsString(attributes[p])}</div> )
        }
      </div>
    );
  }
}
