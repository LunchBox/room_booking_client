<script setup>
import { ref } from 'vue';

const courses = ref([])

async function load() {
	const url = "http://172.18.17.2:7078/api/v1/courses"

	const res = await fetch(url)

	const body = await res.json()
	if (res.ok) {
		courses.value = body
	}
}

load()
</script>

<template>
	<h2>
		Discover Courses
	</h2>

	<table class="table">
		<thead>
			<tr>
				<th>Slug</th>
				<th>Title</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Duration</th>
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
			</tr>
		</tbody>
	</table>
</template>

<style></style>