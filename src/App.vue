<template>
  <div id="app">
    <!--<header-nav></header-nav>-->
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            title:''
        }
    },

}
</script>

<style>
#app {


}
</style>
