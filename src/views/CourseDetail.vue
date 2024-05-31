<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { currentUser } from '@/components/user';
import { currentAdmin } from '@/components/admin';

import { userFetch, adminFetch } from "@/api"

const route = useRoute()

const loading = ref(true)
const course = ref(null)

async function load() {
	loading.value = true
	const url = `http://172.18.17.2:7078/api/v1/courses/${route.params.slug}`

	let act = fetch

	if (currentUser.value) {
		act = userFetch
	} else if (currentAdmin.value) {
		act = adminFetch
	}
	const res = await act(url)

	const body = await res.json()
	if (res.ok) {
		course.value = body
	}
	loading.value = false
}

load()



async function submit() {
	const url = `http://172.18.17.2:7078/api/v1/courses/${course.value.id}/publish`

	const res = await userFetch(url, "PATCH")

	const body = await res.json()
	if (res.ok) {
		load()
	} else {
		console.log(body)
	}
}

async function approve() {
	const url = `http://172.18.17.2:7078/api/v1/admin/courses/${course.value.id}/approve`

	const res = await adminFetch(url, "PATCH")

	const body = await res.json()
	if (res.ok) {
		load()
	} else {
		console.log(body)
	}
}

async function revoke() {
	const url = `http://172.18.17.2:7078/api/v1/admin/courses/${course.value.id}/revoke`

	const res = await adminFetch(url, "PATCH")

	const body = await res.json()
	if (res.ok) {
		load()
	} else {
		console.log(body)
	}
}

</script>

<template>
	<div v-if="loading">loading...</div>
	<div v-else>
		<div>
			state: {{ course.state }}
		</div>

		<h2>
			Course: {{ course.slug }} {{ course.title }}
		</h2>


		<div class="my-4" v-if="currentUser && course.state === 'draft'">
			<router-link :to="`/courses/${course.slug}/edit`" class="btn btn-light">Edit</router-link>
			<a href="#" @click.prevent="submit" class="btn btn-light">Publish</a>
		</div>

		<div class="my-4" v-if="currentAdmin">
			<template v-if="course.state === 'reviewing'">
				<a href="#" @click.prevent="approve" class="btn btn-light">Approve</a>
				<a href="#" class="btn btn-light">Reject</a>
			</template>

			<template v-if="course.state === 'published'">
				<a href="#" @click.prevent="revoke" class="btn btn-light">Revoke</a>
			</template>
		</div>

		<div>
			{{ course.description }}
		</div>

		<div>
			<ul>
				<li v-for="le in course.lessons">
					{{ le.date }}
					{{ le.time_slot }},
					{{ le.room_title }}
				</li>
			</ul>
		</div>
	</div>
</template>