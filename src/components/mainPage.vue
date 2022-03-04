<template>
	<div class="main">
		<div class="input-group mb-3">
			<input type="text" class="form-control" id="search" placeholder="search with login" @input="getUserByLogin()" v-model="search" aria-label="Example text with button addon" aria-describedby="button-addon1">
			<button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="getUserByLogin()" :disabled="!search.length">
				<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
			</button>
		</div>
		<userList :list="users"/>
		<button v-if="users && Array.isArray(users)" type="button" class="btn btn-secondary show-more" @click="getContent(users[users.length - 1].id)">Show more</button>
	</div>
</template>

<script>
import userList from '@/components/userList.vue';
export default {
	name: 'mainPage',
	components: {
		userList
	},
	props: {
	},
	data() {
		return {
			users: [],
			userInfo: [],
			search: ''
		}
	},
	mounted() {
		this.getContent()
	},
	methods: {
		//get list of users with limit of 10
		getContent(id = 1, limit = 10) {
			fetch(`https://api.github.com/users?since=${id}&per_page=${limit}`)
			.then(result => result.json())
			.then(data => {
				if(this.users.length) {
					this.users = [...this.users, ...data]
				} else {
					this.users = data
				}
			})
			.catch(err => console.log(err))
		},
		//search user with login
		getUserByLogin() {
			fetch(`https://api.github.com/users/${this.search}`)
			.then(result => result.json())
			.then(data => {
				this.users = data
			})
		}
	},
	watch: {
		//watch search input, get user list if search input is empty
		search: function() {
			if(this.search == '') {
				this.getContent()
			}
		}
	}
}
</script>

<style scoped>
.main {
	font-weight: 700;
}
.mb-3 {
	padding-top: 5%;
	width: 720px;
	margin: auto;
}
.show-more {
	margin: 0 0 5% 45%;
}

</style>
