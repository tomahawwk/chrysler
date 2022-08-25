<template lang="pug">
  MglMap(
    ref="map"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoom="15"
    :bearing="18"
    :pitch="10"
    :antialias="true"
    :key="componentKey"
    :center="[30.3483, 60.0027]"
    @load="onload"
  )
    MglMarker(
      v-for="marker in markers"
      :key="marker.name"
      class="map__marker"
      :coordinates="marker.coord"
    )
      MglPopup(
        @added="popupAdded"
        class="map__popup"
      )
        .popup__inner
          .popup__head
            .build {{ marker.type }}
            .distance {{ marker.distance }}
              span м.
          .popup__name {{ marker.name }}
          .popup__get
            .get__part
              p на машине
              span {{ marker.oncar }} мин.
            .get__part
              p пешком
              span {{ marker.onfoot }} мин.
            .get__part
              p на общ. транспорте
              span {{ marker.onbus }} мин.
          .popup__address {{ marker.address }}
    .refreshMap(
      v-on:click="forceRerender()"
    )
</template>

<script>
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import "./mapbox.css";
export default {
  name: "MapBox",
  components: {
    MglMap,
    MglPopup,
    MglMarker
  },
  data() {
    return {
      componentKey: 0,
      modelDelay: 1000,
      markers2: [
        {
          coord: [30.346173, 60.001777],
          distance: 300,
          category: "schools",
          type: "Школа",
          name: "Школа-интернат 33",
          oncar: 2,
          onfoot: 14,
          onbus: 8,
          address: "2-й Муринский пр., 24"
        },
        {
          coord: [30.339664854127136, 59.99902242404189],
          distance: 350,
          category: "schools",
          type: "Школа",
          name: "Школа 117",
          oncar: 3,
          onfoot: 16,
          onbus: 4,
          address: "просп. Пархоменко, 17"
        },
        {
          coord: [30.348732213458316, 59.999984424028746],
          distance: 450,
          category: "health",
          type: "Поликлиника",
          name: "Поликлиника 14",
          oncar: 4,
          onfoot: 18,
          onbus: 5,
          address: "2-й Муринский пр., 35"
        },
        {
          coord: [30.356636265854476, 60.00123304116317],
          distance: 550,
          category: "schools",
          type: "Детский сад",
          name: "Детский сад 5",
          oncar: 6,
          onfoot: 15,
          onbus: 7,
          address: "2-й Муринский пр., 34, корп. 2"
        },
        {
          coord: [30.353976342293297, 60.00319789596579],
          distance: 500,
          category: "schools",
          type: "Школа",
          name: "Школа 76",
          oncar: 23,
          onfoot: 123,
          onbus: 2,
          address: "Болотная ул., 18"
        },
        {
          coord: [30.34213064667961, 60.00231873010185],
          distance: 300,
          category: "health",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3488, 60.00248],
          distance: 300,
          category: "family",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3488, 60.00158],
          distance: 300,
          category: "family",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3468, 60.00158],
          distance: 300,
          category: "family",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3468, 60.00178],
          distance: 300,
          category: "transport",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3468, 60.00208],
          distance: 300,
          category: "purchases",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3468, 60.00308],
          distance: 300,
          category: "purchases",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3488, 60.00208],
          distance: 300,
          category: "restaurants",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3488, 60.00368],
          distance: 300,
          category: "restaurants",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3448, 60.00368],
          distance: 300,
          category: "restaurants",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.3448, 60.00468],
          distance: 300,
          category: "banks",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.348, 60.00368],
          distance: 300,
          category: "art",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        },
        {
          coord: [30.348, 60.00468],
          distance: 300,
          category: "art",
          type: "Стоматология",
          name: "Мой зубной",
          oncar: 20,
          onfoot: 12,
          onbus: 15,
          address: "ул. Орбели, 17"
        }
      ],
      markers: [],
      accessToken:
        "pk.eyJ1IjoiYXJ0ZW1hcnQiLCJhIjoiY2pzNjAzbWhzMGpkdzRhcGtldWppNm5ldyJ9.KFE8pu7gz29F6gEk4Bn84Q",
      mapStyle: "mapbox://styles/artemart/cjs60jew2208s1fs3rvjhcln9"
    };
  },
  methods: {
    popupAdded(e) {
      e.popup.remove();
    },
    forceRerender() {
      setTimeout(() => {
        this.map.flyTo({
          center: [30.3483, 60.00247],
          zoom: 16.5
        });
      }, 500);
      this.modelDelay = 200;
      this.componentKey += 1;
    },
    inflow() {
      this.map.flyTo({
        zoom: 18,
        pitch: 40
      });
    },
    flow() {
      this.map.flyTo({
        zoom: 16,
        pitch: 10,
        center: [30.3483, 60.0027]
      });
    },
    onload(e) {
      var mapboxgl = require("mapbox-gl");
      this.map = e.map;
      this.map.resize();
      this.map.addControl(new mapboxgl.NavigationControl());
      setTimeout(() => {
        this.flow();
      }, 50);
      //Подключение модельки
      var modelOrigin = [30.3482, 60.0025];
      var modelAltitude = 0;
      var modelRotate = [Math.PI / 2, 0, 1];
      var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      );
      var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[1],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 4
      };
      var customLayer = {
        id: "3d-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function(map, gl) {
          this.camera = new THREE.Camera();
          this.scene = new THREE.Scene();
          var directionalLight = new THREE.DirectionalLight(0xffffff);
          directionalLight.position.set(-100, 70, 120).normalize();
          this.scene.add(directionalLight);
          var directionalLight2 = new THREE.DirectionalLight(0xffffff);
          directionalLight2.position.set(0, 80, 160).normalize();
          this.scene.add(directionalLight2);
          var light = new THREE.AmbientLight(0xffffff); // soft white light (мягкий белый свет)
          this.scene.add(light);
          var loader = new GLTFLoader();
          loader.load(
            "https://raw.githubusercontent.com/tomahawk96/tomahawk96.github.io/master/legenda-1.glb",
            function(gltf) {
              this.scene.add(gltf.scene);
            }.bind(this)
          );
          this.map = map;
          this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
          });
          this.renderer.autoClear = false;
        },
        render: function(gl, matrix) {
          var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
          );
          var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
          );
          var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
          );
          var m = new THREE.Matrix4().fromArray(matrix);
          var l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ
            )
            .scale(
              new THREE.Vector3(
                modelTransform.scale,
                -modelTransform.scale,
                modelTransform.scale
              )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.state.reset();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        }
      };
      let catLinks = document.querySelectorAll(".category__item");
      let catLinksCounter = document.querySelectorAll(".category__item span");
      this.markers = this.markers2.filter(function(el) {
        return el.category == selectCategory;
      });
      for (let i = 0; i < catLinks.length; i++) {
        let count = this.markers2.filter(function(el) {
          return el.category == catLinks[i].id;
        });
        catLinksCounter[i].innerHTML = count.length;
        catLinks[i].addEventListener("click", () => {
          document.querySelector(".location").classList.add("show");
          selectCategory = catLinks[i].id;
          document
            .querySelector(".map__overlay")
            .classList.add("map__overlay--active");
          setTimeout(() => {
            document.querySelector(".refreshMap").click();
          }, 400);
          setTimeout(() => {
            document
              .querySelector(".map__overlay")
              .classList.remove("map__overlay--active");
          }, 1000);
        });
      }
      setTimeout(() => {
        this.map.addLayer(customLayer, "waterway-label");
      }, this.modelDelay);
    }
  },
  mounted() {
    setTimeout(() => {
      this.inflow();
    }, 1800);
  },
  beforeDestroy() {
    this.$el.remove();
  }
};
var selectCategory;
</script>
<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"

.popup
  &__inner
    background: $brown
    padding: 50px
    font-family: 'Futura PT Book'
    min-width: 320px
    border: 1px solid $brown2
    margin-bottom: 30px
    color: $gold
    @media (max-width: $b-mobile)
      min-width: 100%
      padding: 30px
  &__head
    letter-spacing: 1px
    display: flex
    margin-top: 5px
    color: $brown3
    text-transform: uppercase
    justify-content: space-between
  &__name
    font-family: 'Baza'
    font-size: 30px
    letter-spacing: 3px
    font-weight: 600
    line-height: 1.3
    text-transform: uppercase
    margin: 20px 0
  &__get
    margin-bottom: 15px
    .get__part
      display: flex
      color: rgba(255,255,255,.8)
      padding: 15px 0
      border-bottom: 1px solid $brown2
      letter-spacing: 1px
      font-size: 13px
      justify-content: space-between
      p
        margin: 0
        font-weight: 300
      span
        font-weight: 600
  &__address
    color: $brown3
    font-size: 14px
    text-align: right
    margin-top: 10px
    letter-spacing: 1px
</style>
