import { Container, Profile, Logout } from "./styles"
import { FaPowerOff } from 'react-icons/fa';
import  avatarPlaceholder  from "../../assets/avatar_placeholder.svg"


import { useAuth } from "../../hooks/auth"

import { api } from "../../services/Api"

export function Header(){
    const { singOut, user } = useAuth()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    return(
        <Container>
            <Profile to="/profile">
            <img src={avatarUrl} alt="Foto Perfil"/>

            <div>
                <span>Bem-vindo</span>
                <strong>{user.name}</strong>
            </div>
            </Profile>
            
            <Logout onClick={singOut}>
             <FaPowerOff />
            </Logout>
        </Container>
    )

}