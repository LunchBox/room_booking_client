<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { signIn } from "@/components/admin.js"
import { BASE_URL } from "@/api";

const formData = ref({
	name: null,
	password: null
})

const errors = ref(null)

const router = useRouter()

async function onSubmit() {
	errors.value = null

	const url = `${BASE_URL}/admin/sign_in`

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(formData.value)
	})

	const body = await res.json()
	console.log(body)

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
	<fieldset>
		<legend>Admin Sign In</legend>

		<form @submit.prevent="onSubmit">
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input v-model="formData.name" type="text" required class="form-control" id="name"
					aria-describedby="nameHelp">
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input v-model="formData.password" type="password" required class="form-control" id="password">
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</fieldset>
</template>