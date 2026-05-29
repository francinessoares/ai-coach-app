import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_PORT = 3001;

function parseHostFromDevUri(uri: string | undefined): string | null {
  if (!uri) return null;

  try {
    const normalized = uri.includes('://') ? uri : `http://${uri}`;
    const hostname = new URL(normalized).hostname;
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return hostname;
    }
  } catch {
    const match = uri.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
    if (match?.[1]) return match[1];
  }

  return null;
}

function getExpoDevMachineHost(): string | null {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.expoGoConfig?.debuggerHost,
    Constants.linkingUri,
    Constants.experienceUrl,
  ];

  for (const uri of candidates) {
    const host = parseHostFromDevUri(uri);
    if (host) return host;
  }

  return null;
}

export function getApiBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  if (__DEV__) {
    const devHost = getExpoDevMachineHost();
    if (devHost) {
      return `http://${devHost}:${API_PORT}`;
    }
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${API_PORT}`;
  }

  return `http://localhost:${API_PORT}`;
}
