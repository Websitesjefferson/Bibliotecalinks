import { useNavigate, useParams } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { Button } from "../../components/Button"


import { api } from "../../services/Api"

import { Container, Form} from "./styles"
import { useState} from "react"


export function NewUpdate() {
    const params = useParams()

    const [title, setTitle] = useState(Title)
    const [description, setDescription] = useState(Description)
    const [links, setLinks] = useState(Links)
    const [tags, setTags] = useState(Tags)

    

    function Title(){
        
        const userTitle = localStorage.getItem("@title")

         return JSON.parse(userTitle)
    
   
  }

  function Description(){
    const userTitle = localStorage.getItem("@description")

    return JSON.parse(userTitle)

  }
  function Links(){
    const userTitle = localStorage.getItem("@links")
     
    return JSON.parse(userTitle)
  }
  function Tags(){
    const userTitle = localStorage.getItem("@tags")

    return JSON.parse(userTitle)

  }
    
    const navigate = useNavigate()

    async function handleNewNotes(){

     await api.put(`/notes`, {
        title, 
        description,
    
        
     })
     alert('Nota atualizada com sucesso')
     navigate(-1)
    }
    function Back(){
        navigate(`/details/${params.id}`)
    }
   
 return (
        <Container>
            <Header />
          
            <main>
                <Form>
                    <header>
                        <h1>Editar nota</h1>

                        <button className="button" onClick={Back}>Voltar</button>
                    </header>
                    
                    <Input value={title}  type="text" onChange={e => setTitle(e.target.value)} /> 
                    
                    <Textarea 
                    type="text"
                    value={description}
                    placeholder='Observações' 
                    onChange={e => setDescription(e.target.value)}/>

                       
                 
                    {links.map((e) => (
                    <Input disabled key={e.id} value={e.url} />
                    )) 
                    }

                   
                
                     {tags.map((e) => (
                    <Input disabled key={e.id} value={e.name} />
                    
                   )) }
                   
                   
                   
                    
                    <Button 
                    title="Salvar" 
                    onClick={handleNewNotes}/>
                </Form>
            </main>
           
        </Container>
    )
}