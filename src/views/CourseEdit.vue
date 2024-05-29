<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentUser } from '@/components/user';

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
	if (res.ok) {
		course.value = body
	}
	loading.value = false
}
load()



async function onSubmit() {
	const url = `http://172.18.17.2:7078/api/v1/courses/${course.value.id}`

	const res = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": `Bearer ${currentUser.value.token}`
		},
		body: JSON.stringify({
			course: course.value
		})
	})

	const body = await res.json()
	if (res.ok) {
		router.push(`/courses/${course.value.slug}`)
	} else {
		console.log(body)
	}
}
</script>

<template>
	<h2>Edit Course</h2>

	<div v-if="loading">loading...</div>
	<div v-else>
		<form @submit.prevent="onSubmit">
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Title</label>
				<input v-model="course.title" type="text" class="form-control" id="exampleInputPassword1">
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword2" class="form-label">Slug</label>
				<input v-model="course.slug" type="text" class="form-control" id="exampleInputPassword1">
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Description</label>
				<textarea v-model="course.description" class="form-control" id="exampleInputPassword1"></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>