<template >
  <div v-for="todo in todos" class="card mb-5" :class="{ 'has-background-success-light': todo.done }">
    <div class="card-content">
      <div class="content">

        <div class="columns is-mobile is-vcentered">
          <div class="column" :class="{ 'has-text-success line-through': todo.done }">
            {{ todo.content }}
          </div>
          <div class="column is-5 has-text-right">
            <button class="button is-info mr-2">
              <RouterLink :to="`/update/${todo.id}`">Edit</RouterLink>
            </button>
            <button @click="toggleDone(todo.id)" class="button" :class="todo.done ? 'is-success' : 'is-light'">
              &check;
            </button>
            <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
              &cross;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>


<script setup>
/*
Imports
*/

import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { RouterLink } from 'vue-router';


/*
Firebase Refs
*/

const todosCollectionRef = collection(db, 'todos')

/*
Todos
*/

const todos = ref([
])


/*
get Todos
*/

onMounted(() => {

  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        category: doc.data().category,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})

/*
add Todos
*/
const newTodoContent = ref('')
const newTodoCategory = ref('')

const addTodo = () => {

  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    category: newTodoCategory.value,
    done: false
  })
  newTodoContent.value = ''
}

/*
delete Todos
*/

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}


/*
toggle Done 
*/

const toggleDone = id => {
  console.log('toggleDone', id)
  const index = todos.value.findIndex(todo => todo.id === id)

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
}
</script>

<style>
@import 'bulma/css/bulma.min.css';

.line-through {
  text-decoration: line-through;
}
</style>