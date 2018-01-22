<template>
  <div class="home_page">
      <main>
          <el-row class="item_title  comWidth">
              <el-col><h1>Modules List</h1></el-col>
          </el-row>
          <el-row class="comWidth comMarginTop">
              <el-col :span="7"><dz-input  v-model="search_val" suffix-icon="el-icon-search">Search</dz-input></el-col></el-col>
          </el-row>         
          <el-row class="module_list comWidth">           
              <el-col  :span="24" class="module_item" :key="item.basename"  v-for="(item,index) in module_info">
                      <el-col :span="2" style="text-align:center;">No.{{index+1}}</el-col>
                      <el-col  :span="7"><b>模板名：</b>{{item.basename}}</el-col>
                      <el-col  :span="7"><b>更新時間：</b>{{item.update_time}}</el-col>
                      <el-col  :span="4" :offset="4" ><el-button type="primary" class="send_btn" @click="send(item.basename)">发送<i class="el-icon-message"></i></el-button></el-col>                                    
              </el-col>
              <el-col v-if="not_exist"><p class="tips">抱歉，你搜索的内容不存在</p></el-col>            
          </el-row>
          <div class="modules_pagination">
              
          </div>
      </main>
  </div>
</template>
<script>
import request_lib from "../request/request.js";

export default {
  data() {
    return {
      module_info: [
        {
          basename: "",
          update_at: "",
          update_time: ""
        }
      ],
      load: false,
      search_val: "",
      first_: "",
      not_exist: false
    };
  },
  watch: {
    search_val: function(val, oldVal) {
      var temp_arr = [],
        vm = this;

      this.module_info = this.first_;

      if (val) {
        this.module_info.forEach(function(item) {
          if (new RegExp("^(" + val + ")").test(item.basename)) {
            temp_arr.push(item);
          }
        });

        if (temp_arr.length > 0) {
          this.module_info = temp_arr;
          this.not_exist = false;
        } else {
          this.module_info = [];
          this.not_exist = true;
        }
      } else {
        this.module_info = this.first_;
        this.not_exist = false;
      }
    }
  },
  mounted() {
    var vm = this;
    vm.load = true;
    request_lib.get_module().then(json => {
      vm.first_ = vm.module_info = json;
    });
  },
  methods: {
    send(module_name) {
      this.$router.push({
        path: "/send/" + module_name
      });
    }
  }
};
</script>
<style lang="less" type="text/css" scoped>
.home_page {
  padding-top: 80px;
  padding-bottom: 30px;
}
.home_page .input_field {
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
}
.item_title {
  margin-top: 30px;

  h1 {
    font-size: 24px;
    text-align: left;
  }
}
.se-icon {
  height: 40px;
  line-height: 40px;
  i {
    color: #fff;
  }
}
.module_list {
  background-color: #fff;
  text-align: left;
  margin-top: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  .module_item {
    border-bottom: 1px solid #ccc;
    height: 60px;
    font-size: 14px;
    line-height: 60px;
    .send_btn {
      width: 75px;
      height: 25px;
      padding: 0;
      font-size: 12px;
      margin-right: 15px;
      .el-icon-message {
        margin-left: 5px;
      }
    }
  }
  .tips {
    font-size: 14px;
  }
}
.modules_pagination {
  margin: 30px 0;
}
</style>