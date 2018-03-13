<!--<template>-->
  <!--<div class="app-wrapper">-->
  <!--<div>-->
    <!--<div class="header">-->
    <!--<h1  class="title">提醒事项</h1>-->
    <!--</div>-->
  <!--</div>-->
  <!--<el-row>-->
    <!--<el-col :span = "20">-->
      <!--<div class="content">-->
        <!--总览-->
      <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :span = "4">-->
      <!--<div class="menu-wrapper">-->
       <!--<el-menu class="menu-bar">-->
           <!--<el-menu-item>总览</el-menu-item>-->
           <!--<el-menu-item>任务列表</el-menu-item>-->
        <!--</el-menu>-->
      <!--</div>-->
    <!--</el-col>-->
  <!--</el-row>-->
  <!--</div>-->
<!--</template>-->
<template>
  <div id="app" class="app-wrapper">
    <div class="header">
      <h1 class="title">
        提醒事项
      </h1>
    </div>
    <el-row>
      <el-col :span="20">
        <div class="content">
          <router-view :key="key" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="menu-wrapper">
          <el-menu class="menu-bar" :default-active="activeIndex" :router=true>
            <el-menu-item index="/OverView">总览</el-menu-item>
            <el-menu-item index="/TaskList">任务列表</el-menu-item>
          </el-menu>
          <!--<el-menu class="menu-bar">-->
            <!--<el-menu-item>总览</el-menu-item>-->
            <!--<el-menu-item>任务列表</el-menu-item>-->
          <!--</el-menu>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {ElCol, ElRow},
  name: 'App',
  data : function () {
    return {
      activeIndex: "1"
    };
  }
    ,
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  methods: {},
  created() {}
}
</script>

<style lang="scss">
  /*html {*/
    /*// height: 100vh;*/
    /*margin: 0;*/
    /*padding: 0;*/
  /*}*/
  /*body {*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*color: #2c3e50;*/

    /*::-webkit-scrollbar-track-piece {*/
      /*width: 0.5rem;*/
      /*margin:1rem;*/
      /*background-color: #DCDFE6;*/
    /*}*/
    /*::-webkit-scrollbar {*/
      /*width: 0.2rem;*/
      /*height: 0.1rem;*/
    /*}*/
    /*::-webkit-scrollbar-thumb {*/
      /*height: 1rem;*/
      /*background: #909399;*/
      /*border-radius:1rem;*/
      /*cursor: pointer;*/
    /*}*/
  /*}*/

  /*.app-wrapper {*/
    /*width:90%;*/
    /*margin:0 auto;*/
    /*margin-top: 1.5rem; // rem 根元素的字体大小倍数*/
    /*overflow: hidden;*/
      /*.header {*/
        /*text-align: center;*/
        /*border-bottom: 1px solid #dcdfe6;*/
      /*&:hover {*/
        /*text-shadow: 1px 1px 1px #bbbec4;*/
      /*}*/
    /*}*/
    /*.content {*/
        /*height: calc(100vh - 20rem);*/
        /*overflow-x: hidden;*/
        /*overflow-y: auto;*/
        /*background-color: gray;*/
    /*}*/
    /*.menu-wrapper {*/
        /*.menu-bar {*/
           /*background-color: aliceblue;*/
           /*border-right: blue;*/
        /*}*/
    /*}*/

  /*}*/
  html {
    // height: 100vh;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    ::-webkit-scrollbar-track-piece {
      width: 0.5rem;
      margin:1rem;
      background-color: #DCDFE6;
    }
    ::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.1rem;
    }
    ::-webkit-scrollbar-thumb {
      height: 1rem;
      background: #909399;
      border-radius:1rem;
      cursor: pointer;
    }
  }

  .app-wrapper {
    width: 90%;
    margin: 0 auto;
    margin-top: 1.5rem;
    overflow: hidden;

    .header {
      text-align: center;
      border-bottom: 1px solid #dcdfe6;
      &:hover {
        text-shadow: 1px 1px 1px #bbbec4;
      }
    }
    .content {
      height: calc(100vh - 10rem);
      overflow-x: hidden;
      overflow-y: auto;
    }
    .menu-wrapper {
      .menu-bar {
        background: none;
        border-right: none;
      }
    }
  }
</style>
<!--<style>-->
<!--#app {-->
  <!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
  <!-- -webkit-font-smoothing: antialiased;-->
  <!-- -moz-osx-font-smoothing: grayscale;-->
  <!--text-align: center;-->
  <!--color: #2c3e50;-->
  <!--margin-top: 60px;-->
<!--}-->
<!--</style>-->
