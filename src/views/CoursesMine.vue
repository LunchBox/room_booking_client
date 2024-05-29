<script setup>
import { ref } from 'vue';
import { currentUser } from '@/components/user';

import CourseList from './CourseList.vue'
import RoomList from './RoomList.vue'

const courses = ref([])

async function load() {
	const url = "http://172.18.17.2:7078/api/v1/courses/mine"

	const res = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${currentUser.value.token}`
		}
	})

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