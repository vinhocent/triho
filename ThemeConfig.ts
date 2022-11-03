import {createGlobalStyle} from 'styled-components'
export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
}
  
export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
}

export const GlobalStyles = createGlobalStyle`

* {
    @import url('../../font.css');
    font-family:  !important;
    // CSS you want global. 
}
    body{
        background : ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s linear;
    }
    div{
        background : ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s linear;
    }


    li{
        background : ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s linear;
    }
    
`
  