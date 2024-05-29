<script setup>
import CourseList from './CourseList.vue'
import RoomList from './RoomList.vue'
</script>


<template>
	<h2>Dashboard: user1</h2>

	<h3>
		My Courses
	</h3>

	<CourseList></CourseList>

	<br>
	<hr>
	<br>

	<h2>Dashboard: admin1</h2>

	<h3>
		Rooms
	</h3>

	<RoomList></RoomList>

	<h3>
		Courses for review
	</h3>

	<CourseList></CourseList>
</template>