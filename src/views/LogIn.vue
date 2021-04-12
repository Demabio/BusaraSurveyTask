<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Log in</button>
            </div>
          </div>

          <hr>

          Or <router-link to="/sign-up">click here</router-link> to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {toast} from "bulma-toast";
export default {
  name: 'LogIn',
  data() {
    return {
       grant_type:"password",
      password:'',
      username:'',
      client_id :'pw5ExLyIcOnxF3B0wna1m7qqHlKVvrB2VFHGtyHB',
      client_secret:'xqsESmmZxlwGokFuqQTigIwF3hyIWykudx6TCKseGeQIVlSApmscBNlugvfEUO7jh1HJUdXQTreYXJ93nayBjX4jlb8Zzxr4sxJXxJFHRQsMncxtoeUZwwNihdzBB039',

      errors: []
    }
  },
  mounted() {
    document.title = 'Log In | Busara Interview Task'
  },
  methods: {
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
    },
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = ""

      //localStorage.removeItem("token")
      var grant_type="password";
      const formData = {
        username: this.username,
        password: this.password,
        client_id :'pw5ExLyIcOnxF3B0wna1m7qqHlKVvrB2VFHGtyHB',
        client_secret:'xqsESmmZxlwGokFuqQTigIwF3hyIWykudx6TCKseGeQIVlSApmscBNlugvfEUO7jh1HJUdXQTreYXJ93nayBjX4jlb8Zzxr4sxJXxJFHRQsMncxtoeUZwwNihdzBB039',
        grant_type:grant_type,
      };
      const requestOptions = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          client_idd :'pw5ExLyIcOnxF3B0wna1m7qqHlKVvrB2VFHGtyHB',
          client_secret:'xqsESmmZxlwGokFuqQTigIwF3hyIWykudx6TCKseGeQIVlSApmscBNlugvfEUO7jh1HJUdXQTreYXJ93nayBjX4jlb8Zzxr4sxJXxJFHRQsMncxtoeUZwwNihdzBB039',
          grant_type:grant_type,
          password:this.password,
          username:this.username,
        })
      };
      //console.log(qs.stringify(formData));
      await axios
          .post("/api/v1/oauth/token/", qs.stringify(formData))
          .then(response => {
            console.log('Busara says Woot:' + response.data.access_token +'refresh token:'+response.data.refresh_token );
            const token = response.data.access_token;
            const retaken = response.data.refresh_token
            this.$store.commit('setToken', token)
            axios.defaults.headers.common["Authorization"] = "Token " + token
            this.$store.commit('setIsLoading', true)
            //let user = JSON.parse(localStorage.getItem('token'));
            //  const headers = {'Authorization': 'Bearer '+ token };
            axios.create({
              headers: {
                'Authorization': 'Bearer '+token
              }
            })
                .get('/api/v1/users/current-user')
                .then(response => {
                  this.orders = response.data.name
                  localStorage.setItem("name", response.data.name)
                  localStorage.setItem("universe_name", response.data.universe_name)
                })
                .catch(error => {
                  console.log(error)
                })

            this.$store.commit('setIsLoading', false)
            //Pad given value to the left with "0"
            
            var today = new Date();
            var day = today.getDate() + "";
            var month = (today.getMonth() + 1) + "";
            var year = today.getFullYear() + "";
            var hour = today.getHours() + "";
            var minutes = today.getMinutes() + "";
            var seconds = today.getSeconds() + "";

            day = checkZero(day);
            month = checkZero(month);
            year = checkZero(year);
            hour = checkZero(hour);
            minutes = checkZero(minutes);
            seconds = checkZero(seconds);
            var startDateTime=day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

            function checkZero(data){
              if(data.length == 1){
                data = "0" + data;
              }
              return data;
            }
            console.log('Hivi sasa:'+startDateTime);

            localStorage.setItem("startDateTime", startDateTime)
            localStorage.setItem("token", token)
            localStorage.setItem("retaken", retaken)
            toast({
              message: 'Logged in Successfully!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
            const toPath = this.$route.query.to || '/my-survey'

            this.$router.push(toPath)
            // location.reload(true);
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
            } else {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify('busara error response:'+error))
            }
          })
    }
  }
}
</script>