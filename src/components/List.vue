<template>
  <div class="layout">
    <aside class="sidebar">
      <img src="/designs/logo.svg" alt="Назад" class="icon" />
    </aside>

    <main class="main">
      <div class="header">
        <h1 class="title">Всі дизайни</h1>
        <router-link to="/design/new" class="add-btn">Додати дизайн</router-link>
      </div>

      <div class="grid">
        <a
            v-for="design in designs"
            :key="design.id"
            :href="design.url"
            class="card"
            target="_blank"
        >
          <img :src="design.image" alt="Preview" class="image" />
          <div class="info">
            <span class="number">№ {{ design.number }}</span>
            <div class="name">{{ design.name }}</div>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from '../stores/designs'

const store = useDesignStore()
const designs = store.designs
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;

  .sidebar {
    width: 40px;
    background-color: #627B7A;
    padding: 9px 0;
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .main {
    flex: 1;
    padding: 20px 32px;
    display: flex;
    flex-direction: column;
    background-color: #2C3D39;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title {
        font-size: 24px;
        font-weight: 400;
        line-height: 40px;
        color: #ffffff;
        margin: 0;
      }

      .add-btn {
        background-color: #007bff;
        color: white;
        padding: 7px 12px;
        border-radius: 6px;
        text-decoration: none;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, 300px);
      gap: 24px;
      justify-content: start;

      .card {
        display: flex;
        flex-direction: column;

        .image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 2%;
        }

        .info {
          padding: 16px 0;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          .number {
            font-size: 11px;
            font-weight: 400;
            background-color: #FFFFFF;
            border-radius: 42%;
            padding: 0 5px;
            color: #000000;
            line-height: 18px;
            margin-right: 8px;
          }

          .name {
            font-size: 16px;
            font-weight: 400;
            line-height: 18px;
            color: #FFFFFF;
          }
        }
      }
    }

  }
}

</style>
