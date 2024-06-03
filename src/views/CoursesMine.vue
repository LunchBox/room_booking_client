<script setup>
import { ref } from 'vue';
import { userFetch, BASE_URL } from "@/api"

const courses = ref([])

async function load() {
	const url = `${BASE_URL}/courses/mine`

	const res = await userFetch(url)

	const body = await res.json()
	if (res.ok) {
		courses.value = body
	}
}

load()
</script>

<template>
	<h3>
		My Courses
	</h3>

	<div>
		<router-link to="/courses/new" class="btn btn-light">Add New Course</router-link>
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
			</tr>
		</thead>
		<tbody>
			<tr v-for="c in courses">
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
			</tr>
		</tbody>
	</table>
</template>