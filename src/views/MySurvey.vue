<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h5 style="font-weight:bold">Welcome to Busara Online Survey</h5>
        <h6 style="font-weight:bold">"This is a basic campaign with questions and images"</h6>
        <hr>
        <form @submit.prevent="submitForm">
          <fieldset>
            <legend class="has-background-success">Bio Data</legend>
            <div class="field">
              <label>  Full Name</label>
              <div class="control">
                <input type="text" class="input" v-model="full_name">
              </div>
            </div>

            <div class="field">
              <label>Phone Number</label>
              <div class="control">
                <input type="text" class="input" v-model="phone_number">
              </div>
            </div>
            <div class="field">
              <label>What is your gender?</label>
              <br/>
              <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option>1-Male</option>
                <option>2-Female</option>
                <option>3-Other</option>
              </select>
              <span>Selected: {{ selected }}</span>
            </div>
          </fieldset>
          <hr>
          <fieldset>
            <legend class="has-background-success">Demographic Info</legend>
            <div class="field">
              <label> What is Date of Birth?</label>
              <div class="control">
                <input type="date" class="input" v-model="DOB">
              </div>
            </div>
          </fieldset>
          <hr>
          <fieldset>
            <legend class="has-background-success">Compare Images</legend>
            <mdb-container class="mt-5">
            <labe>What Does the image imply?</labe>
              <label>You Can Choose More than one option</label>
              <br/>
              <select v-model="multiselected" multiple>
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>
              <span>Selected: {{ multiselected }}</span>
              <div class="gallery" id="gallery">
                <!-- Grid column -->

                <transition @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave">
                  <div v-if="show === 'all' || show === '2'" class="mb-3 pics all 2 animation" style="">
                    <img class="img-fluid" src="http://api-kite-staging.busara.io/media/uploads/Question_article-image_file_5fc41859-2001-445a-b63f-b36ec6d04706.jpg" alt="Card image cap">
                  </div>
                </transition>
                <!-- Grid column -->

                <!-- Grid column -->
                <transition @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave">
                  <div v-if="show === 'all' || show === '1'" class="mb-3 pics all 1 animation" style="">
                    <img class="img-fluid" src="http://api-kite-staging.busara.io/media/uploads/Question_article-image_file_36958ec6-a463-4389-9df0-4be3bda73ac6.jpg" alt="Card image cap">
                  </div>
                </transition>
                <!-- Grid column -->
                <transition @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave">
                  <div v-if="show === 'all' || show === '1'" class="mb-3 pics all 1 animation" style="">
                    <img class="img-fluid" src="http://api-kite-staging.busara.io/media/uploads/Question_article-image_file_36958ec6-a463-4389-9df0-4be3bda73ac6.jpg" alt="Card image cap">
                  </div>
                </transition>
              </div>
            </mdb-container>
          </fieldset>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>

          <hr>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
// import { mdbContainer, mdbRow, mdbCol, mdbIcon, mdbBtn, mdbLightbox, mdbCarousel, mdbCard, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbNavItem } from "mdbvue";
var token=localStorage.getItem("token");
export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      email: '',
      full_name:'',
      phone_number:'',
      referral_code: '',
      device_details:{"device": "Dummy"},
      location: 'Dummy',
      errors: [],
      selected: '',
      DOB:'',
      show: 'all',
      multiselected: '1',
      options: [
        { text: 'AirTime', value: '1' },
        { text: 'Mobile Money', value: '2' },
        { text: 'Mobile Banking', value: '3' }
      ]
    }
  },
  methods: {
    enter(el) {
      el.style.opacity = 0;
    },
    afterEnter(el) {
      el.style.opacity = 1;
    },
    beforeLeave(el) {
      el.style.opacity = 0;
    },
  
  // components: {
  //   mdbContainer,
  //   mdbRow,
  //   mdbCol,
  //   mdbIcon,
  //   mdbBtn,
  //   mdbLightbox,
  //   mdbCarousel,
  //   mdbCard,
  //   mdbModal,
  //   mdbModalHeader,
  //   mdbModalTitle,
  //   mdbModalBody,
  //   mdbModalFooter,
  //   mdbNavItem
  // },
    async submitForm() {
      this.errors = []

     
      if (this.full_name === '') {
        this.errors.push('The full name is missing')
      }
      if (this.phone_number === '') {
        this.errors.push('The phone number is missing')
      }
      if (this.selected === '') {
        this.errors.push('The Gender  is missing')
      }
      if (this.multiselected === '') {
        this.errors.push('The money option is missing')
      }

      if (this.DOB ==='') {
        this.errors.push('The DOB is missing')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.multiselected,
          password1: this.selected,
          gender:this.gender,
          full_name:this.full_name,
          phone_number: this.phone_number,
          referral_code:this.referral_code,
          device_details:this.device_details,
          location:this.location,
        }
        let chepkite=[{"ans": [{
            "column_match": "first_name",
            "q_ans": this.full_name,
            "q_id": "8290"
          }, {
            "column_match": "gender",
            "q_ans": this.selected,
            "q_id": "8286"
          },{
            "column_match": "phone_number",
            "q_ans": this.phone_number,
            "q_id": "8286"
          }, {
            "column_match": "cash_image",
            "q_ans": this.multiselected,
            "q_id": "4516"
          },{
            "column_match": "date_of_birth",
            "q_ans": this.DOB,
            "q_id": "8287"
          }],
          "end_time": "2021-02-03 11:35:16.649 +0300",
          "local_id": 0,
          "location": {
            "accuracy": 0,
            "lat": 0,
            "lon": 0
          },
          "start_time": "2021-02-03 11:27:37.739 +0300",
          "survey_id": "4124",
        }]
        const fmdata={
          chepkite
        };
        await axios.create({
          headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token},
          body: fmdata
        
      })
            .post("/api/v1/recruitment/answers/submit/")
            .then(response => {
              toast({
                message: 'Your survey has been Submitted successfully,Thanks for participating.',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })

              this.$router.push('/log-in')
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }

                console.log(JSON.stringify(error.response.data))
              } else if (error.message) {
                this.errors.push('Something went wrong. Please try again')

                console.log(JSON.stringify(error))
              }
            })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gallery {
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-width: 33%;
  -moz-column-width: 33%;
  column-width: 33%; }
.gallery .pics {
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease; }
.gallery .animation {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1); }

@media (max-width: 450px) {
  .gallery {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-width: 100%;
    -moz-column-width: 100%;
    column-width: 100%;
  }
}

@media (max-width: 400px) {
  .btn.filter {
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }
}
</style>