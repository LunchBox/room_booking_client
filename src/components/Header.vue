<script setup>
import { useRouter } from 'vue-router';
import { currentUser, signOut as signOutUser } from './user';
import { currentAdmin, signOut as signOutAdmin } from './admin';

const router = useRouter()
function logout() {
	signOutUser()
	signOutAdmin()
	router.push("/")
}
</script>

<template>
	<header class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container">
			<router-link to="/" class="navbar-brand">Room Booking</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link to="/courses" class="nav-link active" aria-current="page">
							Courses
						</router-link>
					</li>
					<li v-if="currentUser" class="nav-item">
						<router-link to="/courses/mine" class="nav-link" aria-current="page">
							My Courses
						</router-link>
					</li>
					<li v-if="currentAdmin" class="nav-item">
						<router-link to="/admin/courses" class="nav-link" aria-current="page">
							Courses Management
						</router-link>
					</li>
				</ul>
				<ul class="nav">
					<template v-if="currentUser">
						<li class="nav-item">
							<a href="#" class="nav-link">
								{{ currentUser.name }}
							</a>
						</li>
						<li class="nav-item">
							<a href="" class="nav-link" @click.prevent="logout">Sign Out</a>
						</li>
					</template>
					<template v-else-if="currentAdmin">
						<li class="nav-item">
							<a href="#" class="nav-link">
								{{ currentAdmin.name }}
							</a>
						</li>
						<li class="nav-item">
							<a href="" class="nav-link" @click.prevent="logout">Sign Out</a>
						</li>
					</template>
					<template v-else>
						<li class="nav-item">
							<router-link to="/sign_in" class="nav-link">Sign In</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/sign_up" class="nav-link">Sign Up</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</header>
</template>