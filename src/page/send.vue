<template>
    <div class="send_page">
    <main class="comWidth">
       <el-row  class="comMarginTop">
            <el-col :span="6"><dz-input suffix-icon="el-icon-message
"   v-model="pre_email">喜欢就发个呗~</dz-input></el-col>
            <el-col :span="3"><el-button @click="send_email"size="small" :loading="send_flag" :type="send_flag ? 'success':''">{{send_flag ? 'Sending':'Send'}}</el-button></el-col>
            <el-col :span="3" :offset="4" style="text-align: right;"><router-link :to="'/'"><el-button size="small" >返回列表</el-button></router-link></el-col>
             <el-col :span="4"><el-button v-if="!s3_link" size="small" type="warning" :loading="s3_sending" @click="post_s3" round>{{s3_sending ? '发送中' : '发送到S3'}}</el-button><transition name="el-fade-in-linear"><a :href="s3_link" target="_blank" v-if="s3_link"><el-button type="success" round>查看模板验证</el-button></a></transition></el-col>
            <el-col :span="4" style="position:relative;"><el-button size="small" type="primary" @click="show">查看邮件源码</el-button> 
           <transition name="el-fade-in-linear">
                <div class="scource" v-if="flag"><textarea style="height:600px; width:800px" >{{scource}}</textarea></div>
            </transition>
            </el-col>
       </el-row>
       <transition name="el-fade-in-linear">
        <el-row style="margin-top:10px;" v-if="return_err"><el-col :span="6"><el-alert :closable="false" :title="return_err" type="error" show-icon></el-alert></el-col></el-row>
        </transition>
       <transition name="el-fade-in-linear">
        <el-row style="margin-top:10px;" v-if="email_format_error"><el-col :span="6"><el-alert :closable="false" title="请输入正确的邮箱格式" type="error" show-icon></el-alert></el-col></el-row>
        </transition>
       <el-row style="margin-top:10px;"><el-col :span="6"><el-alert title="可通过 “|” 字符，输入多个邮箱地址" type="success"></el-alert></el-col></el-row>
       <el-row class="iframeMargin">
            <iframe ref="output_"  frameborder="0" height="1400px" width="100%"
            
            ></iframe>
       </el-row>
      
    </main>
     <div class="mask_" v-if="flag" @click="show"></div>
    </div>
</template>
<script>
import request_lib from "../request/request.js";

export default {
  data() {
    return {
      scource: "",
      flag: false,
      mark: 1,
      pre_email: "",
      form: {
        emails: [],
        module: ""
      },
      send_flag: false,
      email_format_error: false,
      return_err: "",
      s3_link: "",
      s3_sending: false
    };
  },
  watch: {
    pre_email(val, Oldval) {
      this.email_format_error = false;
    }
  },
  beforeMount() {},
  mounted() {
    var vm = this,
      module_name = vm.$route.params.module,
      iframe_ = vm.$refs.output_;
    request_lib.get_module_scource(module_name).then(json => {
      vm.scource = json;
      iframe_.src = "data:text/html;charset=utf-8," + vm.scource;
    });
  },
  updated() {},
  methods: {
    show() {
      this.mark++;
      if (this.mark % 2 == 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    send_email() {
      var vm = this,
        module_name = vm.$route.params.module;

      vm.form.emails = vm.tidy_emails(vm.pre_email);
      if (vm.check_emaills(vm.form.emails)) {
        vm.email_format_error = true;
        return;
      }
      vm.email_format_error = false;
      vm.send_flag = true;

      request_lib
        .sendEmail(module_name, vm.form.emails)
        .then(json => {
          vm.send_flag = false;
          vm.return_err = "";
          vm.$message({
            type: "info",
            message: `邮件发送成功！`
          });
        })
        .catch(error => {
          vm.send_flag = false;
          vm.return_err = error;
        });
    },
    tidy_emails(pre) {
      return pre.replace(/\s+/, "").split("|");
    },
    check_emaills(emails) {
      var regex = /^\w+@\w+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
      var flag = false;

      emails.forEach(val => {
        if (!regex.test(val)) {
          flag = true;
        }
      });

      return flag;
    },
    post_s3() {
      var vm = this;
      var module_name = vm.$route.params.module;
      vm.s3_sending = true;
      request_lib
        .post_s3(module_name)
        .then(link => {
          vm.s3_link = link;
          vm.s3_sending = false;
        })
        .catch(() => {
          vm.s3_sending = false;
        });
    }
  }
};
</script>
<style lang="less" type="text/css" scoped>
.send_page {
  background: left top no-repeat;
  padding-top: 80px;
  padding-bottom: 30px;
}
.iframeMargin {
  margin: 50px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
}
.scource {
  position: absolute;
  top: 60px;
  right: 0;
  width: 800px;
  z-index: 10;
  text-align: left;
  background: #eee;
  padding: 30px;
  font-size: 14px;
  height: 600px;
  border: 1px solid #ccc;
}
.mask_ {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  background-attachment: fixed;
}
</style>