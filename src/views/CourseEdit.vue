<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentUser } from '@/components/user';

import CourseForm from "./CourseForm.vue";

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const course = ref(null)

async function load() {
	loading.value = true

	const url = `http://172.18.17.2:7078/api/v1/courses/${route.params.slug}`

	const res = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${currentUser.value.token}`
		}
	})

	const body = await res.json()
	console.log(body)
	if (res.ok) {
		course.value = body
	}
	loading.value = false
}
load()

function afterSave(course) {
	router.push(`/courses/${course.slug}`)
}

</script>

<template>
	<div v-if="loading">loading...</div>
	<div v-else>
		<fieldset>
			<legend>Edit Coruse</legend>
			<CourseForm :course="course" @save-success="afterSave"></CourseForm>
		</fieldset>
	</div>
</template>