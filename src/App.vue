<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main-todolist">
    <div class="title has-text-centered">
      To Do List
    </div>
      <nav class="breadcrumb is-centered" aria-label="breadcrumb">
        <ul>
          <li><a href="#"><RouterLink to="/add">Add</RouterLink></a></li>
          <li><a href="#"><RouterLink to="/Tasks">Tasks</RouterLink></a></li>
          <li><a href="#"><RouterLink to="/Daily">Daily</RouterLink></a></li>
          <li><a href="#"><RouterLink to="/Important">Important</RouterLink></a></li>
          <li><a href="#"><RouterLink to="/Planned">Planned</RouterLink></a></li>
        </ul>
      </nav>
  </div>

  <RouterView/>
</template>

<style>
  @import 'bulma/css/bulma.min.css';

  .main-todolist {
    max-width: 600px;
    padding: 20px;
    margin: 0 auto;
  }

  .line-through {
    text-decoration: line-through;
  }
 
</style>