import styled from "styled-components";

export const PurchaseContainer = styled.section`
    padding-top: 32px;
    .purchase__title,
    span {
        text-align: center;
        max-width: 80%;
        margin: 0 auto;
        font-size: clamp(22px, 4vw, 38px);
        font-weight: bold;
        line-height: 48px;
        margin-bottom: 5rem;

        @media (max-width: 1023px) {
            margin-top: 72px;
        }
    }

    span {
        display: block;
        color: #545454;
    }

    .store {
        column-gap: 62px;
        justify-content: center;
        .card_container__book {
            -webkit-transform: translateY(20%);
            -webkit-filter: blur(15px);
            -webkit-opacity: 0;

            transform: translateY(20%);
            filter: blur(15px);
            opacity: 0;

            transition: 1s ease;

            @media (max-width: 1023px) {
                transition-delay: 0;

                &:nth-child(2) {
                    transition-delay: 0.5s;
                }

                &:nth-child(3) {
                    transition-delay: 1.5s;
                }
            }
        }

        @media (max-width: 1023px) {
            flex-wrap: wrap;

            .card_container__book {
                width: clamp(270px, 60vw, 460px);
                margin-bottom: 32px;
            }
        }
    }

    .store--is-active {
        .card_container__book {
                -webkit-transform: translateY(0);
                -webkit-filter: blur(0);
                -webkit-opacity: 1;
                transform: translateY(0);
                opacity: 1;
                filter: blur(0);
                -webkit-transition: 2s ease;
                transition: 2s ease;
                transition-delay: 0.5s;

                &:nth-child(2) {
                    transition-delay: 1.5s;
                }

                &:nth-child(3) {
                    transition-delay: 2.5s;
                }
            }
    }


`
