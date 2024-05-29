<script setup>
import { useRouter } from 'vue-router';
import { currentUser } from '@/components/user';
import { currentAdmin, signOut } from '@/components/admin';

import Rooms from './Rooms.vue'
import CoursesAdmin from './CoursesAdmin.vue'

import CoursesMine from './CoursesMine.vue'

const router = useRouter()
function logout() {
	signOut()
	router.push("/")
}

</script>


<template>
	<template v-if="currentUser">
		<h2>Dashboard: {{ currentUser.name }}</h2>

		<CoursesMine></CoursesMine>

		<br>
		<br>
	</template>

	<template v-if="currentAdmin">
		<div>Dashboard: {{ currentAdmin.name }} - <a href="#" @click.prevent="logout">Sign Out</a></div>

		<Rooms></Rooms>

		<router-link to="/admin/courses">Course Management</router-link>
	</template>
</template>