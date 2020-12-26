<template>
    <div>
        <div></div>
    </div>
</template>

<script>
import storage from 'good-storage'
export default {

    data() {
        return {
            aaa: '授权中'
        }
    },
    created() {

    },
    methods: {
        login: function () {
            storage.set('token', 'ad7a20a6646af040f1ec3a401694c2c6')
            this.$router.push('./Index')

            // if (this.$route.query.token) {
            //     storage.set('token', this.$route.query.token)
            //     this.$router.push('./Index')
            //     //如果连接中能拿到code说明此时access_token没有或者已过期，需要重新获取token
            // } else {
            //     window.location.href = 'http://book.whatsfav.com/api/login/index'
            // }

        }
    },
    created() {
        this.login()
    }
}

</script>

<style scoped="scoped">
</style>