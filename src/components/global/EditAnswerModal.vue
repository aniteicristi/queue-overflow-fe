<script setup lang="ts">
import { ref, watch } from "vue";
import { EditService } from "../../services/edit.service";
import { QuestionsService } from "../../services/questions.service";

const text = ref(EditService.instance.answer.value?.text ?? "");

const check = ref(false);

watch(check, (a, b) => (text.value = EditService.instance.answer.value?.text ?? ""));

async function save() {
  if (EditService.instance.answer.value == null) return;
  const ok: boolean = await QuestionsService.instance.editAnswer(EditService.instance.answer.value, text.value);
  if (ok) location.reload();
}
</script>

<template>
  <input type="checkbox" id="editAnswer" class="modal-toggle" v-model="check" />
  <div class="modal">
    <div class="modal-box relative">
      <textarea class="textarea textarea-primary w-full" v-model="text"></textarea>
      <div class="modal-action">
        <label for="editAnswer" class="btn btn-warning">CANCEL</label>
        <label for="editAnswer" class="btn" @click="save()">SAVE</label>
      </div>
    </div>
  </div>
</template>
