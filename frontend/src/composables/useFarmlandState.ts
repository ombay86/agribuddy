import { ref } from 'vue';
import { api, Farmland } from '@/services/api';
import { getActiveUserId } from '@/services/userState';

const globalFarmlands = ref<Farmland[]>([]);
const activeFarmId = ref<string>('');
const isLoadingFarmlands = ref<boolean>(false);

export const useFarmlandState = () => {
  const getSavedFarmId = (userId: string) => {
    return localStorage.getItem(`agribuddy_active_farm_${userId}`) || localStorage.getItem('agribuddy_active_farm_id') || '';
  };

  const loadGlobalFarmlands = async (userId?: string) => {
    try {
      isLoadingFarmlands.value = true;
      const targetUserId = userId || getActiveUserId();
      const list = await api.getFarmlands(targetUserId);
      const activeList = list.filter(f => f.status !== 'DRAFT');
      globalFarmlands.value = activeList;

      if (activeList.length > 0) {
        const savedId = getSavedFarmId(targetUserId);
        if (savedId && activeList.some(f => f.id === savedId)) {
          activeFarmId.value = savedId;
        } else {
          activeFarmId.value = activeList[0].id;
          localStorage.setItem(`agribuddy_active_farm_${targetUserId}`, activeList[0].id);
          localStorage.setItem('agribuddy_active_farm_id', activeList[0].id);
        }
      } else {
        activeFarmId.value = '';
        localStorage.removeItem(`agribuddy_active_farm_${targetUserId}`);
        localStorage.removeItem('agribuddy_active_farm_id');
      }
    } catch (e) {
      console.error('Error loading global farmlands:', e);
    } finally {
      isLoadingFarmlands.value = false;
    }
  };

  const setActiveFarmId = (id: string) => {
    const targetUserId = getActiveUserId();
    activeFarmId.value = id;
    localStorage.setItem(`agribuddy_active_farm_${targetUserId}`, id);
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
