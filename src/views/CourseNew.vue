<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { currentUser } from "@/components/user.js"

const formData = ref({
	title: null,
	slug: null,
	description: null
})

const errors = ref(null)

const router = useRouter()

async function onSubmit() {
	errors.value = null

	const url = "http://172.18.17.2:7078/api/v1/courses"

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": `Bearer ${currentUser.value.token}`
		},
		body: JSON.stringify({
			course: formData.value
		})
	})

	const body = await res.json()
	if (res.ok) {
		router.push("/")
	} else {
		console.log(body)
	}
}
</script>
<template>
	<h2>New Course</h2>

	<form @submit.prevent="onSubmit">
		<div class="mb-3">
			<label for="exampleInputPassword1" class="form-label">Title</label>
			<input v-model="formData.title" type="text" class="form-control" id="exampleInputPassword1">
		</div>
		<div class="mb-3">
			<label for="exampleInputPassword2" class="form-label">Slug</label>
			<input v-model="formData.slug" type="text" class="form-control" id="exampleInputPassword1">
		</div>
		<div class="mb-3">
			<label for="exampleInputPassword1" class="form-label">Description</label>
			<textarea v-model="formData.description" class="form-control" id="exampleInputPassword1"></textarea>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</template>