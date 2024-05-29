<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<header>
		<h1>
			<router-link to="/">Room Booking</router-link>
		</h1>

		<div class="user-nav">
			<router-link to="/sign_in">Sign In</router-link>
			<router-link to="/sign_up">Sign Up</router-link>
			<router-link to="/dashboard">user1</router-link>
			<a href="">Sign Out</a>
		</div>
	</header>

	<main>
		<RouterView />
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
