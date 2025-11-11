<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import Card from '@/components/ui/Card.vue';
import type { LineType } from '@/types';
import { ref } from 'vue';

const props = defineProps<{
  line: LineType
}>()

const notes = ref([
  {
    id: '1',
    content: 'Remember to check blood sugar levels before meals',
    createdAt: new Date().toISOString(),
  },
])

const newNote = ref('')

const addNote = () => {
  if (newNote.value.trim()) {
    notes.value.unshift({
      id: String(Date.now()),
      content: newNote.value.trim(),
      createdAt: new Date().toISOString(),
    })
    newNote.value = ''
  }
}

const deleteNote = (id: string) => {
  notes.value = notes.value.filter(n => n.id !== id)
}
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Notes</h2>

    <!-- Add Note Form -->
    <div class="mb-6">
      <textarea
        v-model="newNote"
        class="textarea textarea-bordered w-full  mb-2"
        placeholder="Add a new note..."
        rows="3"
        @keydown.enter.ctrl="addNote"
      ></textarea>
      <AppButton @click="addNote" :disabled="!newNote.trim()">
        ➕ Add Note
      </AppButton>
    </div>

    <!-- Notes List -->
    <div v-if="notes.length === 0" class="text-center py-12 text-base-content/70">
      <p>No notes yet. Add your first note above!</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="note in notes"
        :key="note.id"
        class="-dark p-4 rounded-lg"
      >
        <div class="flex justify-between items-start mb-2">
          <p class="text-sm text-base-content/70">
            {{ new Date(note.createdAt).toLocaleString() }}
          </p>
          <button
            class="btn btn-sm btn-ghost text-error"
            @click="deleteNote(note.id)"
          >
            🗑️
          </button>
        </div>
        <p class="whitespace-pre-wrap">{{ note.content }}</p>
      </div>
    </div>
  </Card>
</template>

