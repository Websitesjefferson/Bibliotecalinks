import { useState } from "react";

import {api}  from "../../services/Api" 

import { Container, Form, Background } from "./styles";
import {FiMail, FiLock, FiUser } from "react-icons/fi"
import {Link, useNavigate} from "react-router-dom"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"



export function SingUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUp(){
      if(!name || !email || !password ){
        return alert("Preencha todos os campos!")
      }

      api.post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado co  sucesso ")
        navigate("/")
      }).catch(( erro => {
        if(erro.response){
            alert(erro.response.data.message)
        }else{
            alert("Não foi possível cadastrar")
        }
      }) )
    }

    return(
        <Container>
            <Background />
            <Form>
                <h1>Biblioteca de Links</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie sua conta</h2>
                <Input 
                placeholder="Nome" 
                type="text" 
                icon={FiUser}
                onChange={e => setName(e.target.value)}/>
                

                <Input 
                placeholder="E-mail" 
                type="text" 
                icon={FiMail}
                onChange={e => setEmail(e.target.value)}/>

                <Input 
                placeholder="Senha" 
                type="text" 
                icon={FiLock}
                onChange={e => setPassword(e.target.value)}/>

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to="/">Voltar para login</Link>
                
                  

            </Form>
        </Container>
    )
}