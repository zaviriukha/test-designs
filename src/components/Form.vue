<template>
  <div class="layout">
    <aside class="sidebar">
      <img src="/designs/logo.svg" alt="Назад" class="icon" />
    </aside>

    <main class="main">
      <div class="header">
        <div style="display: flex; flex-direction: row;">
          <router-link to="/" class="back-btn">
            <img src="/designs/arrow.svg" alt="Назад" class="icon" />
          </router-link>

          <label class="switch">
            <input type="checkbox" v-model="form.isPublished" />
            <span class="slider" />
            <span class="label-text">{{ form.isPublished ? 'Опублікований' : 'Неопублікований' }}</span>
          </label>
        </div>

        <button class="save-btn" @click="saveAndExit">Зберегти і вийти</button>
      </div>

      <div class="edit-zone">
        <div
            class="drop-zone"
            @dragover.prevent
            @drop.prevent="onDrop"
        >
          <p v-if="!preview">Перетягніть зображення або виберіть файл</p>
          <img v-if="preview" :src="preview" class="preview" />
          <input type="file" @change="onFileChange" class="file-input" />
        </div>

        <form class="form" @submit.prevent="saveAndExit">
          <div class="form-row">
            <label class="input-group input-number">
              <input
                  v-model="form.number"
                  type="text"
                  required
                  placeholder="###"
              />
            </label>

            <label class="input-group input-name">
              <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Some name"
              />
            </label>
          </div>

          <label class="input-group input-url">
            <input
                v-model="form.url"
                type="url"
                required
                placeholder="Some link"
            />
          </label>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDesignStore } from '../stores/designs'

const router = useRouter()
const store = useDesignStore()

const preview = ref<string | null>(null)
const form = ref({
  id: crypto.randomUUID(),
  name: '',
  number: '',
  url: '',
  image: '',
  isPublished: false,
})

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result as string
      form.value.image = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

function onDrop(e: DragEvent) {
  const file = e.dataTransfer?.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result as string
      form.value.image = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

function saveAndExit() {
  console.log('Saving design', form.value)
  store.addDesign({ ...form.value })
  router.push('/')
}

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
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: #FFFFFF;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px ;

      .back-btn {
        width: 24px;
        height: 24px;
        margin-right: 64px;

        img {
          width: 100%;
        }
      }

      .switch {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
        position: relative;
        flex-direction: row;

        input {
          opacity: 0;
          width: 0;
          height: 0;

          &[type="checkbox"] {
            display: none;
          }

          &:checked + .slider {
            background-color: #4caf50;

            &::before {
              transform: translateX(40px);
            }
          }
        }

        .slider {
          width: 64px;
          height: 24px;
          background-color: #ccc;
          border-radius: 34px;
          position: relative;
          transition: 0.2s;

          &::before {
            content: "";
            position: absolute;
            height: 18px;
            width: 18px;
            left: 3px;
            top: 3px;
            background-color: white;
            border-radius: 50%;
            transition: 0.2s;
          }
        }

        .label-text {
          font-size: 14px;
        }
      }

      .save-btn {
        background-color: #007bff;
        color: white;
        padding: 10px 16px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
      }
    }

    .edit-zone {
      display: flex;
      width: 600px;
      flex-direction: column;
      padding-left: 120px;

      .drop-zone {
        border: 2px dashed #E6E6E6;
        padding: 40px;
        text-align: center;
        cursor: pointer;
        position: relative;
        margin-bottom: 40px;

        .file-input {
          opacity: 0;
          position: absolute;
          inset: 0;
          cursor: pointer;
        }

        .preview {
          max-width: 100%;
          max-height: 300px;
          object-fit: contain;
          margin-bottom: 12px;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 16px;

        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: flex;
          flex-direction: row;
          gap: 8px;
        }

        .input-group {
          border: 1px solid #E6E6E6;
          height: 32px;
          display: flex;
          align-items: start;

          input {
            padding: 6px 11px;
            border: none;
            width: 68%;
            outline: none;
            font-size: 14px;
            height: 100%;
          }

          &.input-number {
            width: 80px;
            margin-right: 8px;
            border-radius: 3px;
          }

          &.input-name {
            width: 100%;
            border-radius: 3px;
          }

          &.input-url {
            width: 100%;
            margin-top: 12px;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>