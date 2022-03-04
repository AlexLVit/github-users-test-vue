<template>
	<div v-if="login" class="extended">
		<div>
			<img v-if="user.avatar_url" :src="`${user.avatar_url}`" alt="">
			<p v-if="user.name"><span>Name: </span>{{user.name}}</p>
			<p v-if="user.login"><span>Login: </span>{{user.login}}</p>
			<p v-if="user.location"><span>Location: </span>{{user.location}}</p>
			<p v-if="user.email"><span>Email: </span>{{user.email}}</p>
			<p v-if="user.company"><span>Company: </span>{{user.company}}</p>
			<p v-if="user.created_at"><span>Created at: </span>{{new Date(user.created_at).toLocaleDateString("ru-RU")}}</p>
			<span v-if="user.public_repos && user.public_repos > 0" class="repo-list">List of repositories:</span>
			<div v-if="user.public_repos && user.public_repos > 0" class="extended__buttons">
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
						Sort
					</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
						<li><button class="dropdown-item" type="button" @click="getRepos(1,15,'created')">Created</button></li>
						<li><button class="dropdown-item" type="button" @click="getRepos(1,15,'updated')">Updated</button></li>
						<li><button class="dropdown-item" type="button" @click="getRepos(1,15,'pushed')">Pushed</button></li>
						<li><button class="dropdown-item" type="button" @click="getRepos(1,15,'full_name')">Full name</button></li>
					</ul>
				</div>
				<div v-if="user.public_repos && user.public_repos > 15" class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
						Page
					</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
						<li v-for="i in Math.ceil(user.public_repos/15)" :key="i">
							<button class="dropdown-item" type="button" @click="getRepos(i)">{{i}}</button>
						</li>
					</ul>
				</div>
			</div>
			<ul>
				<li v-for="rep in repos" :key="rep.id">
					<a v-if="rep.html_url" :href="`${rep.html_url}`" target="_blank">{{rep.full_name}}</a>
					<p v-else>{{rep.full_name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		"login"
	],
	data()  {
		return {
			user: [],
			repos: []
		}
	},
	mounted() {
		this.getUserInfo()
		this.getRepos()
	},    
	methods: {
		//get selected user information
		getUserInfo() {
			fetch(`https://api.github.com/users/${this.$props.login}`)
			.then(result => result.json())
			.then(data => {
				this.user = data
			})
			.catch(err => console.log(err))
		},
		//get list of repositories for selected user
		getRepos(page = 1, limit = 15, sort = "full_name") {
			fetch(`https://api.github.com/users/${this.$props.login}/repos?page=${page}&per_page=${limit}&sort=${sort}`)
			.then(result => result.json())
			.then(data => {
				this.repos = data
			})
			.catch(err => console.log(err))
		}
	},

}
</script>

<style scoped>
.extended {
	margin: 15px;
	padding: 10px;
	background-color: hsl(56, 35%, 84%, 0.6);
	font-weight: 400;
}
.extended__buttons {
	text-align: end;
}
.dropdown {
	display: inline-block;
	margin: 0 5px;
}
img {
	width: 200px;
}

.repo-list{
	font-size: 18px;
	font-weight: 700;
}
</style>
