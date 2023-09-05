<template>
  <div style="background:#F6F6F6" class="q-pb-md">
    <div class="font-oxygen text-primary">
      <div class="fw-400 padding-left q-pt-md title q-pb-sm">Contact us</div>
    </div>
    <div>
    <div class="row justify-between  q-gutter-xs padding-left padding-right text-primary font-oxygen">
      <div class="col-md-4 col-sm-6 col-xs-12 q-gutter-sm">
        <q-card class="q-pa-md">
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="schedule" size="sm"/>
            <div class="fs-20 fw-600">Timings (open 24/7)</div>
          </div>
          <div class="fs-14 fw-400 q-mt-sm">Timings that hospitals is open for and their timings</div>
          <div class="fs-16 q-mt-sm font-inter">
            <div>Mon-Sun - 12:00AM - 11:59PM</div>
          </div>
        </q-card>
        <q-card class="q-pa-md">
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="call" size="sm"/>
            <div class="fs-20 fw-600">Reach out to us</div>
          </div>
          <div class="fs-14 fw-400 q-mt-sm">You could reach out to us for any assistance or any queries</div>
          <div class="fs-16 q-mt-sm">
            <a href="tel:08046808371">080 4680 8371</a>
          </div>
          <div class="fs-16 q-mt-sm">
            <a href="tel:8951197936">+91 89511 97936</a>
          </div>
        </q-card>
      </div>
      <div class="col-md-8 col-sm-6 col-xs-12 q-gutter-sm location">
        <q-card class="q-pa-md" dense>
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="location_on" size="sm"/>
            <div class="fs-20 fw-600">Location</div>
          </div>
          <div class="fs-16 q-mt-sm font-inter">
            <div>#640 Ajit Nursing Home,Dr.Bane Hospital Road, Raibag, Landmark: Beside HP PetrolBunk, Raibag</div>
          </div>
        </q-card>
        <div class="mapouter">
          <div class="gmap_canvas font-oxygen">
            <iframe src="https://maps.google.com/maps?q=AJIT%20NURSING%20HOME%20RAIBAG&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" id="gmap_canvas" frameborder="0" scrolling="no"></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactDetails',
  data () {
    return {
      center: { lat: 16.496384, lng: 74.769238 },
      zoom: 4
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 180px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 150px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 8px;
    height: 200px;
  }
}
.gmap_canvas {
  border: 1px solid lightgrey;
}
a {
  color: inherit;
}
.location {
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 8px
  }
}
</style>
