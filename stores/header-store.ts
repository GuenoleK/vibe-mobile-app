import { observable } from 'mobx';

class HeaderStore {
  @observable
  canShowSearchBar: boolean;

  @observable
  headerTitle: string;

  @observable
  isDarkModeActivated: boolean;
}

export const headerStore = new HeaderStore();
