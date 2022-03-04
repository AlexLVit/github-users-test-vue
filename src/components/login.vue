<template>
    <div class="login">
        <h3>Login form:</h3>
        <button type="button" class="btn btn-outline-secondary">
			<a class="login__link" :href="`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`">
                <font-awesome-icon icon="fa-brands fa-github" />
                Login via GitHub
            </a>
		</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            redirect_uri: "http://localhost:8080/main",
			client_id: "eb6e21056f011a996e0b"
        }
    }
}
</script>

<style scoped>
.login {
    margin: 25% auto;
    width: 240px;
    height: 120px;
    border: 1.5px solid #6c757d;
    text-align: center;
    background-color: hsl(56, 35%, 84%, 0.6);
    padding: 10px;
}
.login__link {
    text-decoration: none;
    color: black;
}
.login__link:hover {
    color: white;
}

</style>