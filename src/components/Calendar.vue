<script setup>
import { ref, computed, watch } from 'vue';
import { diffDays, dayOffset, toDateStr } from '@/components/date.js'

import Lock from '@/components/icons/Lock.vue'

const ws = ['Sun', 'Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat']

const props = defineProps(['date', 'occupied', 'bookings'])

const emit = defineEmits(['click-date'])

function prevMonth() {
	const d = new Date(year.value, month.value - 1, 1)
	setDate(d)
}

function nextMonth() {
	const d = new Date(year.value, month.value + 1, 1)
	setDate(d)
}

const year = ref(null)
const month = ref(null)

function setDate(d) {
	year.value = d.getFullYear()
	month.value = d.getMonth()
}

setDate(new Date())
watch(() => props.date, setDate)

const firstDayOfMonth = computed(() => new Date(year.value, month.value, 1))
const lastDayOfMonth = computed(() => new Date(year.value, month.value + 1, 0))

const firstDay = computed(() => {
	const offset = firstDayOfMonth.value.getDay()
	return new Date(year.value, month.value, -offset + 1)
})

const dates = computed(() => {
	let days = diffDays(lastDayOfMonth.value, firstDay.value)

	if (days % 7 > 0) {
		days = Math.ceil(days / 7) * 7
	}

	return [...Array(days)].map((v, i) => dayOffset(firstDay.value, i))
})

function clickOn(date) {
	emit('click-date', date)
}

</script>

<template>
	<div class="cal7">
		<div class="toolbar">
			<a href="#" @click.prevent="prevMonth">&lt; Prev</a>
			{{ year }} {{ month }}
			<a href="#" @click.prevent="nextMonth">Next &gt;</a>
		</div>
		<div class="dates">
			<div v-for="w in ws" :key="w" class="cell wday" :class="w.toLowerCase()">
				{{ w }}
			</div>
			<div v-for="date in dates" class="cell">
				<div class="day-mark" @click.prevent="clickOn(date)">
					{{ date.getDate() }}
				</div>
				<div v-if="occupied && occupied[toDateStr(date)]">
					<div v-for="le in occupied[toDateStr(date)]" class="occupied">
						<Lock></Lock>
						{{ le.ts }}
					</div>
				</div>

				<div v-if="bookings && bookings[toDateStr(date)]">
					<div v-for="le in bookings[toDateStr(date)]" class="booking">
						<Lock></Lock>
						{{ le.ts }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.cal7 {}

.cal7 .toolbar {
	display: flex;
	justify-content: space-between;
}

.cal7 .dates {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	border: 1px solid #ccc;
	width: 100%;
}

.cal7 .cell {
	border: 1px solid #ccc;
	text-align: center;

	position: relative;
}

.cal7 .day-mark {
	display: block;
	margin: 2px;
	border-radius: 4px;
}

.cal7 .day-mark:hover {
	background-color: #ccc;
	cursor: pointer;
}

.wday {}

.cal7 .occupied {
	font-size: 0.8rem;
	font-weight: bold;
	white-space: nowrap;

	display: inline-flex;
	align-items: center;
}

.cal7 .booking {
	color: rgba(var(--bs-link-color-rgb), 1);
	font-size: 0.8rem;
	font-weight: bold;
	white-space: nowrap;

	display: inline-flex;
	align-items: center;
}

.lock-icon {
	width: 0.8rem;
	height: 0.8rem;
	fill: black;
	/* 設置圖標顏色 */
}

.cal7 .booking .lock-icon {
	fill: rgba(var(--bs-link-color-rgb), 1);
}
</style>