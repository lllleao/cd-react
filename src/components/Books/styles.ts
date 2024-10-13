import styled from "styled-components";

export const BooksPurchase = styled.section`
    padding: 2rem 0;
    height: 100vh;
    background-color: #000;
    .container {
        display: flex;
        /* justify-content: space-between; */
    }
`
export const BookImg = styled.div`
    margin-right: 5rem;
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        max-width: 350px;
    }
`
export const AboutBook = styled.div`
    h3 {
        font-size: clamp(1rem, 4vw, 1.5rem);
        font-weight: bold;
    }
`
