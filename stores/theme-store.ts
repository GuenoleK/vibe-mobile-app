import { observable } from 'mobx';

class ThemeStore {

  @observable
  isDark: boolean;
}

export const themeStore = new ThemeStore();
