import { CardContainer } from './styles'
import { brFunction } from '../../utils'

export type Props = {
    link: string
    date: string
    title: string
    photo: string
    type?: boolean
    id: number
    clone?: boolean
    idName: string
    removeTouchStart: boolean
    removeTouchMove: boolean
    removeTouchEnd: boolean
    handleTouch: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseMove: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseUp: (event: React.TouchEvent<HTMLAnchorElement>) => void
    loop: (event: React.TransitionEvent<HTMLAnchorElement>) => void
}
const Card = ({ date, link, photo, title, type, clone, id, idName, removeTouchStart, handleTouch, onMouseMove, removeTouchMove, removeTouchEnd, onMouseUp, loop }: Props) => {

    function emptyFunction() {
        //
    }

    return (
        <CardContainer
            target="_blank"
            href={link}
            title={title}
            className={`card_lib card_container__book ${type ? 'product' : ''} ${clone ? 'cloned' : ''}`}
            rel="noreferrer"
            id={id == 2 ? idName : ''}
            onTouchStart={(e) => removeTouchStart ? emptyFunction : handleTouch(e)}
            onTouchMove={(e) => removeTouchMove ? emptyFunction : onMouseMove(e)}
            onTouchEnd={(e) => removeTouchEnd ? emptyFunction : onMouseUp(e)}
            onTransitionEnd={(e) => loop(e)}
        >
            <img src={photo} alt={title} />
            <h3>
                {brFunction(date).firstPart}
                <br />
                {brFunction(date).secondPart}
            </h3>
        </CardContainer>
    )
}

export default Card
