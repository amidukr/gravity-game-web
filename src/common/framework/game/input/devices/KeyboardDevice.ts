import { InputButton } from "../types/InputButton";

interface KeyMap {
  [name: string]: string;
}

interface Array<T> {
  myProto(str: string): void;
}

export class KeyBoardDevice {
  // Declaring mappings
  private static readonly generatedDeviceToCharArray = [
    ["Backquote", "`"],
    ["Backslash", "\\"],
    ["BracketLeft", "["],
    ["BracketRight", "]"],
    ["Comma", ","],
    ["Digit0", "0"],
    ["Digit1", "1"],
    ["Digit2", "2"],
    ["Digit3", "3"],
    ["Digit4", "4"],
    ["Digit5", "5"],
    ["Digit6", "6"],
    ["Digit7", "7"],
    ["Digit8", "8"],
    ["Digit9", "9"],
    ["Equal", "="],
    ["IntlBackslash", "\\"],
    ["KeyA", "a"],
    ["KeyB", "b"],
    ["KeyC", "c"],
    ["KeyD", "d"],
    ["KeyE", "e"],
    ["KeyF", "f"],
    ["KeyG", "g"],
    ["KeyH", "h"],
    ["KeyI", "i"],
    ["KeyJ", "j"],
    ["KeyK", "k"],
    ["KeyL", "l"],
    ["KeyM", "m"],
    ["KeyN", "n"],
    ["KeyO", "o"],
    ["KeyP", "p"],
    ["KeyQ", "q"],
    ["KeyR", "r"],
    ["KeyS", "s"],
    ["KeyT", "t"],
    ["KeyU", "u"],
    ["KeyV", "v"],
    ["KeyW", "w"],
    ["KeyX", "x"],
    ["KeyY", "y"],
    ["KeyZ", "z"],
    ["Minus", "-"],
    ["Period", "."],
    ["Quote", "'"],
    ["Semicolon", ";"],
    ["Slash", "/"],
  ];

  private static readonly customDeviceToCharArray = [["Space", " "]];

  // Processing Code

  private static deviceToButtonMap: { [name: string]: InputButton | undefined } = {};

  private static readonly deviceToCharArray = this.generatedDeviceToCharArray
    .concat(this.customDeviceToCharArray)
    .map((x) => [x[0], x[1].toUpperCase()]);

  private static charToDeviceMap: KeyMap = Object.fromEntries(this.deviceToCharArray.map((x) => [x[1], x[0]]));

  private static deviceToCharMap: KeyMap = Object.fromEntries(this.deviceToCharArray.map((x) => [x[0], x[1]]));

  static async generate() {
    JSON.stringify(Array.from((await (navigator as any).keyboard.getLayoutMap()).entries()).sort());
  }

  static fromCharacter(char: string): InputButton {
    if (char.length != 1) {
      throw Error(`KeyBoardDevice.fromCharacter('${char.length}') - expect only one char in a string`);
    }

    char = char.toUpperCase();

    const deviceCode = this.charToDeviceMap[char];

    if (deviceCode == undefined) {
      throw new Error(`Unexecpted char: '${char}', no mapping to keybarod code `);
    }

    return this.fromDeviceCode(deviceCode);
  }

  static fromDeviceCode(deviceCode: string): InputButton {
    var button = this.deviceToButtonMap[deviceCode];

    if (button) {
      return button;
    }

    const char = this.deviceToCharMap[deviceCode];

    var buttonId;
    var label;

    if (char) {
      buttonId = `KEYBOARD_KEY_${char}`;
      label = char;
    } else {
      buttonId = `KEYBOARD_${deviceCode}`;
      label = deviceCode;
    }

    button = new InputButton({
      buttonId: buttonId,
      label: label,
      deviceCode: deviceCode,
    });

    this.deviceToButtonMap[deviceCode] = button;

    return button;
  }
}
