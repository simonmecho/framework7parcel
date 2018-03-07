<template>
    <div id="app">
      <f7-statusbar></f7-statusbar>
      <f7-views tabs>
        <f7-view id="tab-1" main tab tab-active><news/></f7-view>
        <f7-view id="tab-2" tab><threads></threads></f7-view>
        <f7-toolbar tabbar labels swipeable>
          <f7-link icon-fa="fa fa-list" icon-size="25px" text="快讯" tab-link="#tab-1" tab-link-active></f7-link>
          <f7-link icon-fa="fa fa-comment-alt" icon-size="25px" text="币吧" tab-link="#tab-2"></f7-link>
        </f7-toolbar>
      </f7-views>
    </div>
</template>

<script>
// import { f7View, f7Statusbar, f7Toolbar, f7Navbar, f7Link, f7Page } from 'framework7-vue';
  import News from './pages/NewsManager.vue'
  import Threads from './pages/ThreadsManager.vue'

    export default {
        components: { News, Threads },
        data() {
          return {
            
          }
        }
    }
</script>

<style scoped>

</style>