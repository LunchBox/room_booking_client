<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { currentUser } from '@/components/user';
import { currentAdmin } from '@/components/admin';

import { userFetch, adminFetch, BASE_URL } from "@/api"

const route = useRoute()

const loading = ref(true)
const course = ref(null)

async function load() {
	loading.value = true
	const url = `${BASE_URL}/courses/${route.params.slug}`

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
	const url = `${BASE_URL}/courses/${course.value.id}/publish`

	const res = await userFetch(url, "PATCH")

	const body = await res.json()
	if (res.ok) {
		load()
	} else {
		console.log(body)
	}
}

async function approve() {
	const url = `${BASE_URL}/admin/courses/${course.value.id}/approve`

	const res = await adminFetch(url, "PATCH")

	const body = await res.json()
	if (res.ok) {
		load()
	} else {
		console.log(body)
	}
}

async function revoke() {
	const url = `${BASE_URL}/admin/courses/${course.value.id}/revoke`

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

		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item">
					<router-link to="/courses/mine" class="nav-link" aria-current="page" v-if="currentUser">
						My Courses
					</router-link>
					<router-link to="/admin/courses" class="nav-link" aria-current="page" v-else-if="currentAdmin">
						Courses Management
					</router-link>
					<router-link to="/courses" class="nav-link active" aria-current="page" v-else>
						Courses
					</router-link>
				</li>
				<li class="breadcrumb-item active" aria-current="page">
					{{ course.slug }}
					<span class="badge text-bg-light"></span>
				</li>
			</ol>
		</nav>


		<h2>
			{{ course.title }}
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

		<div class="my-4">
			{{ course.description }}
		</div>

		<h3>Lessons</h3>

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