<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro alunos</a>
      </div>
    </nav>

    <div class="container">

      <form @submit.prevent="salvar" id="formCad">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="student.name" required>
          <label>CPF</label>
          <input type="text" placeholder="cpf" v-model="student.cpf" id="cpf" required>
          <label>Email</label>
          <input type="email" placeholder="email" v-model="student.email" required>

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>        
      </form><br>

      <button id="limpar" class="waves-effect waves-light btn-small" @click="limpar()">Cancelar<i class="material-icons left"></i></button>

      <button id="CadAluno" class="waves-effect waves-light btn-small" @click="CadAluno()">Cadastrar Aluno<i class="material-icons left"></i></button>

      <input text="text" v-model="pesquisa" placeholder="Pesquisa Alunos" id="pesquisa">

      <table id="tableList">

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
      window.location.reload();
      document.getElementById('formCad').style.display = "none";
      document.getElementById('limpar').style.display = "none";
      document.getElementById('tableList').style.display = "block";
      document.getElementById('pesquisa').style.display = "block";
    },

    CadAluno(){
      document.getElementById('formCad').style.display = "block";
      document.getElementById('limpar').style.display = "block";
      document.getElementById('CadAluno').style.display = "none";
      document.getElementById('tableList').style.display = "none";
      document.getElementById('pesquisa').style.display = "none";
    },

    salvar(){

      if(!this.student.ra){

        Student.salvar(this.student).then(() => {
          this.student = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
          document.getElementById('formCad').style.display = "none";
          document.getElementById('limpar').style.display = "none";
          document.getElementById('CadAluno').style.display = "block";
          document.getElementById('tableList').style.display = "block";
          document.getElementById('pesquisa').style.display = "block";
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
      this.student = student;
      document.getElementById('cpf').disabled = true;
      document.getElementById('formCad').style.display = "block"
      document.getElementById('limpar').style.display = "block";
      document.getElementById('CadAluno').style.display = "none";
      document.getElementById('tableList').style.display = "none";
      document.getElementById('pesquisa').style.display = "none";
    },

    remover(ra){

      if(confirm('Deseja excluir o aluno?')){

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
#formCad{
  display: none;
}
#limpar{
  display: none;
}


</style>
