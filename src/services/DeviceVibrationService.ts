import { Vibration } from 'react-native';

export class DeviceVibrationService {
  vibrateWhenRequired(required: boolean, pattern: number | number[] = 250, repeat = false): void {
    if (!required) return;

    Vibration.vibrate(pattern, repeat);
  }

  cancel(): void {
    Vibration.cancel();
  }
}
