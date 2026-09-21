<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- 1. Left Desktop Sidebar Navigation -->
    <WebSidebar />

    <!-- 2. Main Content Canvas -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Contextual Bar -->
      <WebTopBar />

      <!-- Main Router Canvas -->
      <main class="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 pb-28 md:pb-12">
        <router-view />
      </main>
    </div>

    <!-- 3. Mobile Bottom Navigation (Khusus Layar HP) -->
    <BottomNav class="md:hidden" />
  </div>
</template>

<script setup lang="ts">
import WebSidebar from '@/components/WebSidebar.vue';
import WebTopBar from '@/components/WebTopBar.vue';
import BottomNav from '@/components/BottomNav.vue';
</script>
