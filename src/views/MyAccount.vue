<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle">My orders</h2>

                <OrderSummary
                    v-for="order in orders"
                    v-bind:key="order.name"
                    v-bind:order="order" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import OrderSummary from '@/components/OrderSummary.vue'
var token=localStorage.getItem("token");
var retaken=localStorage.getItem("retaken");
console.log(' token:'+token);

export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('token'));

  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}
export default {
    name: 'MyAccount',
   
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        document.title = 'My account | Busara Interview Task'

        this.getMyOrders()
    },

    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getMyOrders() {
            this.$store.commit('setIsLoading', true)
          //let user = JSON.parse(localStorage.getItem('token'));
        //  const headers = {'Authorization': 'Bearer '+ token };
            await axios.create({
              headers: {
                'Authorization': 'Bearer '+token
              }
            })
                .get('/api/v1/users/current-user')
                .then(response => {
                    this.orders = response.data.name
                  console.log('Busara Says Woot:' +response.data.universe_name)
                  localStorage.setItem("name", response.data.name)
                  localStorage.setItem("universe_name", response.data.universe_name)
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>