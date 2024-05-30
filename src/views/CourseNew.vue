<script setup>
import { useRouter } from "vue-router";

import CourseForm from "./CourseForm.vue";

const router = useRouter()

function afterSave() {
	router.push("/courses/mine")
}

const course = {
	title: null,
	slug: null,
	description: null,
	lessons: []
}
</script>
<template>
	<fieldset>
		<legend>New Coruse</legend>
		<CourseForm :course="course" @save-success="afterSave"></CourseForm>
	</fieldset>
</template>