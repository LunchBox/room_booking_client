<script setup>
import { ref, computed, watch } from 'vue';

import { toDateStr } from '@/components/date.js'

import Calendar from '@/components/Calendar.vue';

import { userFetch, BASE_URL } from "@/api"

const props = defineProps(['course'])
const emit = defineEmits(['save-success'])

const course = ref(null)
const lessons = ref([])
watch(() => props.course, () => {
	course.value = { ...props.course }

	lessons.value = course.value.lessons.map(le => {
		const { room_id, date, from, to } = le
		return { room_id, date, from, to }
	})
}, { immediate: true })

const date = ref(new Date())

const rooms = ref([])
// const roomMap = computed(() => Object.fromEntries(rooms.value.map(r => [r.id, r])))

const currentRoom = ref(null)
const occupiedTimeSlots = computed(() => {
	if (!currentRoom.value) return []

	const res = {}
	currentRoom.value.lessons.filter(le => le.course_id !== course.value.id).forEach(le => {
		if (!res[le.date]) res[le.date] = []
		res[le.date].push({ ts: le.time_slot, str: le.course_title })
	})
	return res
})

async function loadRooms() {
	const url = `${BASE_URL}/rooms`

	const res = await userFetch(url)

	const body = await res.json()
	if (res.ok) {
		rooms.value = body
	}
}
loadRooms()


async function onSubmit() {
	let url = `${BASE_URL}/courses`
	let method = 'POST'
	if (course.value.id) {
		url += `/${course.value.id}`
		method = 'PUT'
	}

	const data = JSON.stringify({
		course: { ...course.value, lessons_attributes: lessons.value }
	})

	const res = await userFetch(url, method, data)

	const body = await res.json()
	if (res.ok) {
		emit('save-success', body)
	} else {
		console.log(body)
	}
}




const startTime = ref("10:00")
const endTime = ref("13:00")
function handleDateClick(d) {
	console.log(d)
	if (!currentRoom.value) {
		alert('Select a room first')
		return
	}

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
	<div>
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
					<div class="input-group">
						<span class="input-group-text">From</span>
						<input type="time" v-model="startTime" class="form-control">

						<span class="input-group-text">To</span>
						<input type="time" v-model="endTime" class="form-control">
					</div>
				</div>

				<div class="my-4">
					Step 2: select a room
					<nav class="nav nav-underline">
						<a v-for="r in rooms" class="nav-link" :class="{ active: r === currentRoom }" href="#"
							@click.prevent="currentRoom = r">{{ r.title }}</a>
					</nav>
					<div>
						{{ currentRoom && currentRoom.description }}
					</div>
				</div>

				<div class="my-4">
					Step 3: pick dates

					<Calendar :date="date" :occupied="occupiedTimeSlots" :bookings="bookingTimeSlots"
						@click-date="handleDateClick"></Calendar>

					<span>Lessons</span>
					<ol>
						<li v-for="le in lessons" class="my-1">
							<div class="input-group">
								<select v-model="le.room_id" class="form-control">
									<option v-for="r in rooms" :value="r.id">{{ r.title }}</option>
								</select>
								<input type="date" v-model="le.date" class="form-control">
								<input type="time" v-model="le.from" class="form-control">
								<input type="time" v-model="le.to" class="form-control">
								<button @click.prevent="delLesson(le)" type="button" class="btn btn-outline-danger"
									aria-label="Close">Del</button>
							</div>
						</li>
					</ol>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>