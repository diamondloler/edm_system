import Vue from 'vue';
import VueResource from 'vue-resource';
import Promise from 'promise';

Vue.use(VueResource);

var prefix = MAIN_CONFIH.API_ROOT

export default {
  get_module() {
    return Vue.http.jsonp(prefix + '/template/list').then(res => {
      var result = res.body
      return new Promise((resolve) => {
        if (result && result.status == 1) {
          resolve(result.data);
        }
      })

    })
  },
  get_module_scource(template) {
    return Vue.http.jsonp(prefix + '/template/html', {
      'params': {
        template: template
      }
    }).then(res => {
      var result = res.body
      return new Promise((resolve) => {
        if (result && result.status == 1) {
          resolve(result.data);
        }
      })

    })
  },
  sendEmail(tempalte, emails) {
    return Vue.http.post(prefix + '/template/email', {
      template: tempalte,
      to: emails
    }, {
      emulateJSON: true
    }).then(res => {
      var result = res.body
      return new Promise((resolve, reject) => {
        if (result && result.status == 1) {
          resolve(result.data);
        } else {
          reject();
        }
      })
    })
  },
  post_s3(tempalte) {
    return Vue.http.post(prefix + '/template/publish', {
      template: tempalte,
    }, {
      emulateJSON: true
    }).then(res => {
      var result = res.body
      return new Promise((resolve, reject) => {
        if (result && result.status == 1) {
          resolve(result.data);
        } else {
          reject();
        }
      })
    })
  }
}
