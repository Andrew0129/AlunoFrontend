import { http } from './config'

export default	{

	salvar:(student)=>{
		return http.post('Student',student);
  },
    
	atualizar:(student)=>{
		return http.put('Student',student);
  },

  listar:()=>{
		return http.get('Student')
  },
    
  apagar:(ra)=>{
    return http.delete('Student?ra='+ra)
  },
  
}