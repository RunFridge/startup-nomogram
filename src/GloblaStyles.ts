import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::after ,*::before {
        margin: 0;
        font-family: 'Jal_Onuel';
    }

    @font-face {
        font-family: 'Jal_Onuel';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        background: #34495e;
        color: #ecf0f1;
        text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    }
`;

export default GlobalStyle;
