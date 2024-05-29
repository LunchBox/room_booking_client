<script setup>
import { ref } from 'vue';
import { currentAdmin } from '@/components/admin';

const rooms = ref([])

async function load() {
	const url = "http://172.18.17.2:7078/api/v1/admin/rooms"

	const res = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${currentAdmin.value.token}`
		}
	})

	const body = await res.json()
	if (res.ok) {
		rooms.value = body
	}
}

load()
</script>

<template>
	<h3>
		Room Management
	</h3>

	<table class="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in rooms" :key="r.id">
				<td>
					<router-link :to="`/admin/rooms/${r.id}`">
						{{ r.title }}
					</router-link>
				</td>
				<td>
					{{ r.description }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style></style>