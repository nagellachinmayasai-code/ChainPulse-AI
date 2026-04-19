export type Screen = 'dashboard' | 'insights' | 'risks' | 'forecast';
export type TransitionType = 'push' | 'push_back' | 'none';

export interface NavigationState {
  currentScreen: Screen;
  transition: TransitionType;
}
