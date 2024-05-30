<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { signIn } from "../components/user.js"

const formData = ref({
	name: null,
	password: null
})

const errors = ref(null)

const router = useRouter()

async function onSubmit() {
	errors.value = null

	const url = "http://172.18.17.2:7078/api/v1/sign_in"

	console.log(JSON.stringify(formData.value))

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(formData.value)
	})

	const body = await res.json()
	if (res.ok) {
		const { user, token } = body
		signIn({ ...user, token })

		router.push("/")
	} else {
		console.log(body)
	}
}
</script>

<template>
	<h2>Sign In</h2>

	<form @submit.prevent="onSubmit">
		<div class="mb-3">
			<label for="name" class="form-label">Name</label>
			<input v-model="formData.name" type="text" required class="form-control" id="name" aria-describedby="nameHelp">
		</div>
		<div class="mb-3">
			<label for="password" class="form-label">Password</label>
			<input v-model="formData.password" type="password" required class="form-control" id="password">
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</template>