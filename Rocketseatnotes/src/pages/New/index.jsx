import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"

import { api } from "../../services/Api"

import { Link } from "react-router-dom"
import { Container, Form } from "./styles"
import { useState } from "react"
import { useEffect } from "react"


export function New() {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTags, setNewTags] = useState("")

    const navigate = useNavigate()

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }
    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))

    }

    function handleAddTags(){
        setTags( prevState => [...prevState, newTags])
        setNewTags('')

    }
    function handleRemoveTags(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))

    }
  
    
     
         
        

    async function handleNewNotes(){

    await api.post("/notes", {
        title,
        description,
        tags,
        links
     })
     

     alert('Nota cadastrada com sucesso')
     navigate(-1)
    }
    return (
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>

                        <Link to="/">Voltar</Link>
                    </header>


                    <Input 
                    placeholder="Titulo" 
                    onChange={e => setTitle(e.target.value)}/>

                    <Textarea 
                    placeholder="Observações" 
                    onChange={e => setDescription(e.target.value)}/>

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                  key={String(index)}
                                  value={link}
                                  onClick={() => handleRemoveLink(link)}
                                   />

                            ))

                        }
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink} />
                    
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            
                        { 
                        tags.map((tag, index) => (
                            <NoteItem 
                            key={String(index)}
                            value={tag} 
                            onClick={() => handleRemoveTags(tag)}
                            />
                            
                        ))
                        }
                            
                            
                            <NoteItem 
                            isNew 
                            placeholder="Nova tag"
                            onChange={e => setNewTags(e.target.value)} 
                            value={newTags}
                            onClick={handleAddTags}/>
                        </div>
                    </Section>

                    <Button 
                    title="Salvar" 
                    onClick={handleNewNotes}/>
                </Form>
            </main>
        </Container>
    )
}