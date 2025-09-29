/**
 * safe openUrl utility for React Native / web
 * Usage: import { openUrl } from 'src/utils/openUrl'; await openUrl('https://example.com');
 */
import { Platform, Linking } from 'react-native';

export async function openUrl(url: string) {
  if (!url) throw new Error('openUrl: url required');
  try {
    if (Platform.OS === 'web') {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) throw new Error('Failed to open window');
      win.opener = null;
      return true;
    } else {
      const normalized = url.startsWith('http') ? url : `https://${url}`;
      const supported = await Linking.canOpenURL(normalized);
      if (!supported) {
        throw new Error('Cannot open URL: ' + normalized);
      }
      await Linking.openURL(normalized);
      return true;
    }
  } catch (err) {
    // central place to log analytics or show user feedback
    // e.g., showToast('Unable to open link')
    // console.warn('openUrl error', err);
    return false;
  }
}
