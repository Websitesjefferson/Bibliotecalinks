import {FiPlus, FiSearch} from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { useNavigate, useParams } from "react-router-dom"



import { Note } from "../../components/Note"
import { Input } from "../../components/Input"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../services/Api";



export function Home() {
    const [cra, setCra] = useState([])
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()
    const params = useParams()

    function handleTagsSelected(tagname){

       if(tagname === 'all'){
        return setTagsSelected([])
       }


        const selected = tagsSelected.includes(tagname)
        
        

        if(selected){
           const filterTags = tagsSelected.filter(tag => tag !== tagname)
           setTagsSelected(filterTags)
        }else{
          setTagsSelected(prevState => [...prevState, tagname])  
        }

    }

    function handleDetails(id){
        navigate(`/details/${id}`)

        
            async function fetchNote(){
              const response = await api.get(`/notes/${id}`)
              const {title, description, links, tags} = response.data
            
              localStorage.setItem("@title", JSON.stringify(title))
              localStorage.setItem("@description", JSON.stringify(description))
              localStorage.setItem("@links", JSON.stringify(links))
              localStorage.setItem("@tags", JSON.stringify(tags))
             
        
            }
            
            fetchNote()
            
    
    }

    useEffect(() => {
        const getData=()=>{
            fetch('links.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                
                return response.json();
              })
              .then(function(myJson) {
                
                setCra(myJson)
                
              });
          }
          getData()
       
    },[])

    useEffect(() => {
      async function fetchTags(){
     const response =   await api.get("/tags")
     setTags(response.data)
      }
      fetchTags()

    }, [])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }
        fetchNotes()

    },[tagsSelected, search])
    return (
        <Container>
           
       
            <Brand>
                <h1>Biblioteca de Links</h1>
            </Brand>

            <Header />

            <Menu>

                <li>
                    <ButtonText 
                    title="Todos" 
                    isActive={tagsSelected.length === 0}
                    onClick={() => handleTagsSelected('all')}/>
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                            title={tag.name} 
                            isActive={tagsSelected.includes(tag.name)}
                            onClick={() => handleTagsSelected(tag.name)}/>
                        </li>
                    ))
                }
         

            </Menu>
            <Search>
              <Input 
              placeholder="Pesquisar pelo titulo" 
              icon={FiSearch}
              onChange={e => setSearch(e.target.value)}/>

            </Search>
           
             <Content>
               <Section title="Minhas notas">
                {
                    notes.map(note => (
                 
                 <Note 
                 
                    key={String(note.id)}
                 
                    data={note}

                    onClick={() => handleDetails(note.id)}
                />
               )) } 
                
                
               </Section>
               <Section title="Artigos sobre tecnologia">
               <div >
                    
              {
                 cra && cra.length>0 && cra.map((item) => (
                    <article key={item.id}>           
                    
                    <p>{item.subtitle}</p>
                    <a target={"_blank"}  href={item.href}><h2 >{item.title}</h2></a>
                    </article> 
                 ))
              }
                
            </div>
            </Section>
            </Content>
            <NewNote to="/new">
              <FiPlus />
              Criar nota
            </NewNote>
           </Container>
    )
}