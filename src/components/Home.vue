<template>
  <div class="home-wrapper col-sm-10 col-md-8 col-lg-6">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            <span class="title">Weather Forecast{{ place ? ': ' + place : ''}}</span>
          </h3>
        </div>
        <div class="modal-body">
          <div>
            <table class="table table-striped">
              <tbody>
              <tr>
                <td>Apparent temp</td>
                <td>{{ forecast.currently.apparentTemperature }}</td>
              </tr>
              <tr>
                <td>Real temp</td>
                <td>{{ forecast.currently.temperature }}</td>
              </tr>
              <tr>
                <td>Cloud cover</td>
                <td>{{ forecast.currently.cloudCover }}</td>
              </tr>
              <tr>
                <td>Dew point</td>
                <td>{{ forecast.currently.dewPoint }}</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{{ forecast.currently.humidity }}</td>
              </tr>
              <tr>
                <td>Icon</td>
                <td>{{ forecast.currently.icon }}</td>
              </tr>
              <tr>
                <td>Ozone</td>
                <td>{{ forecast.currently.ozone }}</td>
              </tr>
              <tr>
                <td>Precip Intensity</td>
                <td>{{ forecast.currently.precipIntensity }}</td>
              </tr>
              <tr>
                <td>Precip Probability</td>
                <td>{{ forecast.currently.precipProbability }}</td>
              </tr>
              <tr>
                <td>Precip Type</td>
                <td>{{ forecast.currently.precipType }}</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{{ forecast.currently.pressure }}</td>
              </tr>
              <tr>
                <td>Last updated</td>
                <td>{{ forecast.currently.time ? timestamp(forecast.currently.time * 1000) : '' }}</td>
              </tr>
              <tr>
                <td>Wind bearing</td>
                <td>{{ forecast.currently.windBearing }}</td>
              </tr>
              <tr>
                <td>Wind speed</td>
                <td>{{ forecast.currently.windSpeed }}</td>
              </tr>
              <tr>
                <td>Summary</td>
                <td>{{ forecast.currently.summary }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {
    SHOW_LOADER, HIDE_LOADER, FORECAST_REQUEST, FORECAST_SUCCESS, FORECAST_FAIL
  } from '../store/constants'
  import {timestamp} from '../utils/helpers'

  export default {
    data () {
      return {}
    },
    created () {
      this.getForecast()
      setInterval(this.getForecast, 60 * 60 * 1000)
    },
    methods: {
      timestamp,
      getForecast () {
        this.getGeoposition(position => {
          this.$store.dispatch(SHOW_LOADER)
          this.$store.dispatch(FORECAST_REQUEST, {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            success: (res) => {
              this.$store.dispatch(FORECAST_SUCCESS, res)
              this.$store.dispatch(HIDE_LOADER)
            },
            fail: (err) => {
              this.$store.dispatch(FORECAST_FAIL, err)
              this.$store.dispatch(HIDE_LOADER)
            }
          })
        })
      },
      getGeoposition (callback) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(callback)
        }
      }
    },
    computed: {
      forecast () {
        return this.$store.getters.forecast
      },
      place () {
        return this.$store.getters.place
      }
    }
  }
</script>

<style scoped>
  .home-wrapper {
    float: none;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    text-transform: capitalize;
  }

  .title {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: bold;
    color: #EB4A42;
    text-decoration: underline;
  }
</style>