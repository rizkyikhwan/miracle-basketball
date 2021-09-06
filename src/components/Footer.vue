<template>
  <footer id="footer">
    <div class="container">
      <div class="container-fluid">
        <div class="row">
          <!-- sosial media -->
          <div class="col-sm-6 col-md-3">
            <div id="getHelp" class="tittle-footer">
              <h5><strong>Ikuti Kami</strong></h5>
              <div>
                <li class="list-social-media">
                  <a href="#" class="icon-social-media"
                    ><font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'facebook' }"
                    />
                    Facebook</a
                  >
                </li>
                <li class="list-social-media">
                  <a href="#" class="icon-social-media"
                    ><font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'instagram' }"
                    />
                    Instagram</a
                  >
                </li>
                <li class="list-social-media">
                  <a href="#" class="icon-social-media"
                    ><font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'twitter' }"
                    />
                    Twitter</a
                  >
                </li>
                <li class="list-social-media">
                  <a href="#" class="icon-social-media"
                    ><font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'discord' }"
                    />
                    Discord</a
                  >
                </li>
              </div>
            </div>
          </div>

          <!-- Partner Brand -->
          <div class="col-sm-6 col-md-3">
            <div id="getHelp" class="tittle-footer">
              <h5><strong>Partner Brand</strong></h5>
              <div style="margin-left: -10px">
                <a href=""
                  ><img
                    src="../assets/images/nike.png"
                    alt="nike"
                    height="12"
                    width="29"
                    class="partner-brand"
                /></a>
                <a href=""
                  ><img
                    src="../assets/images/adidas.png"
                    alt="adidas"
                    height="19"
                    width="30"
                    class="partner-brand"
                /></a>
                <a href=""
                  ><img
                    src="../assets/images/air-jordan.png"
                    alt="air-jordan"
                    height="28"
                    width="29"
                    class="partner-brand"
                /></a>
                <a href=""
                  ><img
                    src="../assets/images/under-armour.png"
                    alt="under-armour"
                    height="29"
                    width="30"
                    class="partner-brand"
                /></a>
              </div>
            </div>
          </div>

          <!-- Bantuan -->
          <div class="col-sm-6 col-md-3">
            <div id="getHelp" class="tittle-footer">
              <h5><strong>Bantuan</strong></h5>
              <li class="list">
                <a href="" class="text">Syarat & Ketentuan</a>
              </li>
              <li class="list">
                <a href="" class="text">Kebijakan Privasi</a>
              </li>
              <li class="list"><a href="" class="text">Cara beli</a></li>
              <li class="list"><a href="" class="text">Status pesanan</a></li>
              <li class="list">
                <a href="" class="text">Konfirmasi pesanan</a>
              </li>
            </div>
          </div>

          <!-- CS -->
          <div class="col-sm-6 col-md-3">
            <div id="getHelp">
              <h5 style="color: #d4d4d4">
                <strong>Customer Service</strong>
              </h5>
              <li class="list">
                <a href="" class="service">
                  <font-awesome-icon
                    :icon="{ prefix: 'fab', iconName: 'whatsapp' }"
                    class="cs"
                  />
                  0812-1212-1212
                </a>
              </li>
              <li class="list">
                <a href="" class="service">
                  <font-awesome-icon
                    :icon="{ prefix: 'fab', iconName: 'line' }"
                    class="cs"
                  />
                  @miracle.store
                </a>
              </li>
              <li class="list">
                <a href="" class="service">
                  <font-awesome-icon icon="map-marked-alt" class="cs" /> Jln.
                  Merdeka No.17, Indonesia
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="col text-center" style="color: #d4d4d4">
        © 2021 Rizky Ikhwan
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Footer",
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
#footer {
  padding: 25px 0 25px 0;
  background-color: #2b2a2a;
}

.tittle-footer {
  padding-bottom: 25px;
  color: #d4d4d4;
}

.icon-social-media {
  color: #d4d4d4;
  margin: 0 15px 0 0;
  font-size: 14px;
  text-decoration: none;
  transition: 0.2s ease-out;
}

.icon-social-media:hover {
  color: #00bfa6;
}

.list {
  list-style: none;
  margin: 5px 0 5px 0;
}

.list-social-media {
  list-style: none;
  margin: 5px 0 5px 0;
}

.cs {
  font-size: 20px;
  text-decoration: none;
}

.list .text {
  color: #d4d4d4;
  font-size: 14px;
  text-decoration: none;
  transition: 0.2s ease-out;
}

.text:hover {
  color: #00bfa6;
}

.list .service {
  text-decoration: none;
}

.service {
  color: #d4d4d4;
  transition: 0.2s ease-out;
  font-size: 14px;
}

.service:hover {
  color: #00bfa6;
}

.partner-brand {
  margin: 0 10px 0 10px;
}

hr {
  background-color: #d4d4d4;
}
</style>