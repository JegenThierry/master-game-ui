import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { User } from "@/models/user";
import { useNotificationStore } from "./notificationStore";
import UserService, { ResponseTuple } from "@/services/userService";
import { MessageType, ResourceTypes } from "@/models/enums";
import UserResources from "@/models/userResources";
import MessageService from "@/services/messageService";
import { useExtensionStore } from "@/stores/extensionStore";
import { useMessageStore } from "./messagesStore";

const useStore = defineStore("user", () => {
	const activeUser = ref<User | undefined>(undefined);
	const userResources = ref<UserResources | undefined>(undefined);

	const notificationStore = useNotificationStore();
	const extensionStore = useExtensionStore();
	const messageStore = useMessageStore();

	function storeUserId(userId: string) {
		localStorage.setItem("userId", userId);
	}

	function fetchUserResources() {
		if (!activeUser.value) return;

		messageStore.updateUserNotifications(activeUser.value.uid);

		UserService.fetchUserResources(activeUser.value.uid)
			.then((res: UserResources) => (userResources.value = res))
			.catch(() => notificationStore.addNotification("Resourcen konnten nicht geladen werden.", MessageType.Error));
	}

	function consumeResources(resourceType: ResourceTypes, amount: number) {
		if (!activeUser.value) return;

		UserService.consumeResource(activeUser.value.uid, resourceType, amount)
			.then((res: ResponseTuple) => {
				userResources.value = res.userResources;
				messageStore.messages.value = res.messages;
				notificationStore.addNotification("Resource wurde verbraucht", MessageType.Success);
			})
			.catch((err) =>
				notificationStore.addNotification("Resourcen, konnten nicht aktualisiert werden.", MessageType.Error)
			);
	}

	/**
	 * Returns false if no user has been created yet.
	 *
	 * Check if localstorage contains user.
	 * Should no user exist fetch user from extension
	 * Otherwise create account // should only be needed during testing.
	 */
	function fetchActiveUser(): void {
		const userIdFromLocalStorage = localStorage.getItem("userId");

		if (userIdFromLocalStorage) {
			// Set active user.
			UserService.fetchUser(userIdFromLocalStorage)
				.then((user: User) => {
					activeUser.value = user;
					notificationStore.addNotification("Benutzer geladen", MessageType.Success);
					fetchUserResources();
				})
				.catch(() => notificationStore.addNotification("Benutzer konnte nicht geladen werden", MessageType.Error));

			return;
		}

		//Check for Background service
		MessageService.fetchUser(extensionStore.extensionId)
			.then((res) => {
				activeUser.value = res;
				notificationStore.addNotification("Benutzer geladen", MessageType.Success);
				fetchUserResources();
				localStorage.setItem("userId", res.uid);
			})
			.catch(() => notificationStore.addNotification("Benutzer konnte nicht geladen werden ext", MessageType.Error));
	}

	return { activeUser, userResources, fetchActiveUser, fetchUserResources, consumeResources };
});

export function useUserStore() {
	const store = useStore();
	const { activeUser, userResources } = storeToRefs(store);
	return { ...store, activeUser, userResources };
}
