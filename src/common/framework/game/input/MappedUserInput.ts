import { Group } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { Application } from "../../../app/Application";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameView } from "../ui/view/GameView";
import { KeyBoardDevice } from "./devices/KeyboardDevice";
import { InputAction } from "./types/InputAction";
import { InputButton, INPUT_BUTTON_TYPE } from "./types/InputButton";
import { InputHotkey } from "./types/InputHotKey";
import { InputMappingGroup } from "./types/InputMappingGroup";
import { TYPE_UserInputMappingConfigurer } from "./UserInputMappingConfigurer";

interface GroupButtonToActionMappings {
  buttons: {
    [name: string]:
      | {
          action: InputAction;
          hotKey: InputHotkey;
        }
      | undefined;
  };
}

interface GroupActionToHotKeysMappings {
  hotKeys: InputHotkey[];
}

interface ButtonToActionMappings {
  groups: {
    [name: string]: GroupButtonToActionMappings | undefined;
  };
}

interface ActionToHotKeysMapping {
  groups: {
    [name: string]: {
      actions: { [actionId: string]: GroupActionToHotKeysMappings | undefined };
    };
  };
}

export class MappedUserInput implements ApplicationComponent {
  private buttonToActionMapping: ButtonToActionMappings = {
    groups: {},
  };

  private actionToHotKeysMapping: ActionToHotKeysMapping = {
    groups: {},
  };

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    for (const configurer of application.getComponentList(TYPE_UserInputMappingConfigurer)) {
      await configurer.configureUserInputMappings(this);
    }
  }

  private getOrCreateGroupButtonToActionMapping(group: InputMappingGroup): GroupButtonToActionMappings {
    const groups = this.buttonToActionMapping.groups;
    return groups[group.groupId] || (groups[group.groupId] = { buttons: {} });
  }

  private getOrCreateGroupActionToHotKeysMapping(
    group: InputMappingGroup,
    action: InputAction
  ): GroupActionToHotKeysMappings {
    const groups = this.actionToHotKeysMapping.groups;
    const actionToHotkeyMapping = groups[group.groupId] || (groups[group.groupId] = { actions: {} });
    return (
      actionToHotkeyMapping.actions[action.actionId] ||
      (actionToHotkeyMapping.actions[action.actionId] = { hotKeys: [] })
    );
  }

  unbindKey(group: InputMappingGroup, action: InputAction, hotKey: InputHotkey) {
    const buttonsToActionMapping = this.buttonToActionMapping.groups[group.groupId]?.buttons;
    const buttonId = hotKey.button.buttonId;

    if (buttonsToActionMapping?.[buttonId]?.hotKey.hotKeyId == hotKey.hotKeyId) {
      delete buttonsToActionMapping[hotKey.button.buttonId];
    }

    const actionHotKeys = this.actionToHotKeysMapping.groups[group.groupId].actions[action.actionId];

    if (actionHotKeys?.hotKeys != undefined) {
      actionHotKeys.hotKeys = actionHotKeys?.hotKeys.filter((x) => x.hotKeyId != hotKey.hotKeyId);
    }
  }

  bindKey(group: InputMappingGroup, action: InputAction, hotKey: InputHotkey) {
    const buttonToActionMapping = this.getOrCreateGroupButtonToActionMapping(group);
    const actionToHotKeysMapping = this.getOrCreateGroupActionToHotKeysMapping(group, action);

    const prevButtonMapping = buttonToActionMapping.buttons[hotKey.button.buttonId];

    if (prevButtonMapping) {
      this.unbindKey(group, prevButtonMapping.action, prevButtonMapping.hotKey);
    }

    buttonToActionMapping.buttons[hotKey.button.buttonId] = {
      action: action,
      hotKey: hotKey,
    };

    actionToHotKeysMapping.hotKeys.push(hotKey);
  }

  resolveEventToAction(group: InputMappingGroup, event: Event | InputButton): InputAction | undefined {
    if (event.type == INPUT_BUTTON_TYPE) {
      return this.buttonToActionMapping.groups[group.groupId]?.buttons[(event as InputButton).buttonId]?.action;
    }

    if (["keydown", "keypress", "keyup"].includes(event.type)) {
      const button = KeyBoardDevice.fromDeviceCode((event as KeyboardEvent).code);
      return this.buttonToActionMapping.groups[group.groupId]?.buttons[button.buttonId]?.action;
    }

    throw Error(`Unexpected event.type = ${event.type}`);
  }

  isActionPressed(gameView: GameView, group: InputMappingGroup, action: InputAction): boolean {
    const buttonUserInput = gameView.buttonUserInput;
    return (
      this.actionToHotKeysMapping.groups[group.groupId]?.actions?.[action.actionId]?.hotKeys.find((x) =>
        buttonUserInput.isButtonPressed(x.button)
      ) != undefined
    );
  }

  isEventOfAction(event: Event, group: InputMappingGroup, action: InputAction) {
    const resolvedAction = this.resolveEventToAction(group, event);

    return resolvedAction != undefined && resolvedAction.actionId == action.actionId;
  }
}
