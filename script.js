Vue.component('pie',{
    template: `
        <footer id="pie" class="col-12 col-md-10 offset-md-1 d-flex text-light justify-content-center align-items-center">
            <p>Made by David Medina Puyol</p>
        </footer>
    `,
})

Vue.component('nota',{
    props: ['todo'],
    template:`
        <li class="list-group-item bg-dark text-white" v-bind:class="{marcada: todo.checked}">
            <input type="checkbox" id="checkbox" v-model="todo.checked">
            <label for="checkbox">{{todo.text}}</label>
        </li>
    `
})

var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
      ],
      listavisible: true,
      texto:"",
      orden: 1
    },
    mounted(){
        if(localStorage.todos){
            this.todos = JSON.parse(localStorage.todos);
        }
    },
    updated(){
        localStorage.todos = JSON.stringify(this.todos);
    },
    computed:{
        nCompletadas: function(){
            let tareas = 0;
            this.todos.forEach((todo)=>{
                if(todo.checked)
                    tareas++;
            })
            return tareas;
        },
        nTareas: function(){
            return this.todos.length;
        },
        listaOrdenada: function(){
            if(this.orden == 1){
                return this.todos.sort((nota1,nota2)=> {
                    var a1 = nota1.text.toLowerCase();
                    var b1 = nota2.text.toLowerCase();
                    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
                });
            }
            else if(this.orden == 2){
                return this.todos.sort((nota1,nota2)=> {
                    var a1 = nota1.text.toLowerCase();
                    var b1 = nota2.text.toLowerCase();
                    return a1 > b1 ? -1 : a1 < b1 ? 1 : 0;
                });
            }
        }

    },
    methods:{
        add: function(){
            this.todos.push({text: this.texto, checked:false, date: new Date()});
        },
        borrar: function(index){
            this.todos.splice(index,1);
        },
        eliminaCompletados: function(){
            this.todos = this.todos.filter((todo)=>{
                return !todo.checked;
            })
        }
    }
  })
