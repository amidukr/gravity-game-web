import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../app/api/ApplicationComponent";
import { Application } from "../../../app/Application";
import { Introspection } from "../../../app/lookup/Introspection";
import { KeyBoardDevice } from "./devices/KeyboardDevice";
import { InputAction } from "./types/InputAction";
import { InputButton } from "./types/InputButton";
import { InputHotkey } from "./types/InputHotKey";
import { InputMappingGroup } from "./types/InputMappingGroup";
import { TYPE_UserInputMappingConfigurer } from "./UserInputMappingConfigurer";

interface GroupMappings {
  buttons: {
    [name: string]: InputAction;
  };
}

interface UserInputMappings {
  groups: {
    [name: string]: GroupMappings;
  };
}

export class MappedUserInput implements ApplicationComponent {
  private mapping: UserInputMappings = {
    groups: {},
  };

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    for (const configurer of application.getComponentList(
      TYPE_UserInputMappingConfigurer
    )) {
      await configurer.configureUserInputMappings(this);
    }
  }

  private getOrCreatGroupMapping(group: InputMappingGroup): GroupMappings {
    const groups = this.mapping.groups;

    return (
      groups[group.groupId] ||
      (this.mapping.groups[group.groupId] = {
        buttons: {},
      })
    );
  }

  registerAction(
    group: InputMappingGroup,
    action: InputAction,
    hotKey: InputHotkey
  ) {
    const groupMapping = this.getOrCreatGroupMapping(group);

    groupMapping.buttons[hotKey.button.buttonId] = action;
  }

  resolveEventToAction(
    group: InputMappingGroup,
    event: Event
  ): InputAction | undefined {
    if (["keydown", "keypress", "keyup"].includes(event.type)) {
      const button = KeyBoardDevice.fromDeviceCode(
        (event as KeyboardEvent).code
      );
      return this.mapping.groups[group.groupId]?.buttons[button.buttonId];
    }

    throw Error(`Unexpected event.type = ${event.type}`);
  }

  isEventOfAction(event: Event, group: InputMappingGroup, action: InputAction) {
    const resolvedAction = this.resolveEventToAction(group, event);

    return (
      resolvedAction != undefined && resolvedAction.actionId == action.actionId
    );
  }
}
