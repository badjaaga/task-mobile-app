declare module 'react-native-config' {
  export interface NativeConfig {
    HOSTNAME?: string
    REACT_APP_OPENWEATHER_MAPS_API_KEY: string
  }

  export const Config: NativeConfig
  export default Config
}
