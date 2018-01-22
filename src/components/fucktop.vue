<template>
  <nav ref="nav">
      <el-row class="comWidth">
           <el-col class="wrap__"><img @click="goHome" class="logo" src="../assets/logo.png" alt=""><el-col :offset="19" :span="5"><i class="el-icon-document"></i><h1 class="title" @click="goHome">EDM 测试平台</h1></el-col></el-col>             
      </el-row>
  </nav>
  
</template>

<script>
export default {
  name: "fucktop",
  props: {
    item: "",
    msg: "",
    show: ""
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home"
      });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/css" scoped>
nav {
  height: 60px;
  background-color: #fff;
  text-align: left;
  width: 100%;
  border-bottom: 5px solid #000;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  z-index: 66;
  .el-icon-document {
    float: left;
    margin-top: 17px;
    margin-right: 10px;
    color: #000;
  }
  .title {
    font-size: 20px;
    color: #000;
    line-height: 60px;
    float: left;
    letter-spacing: 1px;
  }
  .wrap__ {
    position: relative;
  }
  .wrap__ .logo {
    width: 251px;
    height: 66px;
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    cursor: pointer;
  }
}
</style>
