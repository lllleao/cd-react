import styled from "styled-components";

export const BooksPurchase = styled.section`
    padding: 2rem 0;
    height: 100vh;
    background-color: #000;
    .book {
        display: flex;
        gap: 5rem;
    }

    @media (max-width: 1029px) {
        padding: 2rem 0;

        height: auto;
        .book {
            flex-direction: column;
        }
    }
    @media (max-width: 460px) {
        padding: 5rem 0;
    }
`
export const BookImg = styled.div`
    img {
        border: 4px solid #fff;
        border-radius: 18px;
        width: 350px;
    }

    @media (max-width: 1029px) {
        margin: 0 auto;

        img {
            max-width: 350px;
            width: 100%;
        }
    }
`
export const AboutBook = styled.div`
    h3 {
        font-size: clamp(1rem, 4vw, 1.7rem);
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }

    span {
        font-weight: bold;
    }
    .sinopse {
        text-align: justify;
        font-size: clamp(1.2rem, 2vw, 1.5rem);

    }

    .others-informations {
        margin-top: 0.5rem;
        font-size: clamp(1rem, 2vw, 1.2rem);
    }

    .tags {
        margin-top: 0.5rem;
        text-align: center;
        font-size: clamp(1rem, 2vw, 1.2rem);
    }
`
