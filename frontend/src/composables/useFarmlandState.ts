import { ref } from 'vue';
import { api, Farmland } from '@/services/api';

const globalFarmlands = ref<Farmland[]>([]);
const activeFarmId = ref<string>(localStorage.getItem('agribuddy_active_farm_id') || '');
const isLoadingFarmlands = ref<boolean>(false);

export const useFarmlandState = () => {
  const loadGlobalFarmlands = async (userId?: string) => {
    try {
      isLoadingFarmlands.value = true;
      const list = await api.getFarmlands(userId);
      const activeList = list.filter(f => f.status !== 'DRAFT');
      globalFarmlands.value = activeList;
      if (activeList.length > 0) {
        if (!activeFarmId.value || !activeList.some(f => f.id === activeFarmId.value)) {
          activeFarmId.value = activeList[0].id;
          localStorage.setItem('agribuddy_active_farm_id', activeList[0].id);
        }
      }
    } catch (e) {
      console.error('Error loading global farmlands:', e);
    } finally {
      isLoadingFarmlands.value = false;
    }
  };

  const setActiveFarmId = (id: string) => {
    activeFarmId.value = id;
    localStorage.setItem('agribuddy_active_farm_id', id);
    window.dispatchEvent(new CustomEvent('agribuddy:farm-changed', { detail: { farmId: id } }));
  };

  return {
    globalFarmlands,
    activeFarmId,
    isLoadingFarmlands,
    loadGlobalFarmlands,
    setActiveFarmId
  };
};
