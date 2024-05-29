<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container">
			<router-link to="/" class="navbar-brand">Room Booking</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
							aria-expanded="false">
							Dropdown
						</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li>
								<hr class="dropdown-divider">
							</li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" aria-disabled="true">Disabled</a>
					</li>
				</ul>
				<ul class="nav">
					<li class="nav-item">
						<router-link to="/sign_in" class="nav-link">Sign In</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/sign_up" class="nav-link">Sign Up</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/dashboard" class="nav-link">user1</router-link>
					</li>
					<li class="nav-item">
						<a href="" class="nav-link">Sign Out</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>