<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { signIn } from "../components/user.js"

const formData = ref({
	name: null,
	password: null,
	password_confirmation: null
})

const errors = ref(null)

const router = useRouter()

async function onSubmit() {
	errors.value = null

	const url = "http://172.18.17.2:7078/api/v1/users"

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			user: formData.value
		})
	})

	const body = await res.json()
	if (res.ok) {
		const { user, token } = body
		signIn({ ...user, token })

		router.push("/dashboard")
	} else {
		console.log(body)
	}
}
</script>

<template>
	<div class="justify-content-center">
		<h2>Sign Up</h2>

		<form @submit.prevent="onSubmit">
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input v-model="formData.name" type="text" required class="form-control" id="name"
					aria-describedby="nameHelp">
				<div id="nameHelp" class="form-text">Name with character and numbers.</div>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input v-model="formData.password" type="password" required class="form-control" id="password">
			</div>
			<div class="mb-3">
				<label for="password_confirmation" class="form-label">Password Confirmation</label>
				<input v-model="formData.password_confirmation" type="password" required class="form-control"
					id="password_confirmation">
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>