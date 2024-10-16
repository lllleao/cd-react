import styled from "styled-components";
import { ButtonContainer } from "../ButtonPurchase/styles";

export const ProductsListCartContainer = styled.aside`
    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;
    background-color: #222;
    height: 100vh;
    width: 25%;
    padding: 1rem 0.5rem;
    overflow: auto;

    ul {
        li {
            header {
                display: flex;
                justify-content: flex-end;
            }

            img {
                width: 150px;
                border-radius: 1rem;
                border: 2px solid #fff;
                margin-bottom: 0.5rem;
            }
            margin: 2rem auto 0 auto;
            text-align: center;

            div {
                font-weight: bold;
                font-size: 1rem;
            }

            .total-price {
                margin-top: 1rem;
                text-align: normal;
            }
        }
    }

    .close {
        display: flex;
        justify-content: start;
        font-size: 1.5rem;

        i {
            cursor: pointer;
            padding: 0.5rem;
        }
    }

    &.closed {
        display: none;
    }
`
export const ButtonCart = styled(ButtonContainer)`
    font-size: 1rem;
    margin: 2rem auto 0;
`
export const OverLay = styled.div`
    position: fixed;
    background-color: #000000a8;
    inset: 0;
    z-index: 5;

    &.closed {
        display: none;
    }
`
