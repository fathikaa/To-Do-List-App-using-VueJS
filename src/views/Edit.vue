<template >
    <form
  @submit.prevent="addTodo"
>
  <div class="field is-grouped mb-5">
    <p class="control is-expanded">
      <input 
        v-model="updateTodoContent"
        class="input" 
        type="text" 
        placeholder="Edit Your Task In Here"
      >
    </p>
    <div class="control">
      <div class="select">
        <select v-model="updateTodoCategory">
        <option>Daily</option>
        <option>Important</option>
        <option>Planned</option>
        </select>
      </div>
    </div>
    <p class="control">
        <button 
        class="button is-info"
        :disabled="!updateTodoContent"
        @click="setTodoo()"
        >
          Update
        </button>
        <button 
        @click="$router.go(-1)"
        class="button is-danger is-light ml-2">
        Back
        </button>

    </p>    
  </div>
</form>
<div>
    <h1 id="yesApdet">
    </h1>
</div>
</template>

<script>

/*
get ID
*/

import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, setDoc  } from 'firebase/firestore'
import { db } from '@/firebase'
export default {
    
    data() {
      return {
        id:this.$route.params.id,  
        todo: [],
        updateTodoContent: '',
        updateTodoCategory: '',
      }  
    },  
    methods: {
        async setTodoo() {
            try {        
            setDoc(doc(todosCollectionRef, this.id), {
                id: this.id,
                content: this.updateTodoContent,
                category: this.updateTodoCategory,
                done: false,
            });

            }
            catch(e) {
                console.log(e)
            }
            document.getElementById('yesApdet').innerHTML='This Task Has Been Updated'
        }
    }
}    

/*
Imports
*/


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

// const addTodo = () => {

// addDoc(todosCollectionRef, {
//   content: updateTodoContent.value,
//   category: updateTodoCategory.value,
//   done: false
// })
// updateTodoContent.value = ''
// }


const setTodo = () => {

setDoc(doc(db, collection, id), {
    id: id,
    content: updateTodoContent.value,
    category: updateTodoCategory.value,
    done: false,
})
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
