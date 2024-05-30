<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentUser } from '@/components/user';

import { toDateStr } from '@/components/date.js'

import Calendar from '@/components/Calendar.vue';

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const course = ref(null)

const date = ref(new Date())

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


const rooms = ref([])
const currentRoom = ref(null)
const occupiedTimeSlots = computed(() => {
	if (!currentRoom.value) return []

	const res = {}
	currentRoom.value.lessons.filter(le => le.course_id !== course.value.id).forEach(le => {
		if (!res[le.date]) res[le.date] = []
		res[le.date].push({ ts: le.time_slot, str: le.course_name })
	})
	return res
})

async function loadRooms() {
	const url = `http://172.18.17.2:7078/api/v1/rooms`

	const res = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${currentUser.value.token}`
		}
	})

	const body = await res.json()
	if (res.ok) {
		rooms.value = body
	}
}
loadRooms()



async function onSubmit() {
	const url = `http://172.18.17.2:7078/api/v1/courses/${course.value.id}`

	const res = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": `Bearer ${currentUser.value.token}`
		},
		body: JSON.stringify({
			course: { ...course.value, lessons_attributes: lessons.value }
		})
	})

	const body = await res.json()
	if (res.ok) {
		router.push(`/courses/${course.value.slug}`)
	} else {
		console.log(body)
	}
}

const lessons = ref([])
watch(course, () => {
	lessons.value = course.value.lessons.map(le => {
		const { room_id, date, from, to } = le
		return { room_id, date, from, to }
	})
})

const startTime = ref("10:00")
const endTime = ref("13:00")
function handleDateClick(d) {
	console.log(d)
	lessons.value.push({
		room_id: currentRoom.value.id,
		date: toDateStr(d),
		from: startTime.value,
		to: endTime.value
	})
}

function delLesson(le) {
	lessons.value.splice(lessons.value.indexOf(le), 1)
}

const bookingTimeSlots = computed(() => {
	if (!currentRoom.value) return []

	const res = {}
	lessons.value.filter(le => le.room_id === currentRoom.value.id).forEach(le => {
		if (!res[le.date]) res[le.date] = []
		const ts = `${le.from.slice(0, 5)} ~ ${le.to.slice(0, 5)}`
		res[le.date].push({ ts, str: course.value.title })
	})
	return res
})

</script>

<template>
	<h2>Edit Course</h2>

	<div v-if="loading">loading...</div>
	<div v-else>
		<form @submit.prevent="onSubmit">
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Title</label>
				<input v-model="course.title" type="text" class="form-control" id="exampleInputPassword1">
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword2" class="form-label">Slug</label>
				<input v-model="course.slug" type="text" class="form-control" id="exampleInputPassword1">
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Description</label>
				<textarea v-model="course.description" class="form-control" id="exampleInputPassword1"></textarea>
			</div>

			<div class="mb-3">
				Schedule

				<div class="my-4">
					Step 1: select a time period
					<div>
						From:
						<input type="time" v-model="startTime">
						To:
						<input type="time" v-model="endTime">
					</div>
				</div>

				<div class="my-4">
					Step 2: select a room
					<nav class="nav nav-underline">
						<a v-for="r in rooms" class="nav-link" :class="{ active: r === currentRoom }" href="#"
							@click.prevent="currentRoom = r">{{ r.title }}</a>
					</nav>
				</div>

				<div class="my-4">
					Step 3: pick dates

					<Calendar :date="date" :occupied="occupiedTimeSlots" :bookings="bookingTimeSlots"
						@click-date="handleDateClick"></Calendar>

					<ul>
						<li v-for="le in lessons">
							{{ le }}
							<a href="#" @click.prevent="delLesson(le)">Del</a>
						</li>
					</ul>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>