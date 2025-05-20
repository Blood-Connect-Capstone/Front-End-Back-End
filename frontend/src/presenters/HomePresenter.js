import { ref } from 'vue';
import { tabs, cards } from '../models/HomeModel';

export function HomePresenter() {
  const activeTab = ref('home');

  function onTabClick(tabId) {
    activeTab.value = tabId;
  }

  return {
    tabs,
    cards,
    activeTab,
    onTabClick
  };
}