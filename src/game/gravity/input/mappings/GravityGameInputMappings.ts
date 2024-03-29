import { Introspection } from "../../../../common/app/lookup/Introspection";
import { KeyBoardDevice } from "../../../../common/game/engine/features/input/devices/KeyboardDevice";
import { MappedUserInput } from "../../../../common/game/engine/features/input/MappedUserInput";
import { InputAction } from "../../../../common/game/engine/features/input/types/InputAction";
import { InputHotkey } from "../../../../common/game/engine/features/input/types/InputHotKey";
import { InputMappingGroup } from "../../../../common/game/engine/features/input/types/InputMappingGroup";
import { TYPE_UserInputMappingConfigurer, UserInputMappingConfigurer } from "../../../../common/game/engine/features/input/UserInputMappingConfigurer";

export const COMMON_GROUP = new InputMappingGroup({
  groupId: "Common",
});

export const CHANGE_VIEW_ACTION = new InputAction({
  actionId: "Change View",
});

export const ROLL_LEFT_ACTION = new InputAction({
  actionId: "Roll Left",
});

export const ROLL_RIGHT_ACTION = new InputAction({
  actionId: "Roll Right",
});

export const THROTTLE_UP_ACTION = new InputAction({
  actionId: "Throttle Up",
});

export const THROTTLE_DOWN_ACTION = new InputAction({
  actionId: "Throttle Down",
});

export const REVERSE_THROTTLE_ACTION = new InputAction({
  actionId: "Reverse Throttle",
});

export const MOUSE_NAVIGATION_TOGGLE_ACTION = new InputAction({
  actionId: "Mouse Navigation",
});

export const SAVE_GAME_ACTION = new InputAction({
  actionId: "Save Game",
});

export const LOAD_GAME_ACTION = new InputAction({
  actionId: "Load Game",
});

export class MainViewInputMappings implements UserInputMappingConfigurer {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_UserInputMappingConfigurer);
  }

  configureUserInputMappings(mappedUserInput: MappedUserInput): void {
    [
      { group: COMMON_GROUP, action: CHANGE_VIEW_ACTION, keyChar: "v" },
      { group: COMMON_GROUP, action: ROLL_LEFT_ACTION, keyChar: "q" },
      { group: COMMON_GROUP, action: ROLL_RIGHT_ACTION, keyChar: "e" },
      { group: COMMON_GROUP, action: THROTTLE_UP_ACTION, keyChar: "w" },
      { group: COMMON_GROUP, action: THROTTLE_DOWN_ACTION, keyChar: "s" },
      { group: COMMON_GROUP, action: REVERSE_THROTTLE_ACTION, keyChar: "r" },
      { group: COMMON_GROUP, action: MOUSE_NAVIGATION_TOGGLE_ACTION, keyChar: "f" },
      { group: COMMON_GROUP, action: SAVE_GAME_ACTION, keyChar: "o" },
      { group: COMMON_GROUP, action: LOAD_GAME_ACTION, keyChar: "l" },
    ].forEach((x) => mappedUserInput.bindKey(x.group, x.action, new InputHotkey({ button: KeyBoardDevice.fromCharacter(x.keyChar) })));
  }
}
