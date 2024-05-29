<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { currentUser } from '@/components/user';

const route = useRoute()

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
</script>

<template>
	<div v-if="loading">loading...</div>
	<div v-else>
		<h2>
			Course: {{ course.slug }} {{ course.title }}
		</h2>

		<div>
			{{ course.description }}
		</div>

		<div class="my-4">
			<router-link :to="`/courses/${course.slug}/edit`" class="btn btn-light">Edit</router-link>
			<a href="#" @click.prevent="" class="btn btn-light">Submit for Reviewing</a>
		</div>


	</div>
</template>