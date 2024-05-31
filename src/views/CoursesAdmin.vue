<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentAdmin, signOut } from '@/components/admin';

import { adminFetch } from "@/api"

const route = useRoute()
const router = useRouter()

const courses = ref([])

async function load() {
	let url = "http://172.18.17.2:7078/api/v1/admin/courses"

	if (route.query.state) {
		url += `?state=${route.query.state}`
	}

	const res = await adminFetch(url)

	const body = await res.json()
	if (res.ok) {
		courses.value = body
	}
}
load()


function logout() {
	signOut()
	router.push("/")
}
</script>

<template>
	<div>Dashboard: {{ currentAdmin.name }} - <a href="#" @click.prevent="logout">Sign Out</a></div>

	<h3>
		Courses Management
	</h3>

	<div>
		<ul class="nav">
			<li class="nav-item">
				<router-link :to="{ path: '/admin/courses' }" class="nav-link">All</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ path: '/admin/courses', query: { state: 'published' } }"
					class="nav-link active">Published</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ path: '/admin/courses', query: { state: 'reviewing' } }"
					class="nav-link">Reviewing</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ path: '/admin/courses', query: { state: 'draft' } }"
					class="nav-link">Draft</router-link>
			</li>
		</ul>
	</div>

	<table class="table">
		<thead>
			<tr>
				<th>Slug</th>
				<th>Title</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Duration</th>
				<th>State</th>
				<th>Creator</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for=" c  in  courses ">
				<td>
					<router-link :to="`/courses/${c.slug}`">
						{{ c.slug }}
					</router-link>
				</td>
				<td>{{ c.title }}</td>
				<td>...</td>
				<td>...</td>
				<td>...</td>
				<td>{{ c.state }}</td>
				<td>{{ c.user_id }}</td>
			</tr>
		</tbody>
	</table>
</template>