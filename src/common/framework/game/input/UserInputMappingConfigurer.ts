import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { MappedUserInput } from "./MappedUserInput";

export const TYPE_UserInputMappingConfigurer =
  typeIdentifier<UserInputMappingConfigurer>(
    "amid_ukr_ge_UserInputMappingConfigurer"
  );

export interface UserInputMappingConfigurer {
  configureUserInputMappings(
    mappedUserInput: MappedUserInput
  ): Promise<void> | void;
}
