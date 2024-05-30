<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from "./components/Header.vue"
</script>

<template>
	<Header>
		<div class="container">
		</div>
	</Header>

	<main>
		<div class="container">
			<RouterView />
		</div>
	</main>
</template>

<style scoped>
header {
	display: flex;
	align-items: center;
}

main {
	margin: 1rem 0;
}

.user-nav {
	margin-left: auto;
	display: flex;
	gap: 0 1rem;
}
</style>
