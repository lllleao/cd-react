import { CardContainer } from './styles'
import { brFunction } from '../../utils'

export type Props = {
    link: string
    title: string
    desc: string
    photo: string
    type?: boolean
    id?: number
    price?: number
    clone?: boolean
    idName?: string
    removeTouchStart?: boolean
    removeTouchMove?: boolean
    removeTouchEnd?: boolean
    handleTouch?: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseMove?: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseUp?: (event: React.TouchEvent<HTMLAnchorElement>) => void
    loop?: (event: React.TransitionEvent<HTMLAnchorElement>) => void
}
const Card = ({ title, link, photo, desc, type, clone, id, idName, removeTouchStart, handleTouch, onMouseMove, removeTouchMove, removeTouchEnd, price, onMouseUp, loop }: Props) => {

    function emptyFunction() {
        //
    }

    return (
        <CardContainer
            target="_blank"
            to={link}
            title={title}
            className={`card_container__book ${type ? 'product' : 'card_lib'} ${clone ? 'cloned' : ''}`}
            rel="noreferrer"
            id={id == 2 ? idName : ''}
            onTouchStart={(e) => removeTouchStart ? emptyFunction : handleTouch?.(e)}
            onTouchMove={(e) => removeTouchMove ? emptyFunction : onMouseMove?.(e)}
            onTouchEnd={(e) => removeTouchEnd ? emptyFunction : onMouseUp?.(e)}
            onTransitionEnd={(e) => loop?.(e)}
        >
            <img src={photo} alt={desc} />
            <h3>
                {
                    type ? (
                        title
                    ) : (
                        <>
                            {brFunction(title).firstPart}
                            < br />
                            {brFunction(title).secondPart}
                        </>
                    )
                }
            </h3>
            {
                type ? (
                    <p>R$ {price},00</p>
                ) : (
                    <></>
                )
            }
        </CardContainer>
    )
}

export default Card
