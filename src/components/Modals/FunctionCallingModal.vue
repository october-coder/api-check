<template>
  <a-modal
      v-model:open="visible"
      :title="t('FUNCTION_VERIFICATION_MODAL_TITLE')"
      @ok="handleOk"
      @cancel="handleCancel"
  >
    <a-form :model="formModel" layout="vertical">
      <a-form-item :label="t('VALUE_A')">
        <a-input-number v-model:value="formModel.a" style="width: 100%;"/>
      </a-form-item>
      <a-form-item :label="t('VALUE_B')">
        <a-input-number v-model:value="formModel.b" style="width: 100%;"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  a: {
    type: Number,
    default: 3,
  },
  b: {
    type: Number,
    default: 5,
  },
});

const emits = defineEmits(['update:visible', 'confirm']);

const { t } = useI18n();

const formModel = ref({
  a: props.a,
  b: props.b,
});

watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        formModel.value.a = props.a;
        formModel.value.b = props.b;
      }
    }
);

const handleOk = () => {
  emits('confirm', { a: formModel.value.a, b: formModel.value.b });
};

const handleCancel = () => {
  emits('update:visible', false);
};
</script>
