import { Introspection } from "../../../../common/app/lookup/Introspection";
import { KeyBoardDevice } from "../../../../common/framework/game/input/devices/KeyboardDevice";
import { MappedUserInput } from "../../../../common/framework/game/input/MappedUserInput";
import { InputAction } from "../../../../common/framework/game/input/types/InputAction";
import { InputHotkey } from "../../../../common/framework/game/input/types/InputHotKey";
import { InputMappingGroup } from "../../../../common/framework/game/input/types/InputMappingGroup";
import {
  TYPE_UserInputMappingConfigurer,
  UserInputMappingConfigurer,
} from "../../../../common/framework/game/input/UserInputMappingConfigurer";

export const MAIN_VIEW_GROUP = new InputMappingGroup({
  groupId: "Main Screen",
});

export const CHANGE_VIEW_ACTION = new InputAction({
  actionId: "Change View",
});

export class MainViewInputMappings implements UserInputMappingConfigurer {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_UserInputMappingConfigurer);
  }

  configureUserInputMappings(mappedUserInput: MappedUserInput): void {
    mappedUserInput.registerAction(
      MAIN_VIEW_GROUP,
      CHANGE_VIEW_ACTION,
      new InputHotkey({ button: KeyBoardDevice.fromCharacter("v") })
    );
  }
}
