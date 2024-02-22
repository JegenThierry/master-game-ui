<template>
    <div class="flex w-full h-full min-h-screen bg-indigo-100">
        <div class="flex flex-col gap-2 m-auto w-1/2 p-4 rounded-md bg-white shadow-md">
            <h1 class="text-indigo-700 text-xl">Wir aktualisieren Ihre Informationen!</h1>
            <p v-if="isUserIdUpdated">
                Ihre Informationen wurden aktualisiert. Sie können diese Seite nun schließen.
            </p>
            <p v-else>
                Bitte warten Sie bis Ihre Informationen aktualisiert sind. Sollte dieser Text nicht nach kurzer Zeit
                verschwinden laden Sie die Seite neu.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import userService from "@/services/userService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const isUserIdUpdated = ref<boolean>(false);
const route = useRoute();

onMounted(() => {
    console.log("TEst")
    const userId = route.params.userid as string;
    if (!userId) return;

    userService.fetchUser(userId).then(res => {
        localStorage.setItem("extensionId", res.extensionId);
        localStorage.setItem("userId", res.uid);
        isUserIdUpdated.value = true;
    })
});
</script>
