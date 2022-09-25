import { Container, Links, Content } from "./styles"

import { useParams, useNavigate } from "react-router-dom"

import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"
import { useState, useEffect } from "react"
import { api } from "../../services/Api"



export function Details() {
  const [data, setData] = useState()
  const navigate = useNavigate()

  const params = useParams()

  function handleBack(){
    navigate('/')

  }

  async function handleRemove(){
    const confirme = window.confirm("Deseja realmente excluir essa nota?")

    if(confirme){
       await api.delete(`/notes/${params.id}`)
       navigate(-1)
    }
  }
 
  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)

      
     
      
    }
    fetchNote()
  }, [])

 async function update(){
  navigate(`/update/${params.id}`)
  
}

  
  return (
    <Container>
      <Header />
      
     {
      data &&
      <main>
        <Content>
          <div>
            
         
          <ButtonText onClick={update} title='Editar nota'/>
        
            
            
          <ButtonText title="Excluir nota" onClick={handleRemove} />
            
        </div>
          <h1>{data.title}</h1>

          <p>
            {data.description}
          </p>
           
          
       
          <Section title="Links úteis">
            <Links>
            { 
              data.links.map(link => (
                <li key={String(link.id)}>
                <a target='_bland' href={link.url}>{link.url}</a>
                </li>
              ))
            } 
            </Links>
          </Section>
          
         
          { data.tags &&
          <Section title='Marcadores'>
            { data.tags.map(tag => (
            <Tag key={String(tag.id)} title={tag.name} />
            ))
            }
          </Section>
          }
          <Button title="Voltar" onClick={handleBack}/>

        </Content>
      </main>
      
    }
    </Container>
  )
}


