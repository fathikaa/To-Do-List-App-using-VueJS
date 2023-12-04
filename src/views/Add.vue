<template >
    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input 
            v-model="newTodoContent"
            class="input" 
            type="text" 
            placeholder="What Are You Gonna Do Today?"
          >
        </p>
        <div class="control">
          <div class="select">
            <select v-model="newTodoCategory">
            <option>Daily</option>
            <option>Important</option>
            <option>Planned</option>
            </select>
          </div>
        </div>
        <p class="control">
            <button 
            :disabled="!newTodoContent"
            class="button is-info">
              Add
            </button>
        </p>    
      </div>
    </form>
</template>

<script setup>
/*
  Imports
*/

import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc  } from 'firebase/firestore'
import { db } from '@/firebase'


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
    const newTodoCategory = ref([])

  const addTodo = () => {

    addDoc(todosCollectionRef, {
      content: newTodoContent.value,
      category: newTodoCategory.value,
      done: false
    })
    newTodoContent.value = ''
    console.log(newTodoCategory.value)
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

<style lang="">
    
</style>