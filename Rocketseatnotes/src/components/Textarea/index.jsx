import {Container} from "./styles"

export function Textarea({description,  ...rest}){
    return(
        <Container {...rest}>
          {description}
          
        </Container>
    )
}