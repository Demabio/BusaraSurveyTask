<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Account Details</h1>
            </div>
          <table class="table">
            <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Refferal Code</th>
              <th>Universe</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{orders.first_name}}</td>
              <td>{{orders.last_name}}</td>
              <td>{{orders.email}}</td>
              <td>{{orders.phone_number}}</td>
              <td>{{orders.referral_code}}</td>
              <td>{{orders.universe_name}}</td>
            </tr>
          
        
            </tbody>
          </table>
        </div>
           

            <hr>

           
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
      cartTotalLength() {
        let name= localStorage.getItem("name")
        console.log('Kwa majina ni:'+name)
        return name
      },
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
                    this.orders = response.data
                  console.log('Busara Says Woot:' +JSON.stringify(response))
                  localStorage.setItem("name", response.data.name)
                  localStorage.setItem("universe_name", response.data.firstname)
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>