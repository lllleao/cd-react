import styled from "styled-components";

export const LoginSignContainer = styled.section`
    background-color: #000;
    height: calc(100vh - 52px);

    .container {
        height: calc(100vh - 160px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login,
    .sign {
        transition: transform 0.3s;
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .login {
        transform: rotateY(0);

        &--is-turn {
            transform: rotateY(0);
        }
    }

    .sign {
        transform: rotateY(0);

        &--is-turn {
            transform: rotateY(0);
        }
    }

    .virar {
        position: absolute;
        top: 12rem;
        z-index: 7;
        font-size: 1.1rem;
        padding: 0.5rem 1rem;
        background-color: #222;
    }
`
export const FormContainer = styled.div`
    background-color: #212121;
    padding: 2rem;
    width: 350px;
    border-radius: 1rem;

    .sign {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .form {
        &__text-field {
            position: relative;
            margin-bottom: 1.5rem;

            label {
                display: block;
                position: absolute;
                top: 8px;
                left: 8px;
                font-size: 1.3rem;
                z-index: 1;
                cursor: text;
                i {
                    margin-right: 0.5rem;
                    color: #000;
                }

                span {
                    opacity: 0.5;
                    color: #000;
                    transition: opacity 0.1s;
                }

                &.active {
                    span {
                        opacity: 0;
                    }
                }
            }

            .input {
                width: 100%;
                padding: 0.6rem 0.2rem 0.6rem 2rem;
                color: #000;
                outline: none;
            }
        }
    }
`
export const ButtonLoginSign = styled.button`
    background-color: green;
    border: none;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: block;
    margin: 0 auto;
`
