<template>
  <div class="toast toast-top toast-end z-50">
    <div
      :id="`toast-${notification.id}`"
      v-for="notification in notifications"
      :class="`alert ${getToastStyle(notification)} p-2 rounded-lg shadow-md`"
    >
      <MaterialIcon :class="getIconStyle(notification)" class="w-5 h-5 my-auto" :icon="getIcon(notification)" /><span class="text-sm">{{
        notification.message
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageType } from "@/models/enums";
import Notification from "@/models/notification";
import { useNotificationStore } from "@/stores/notificationStore";
import { computed } from "vue";
import MaterialIcon from "./MaterialIcon.vue";
import { mdiAlertCircleOutline, mdiAlertOctagonOutline, mdiAlertOutline, mdiCheckCircleOutline } from "@mdi/js";

const notificationStore = useNotificationStore();

const notifications = computed(() => notificationStore.notifications.value);

function getToastStyle(notification: Notification) {
  switch (notification.messageType) {
    case MessageType.Error:
      return "bg-white border border-error";
    case MessageType.Info:
      return "bg-white border border-info";
    case MessageType.Success:
      return "bg-white border border-success";
    case MessageType.Warning:
      return "bg-white border border-warning";
    case MessageType.Alert:
    default:
      return "";
  }
}

function getIcon(notification:Notification){
	switch (notification.messageType) {
    case MessageType.Error:
      return mdiAlertOctagonOutline ;
    case MessageType.Info:
      return mdiAlertCircleOutline ;
    case MessageType.Success:
      return mdiCheckCircleOutline;
    case MessageType.Warning:
      return mdiAlertOutline;
    case MessageType.Alert:
    default:
      return "";
  }
}

function getIconStyle(notification: Notification) {
  switch (notification.messageType) {
    case MessageType.Error:
      return "text-error";
    case MessageType.Info:
      return "text-info";
    case MessageType.Success:
      return "text-success";
    case MessageType.Warning:
      return "text-warning";
    case MessageType.Alert:
    default:
      return "";
  }
}
</script>
