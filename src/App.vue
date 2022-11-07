<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro alunos</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="student.name" >
          <label>CPF</label>
          <input type="text" placeholder="cpf" v-model="student.cpf" >
          <label>Email</label>
          <input type="email" placeholder="email" v-model="student.email" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>        
      </form><br>

      <button class="waves-effect waves-light btn-small" @click="listar()">Cancelar<i class="material-icons left"></i></button>

      <input text="text" v-model="pesquisa" placeholder="Pesquisa Alunos">

      <table>

        <thead>

          <tr>
            <th>RA</th>
            <th>Name</th>
            <th>CPF</th>
            <th>Email</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="student of alunosFiltered" :key="student.ra">
            
            <td>{{ student.ra }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.cpf }}</td>
            <td>{{ student.email }}</td>
           
            <td>
              <button @click="editar(student)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(student.ra)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Student from './services/StudentsServices'

export default {
  name: 'app',
  data () {
    return {
      student:{
        cpf: '',
        name: '',
        email:'',
       
      },
      students: [],
      errors: [],
      pesquisa:''
    }
  },

  computed:{
  alunosFiltered(){
    let valores = [];
    valores = this.students.filter((stud) => {
      return(
        stud.email.indexOf(this.pesquisa.toLocaleLowerCase()) > -1 ||
        stud.name.indexOf(this.pesquisa.toLocaleLowerCase()) > -1 
      )
    })
    return valores;
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      Student.listar().then(resposta => {
        this.students = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    limpar(){
      this.name = "";
      this.cpf = "";
      this.email = "";
    },

    salvar(){

      if(!this.student.ra){

        Student.salvar(this.student).then(() => {
          this.student = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
          console.log(e.response.data.errors)
        })

      }else{

        Student.atualizar(this.student).then(() => {
          this.student = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(student){
      this.student = student
    },

    remover(ra){

      if(confirm('Deseja excluir o produto?')){

        Student.apagar(ra).then(() => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    },
  }
  
}


</script>

<style>



</style>
