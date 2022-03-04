<template>
    <div>
        <ul class="user" v-if="list && Array.isArray(list)">
            <li class="user__container" v-for="user in list" :key="user.id">
                <div class="flex-container">
                    <img v-if="user.avatar_url" class="user__avatar" :src="`${user.avatar_url}`" alt="">
                    <div class="user__short-info">
                        <p v-if="user.login" class="user__login" @click="showUserInfo(user.id)">
                            Login: {{user.login}}
                            <font-awesome-icon v-if="!extendedIds.includes(user.id)" icon="fa-solid fa-angle-down" />
                            <font-awesome-icon v-else icon="fa-solid fa-angle-up" />
                        </p>
                        <p v-if="user.id" class="user__id">Id: {{user.id}}</p>
                        <p v-if="user.html_url" class="user__url">URL: <a :href="`${user.html_url}`" target="_blank">{{user.html_url}}</a></p>
                    </div>
                </div>
                <extended v-if="extendedIds.includes(user.id)" :login="user.login"/>
            </li>
        </ul>
        <div v-else class="user">
            <div class="user__container">
                <div class="flex-container">
                    <img v-if="list.avatar_url" class="user__avatar" :src="`${list.avatar_url}`" alt="">
                    <div class="user__short-info">
                        <p v-if="list.login" class="user__login" @click="showUserInfo(list.id)">
                            Login: {{list.login}}
                            <font-awesome-icon v-if="!extendedIds.includes(list.id)" icon="fa-solid fa-angle-down" />
                            <font-awesome-icon v-else icon="fa-solid fa-angle-up" />
                        </p>
                        <p v-if="list.id" class="user__id">Id: {{list.id}}</p>
                        <p v-if="list.html_url" class="user__url">URL: <a :href="`${list.html_url}`" target="_blank">{{list.html_url}}</a></p>
                    </div>
                </div>
                <extended v-if="extendedIds.includes(list.id)" :login="list.login"/>
            </div>
        </div>
    </div>
</template>

<script>
import extended from '@/components/extendedInfo.vue';
export default {
    props: [
        "list"
    ],
    components: {
        extended
    },
    data() {
        return {
            extendedIds: []
        }
    },
    methods: {
        showUserInfo(id) {
            if(this.extendedIds.includes(id)) {
                this.extendedIds = this.extendedIds.filter(el => el != id)
            }else {
                this.extendedIds = [...this.extendedIds, id]
            }
        }
    },

}
</script>

<style scoped>
.user {
    list-style: none;
    padding: 0;
    width: 720px;
    margin: auto;
}
.user__container {
    border: 1px solid #6c757d;
    margin: 15px 0;
}
.user__short-info{
    margin: 20px 0;
    font-size: 14px;
    font-weight: 700
}
.user__avatar {
    width: 120px;
    margin: 20px 5%;
    border-radius: 50%;
}
.user__login{
    cursor: pointer;
}
.user__login:hover {
    color: #E83A14;
}
.flex-container{
    display: flex;
}
</style>