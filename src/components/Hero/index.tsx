import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/simbolo.jpg'
import { AnimationHero, HeroContainer } from './styles'

const Hero = () => {
    const [letters, setLetters] = useState('')
    const hasMounted = useRef(false)
    const text = 'u ma cooperativa de artistas emergentes'

    const handleLoad = () => {

    }

    useEffect(() => {
        setTimeout(() => {
            if (!hasMounted.current) {
                hasMounted.current = true
                let index = 0

                const intervelId = setInterval(() => {
                    if (index + 1 < text.length) {
                        setLetters((prev) => prev + text[index])
                        index++
                    } else {
                        clearInterval(intervelId)
                    }
                }, 90)
            }
        }, 3000)
    }, [hasMounted.current])

    return (
        <HeroContainer id="hero" className="container">
            <img
                srcSet={logo}
                alt="simbolo enigmático e estranahmente invasivo"
            />
            <AnimationHero>
                <h1 onLoad={handleLoad}>
                    <span className="span1">Cidade</span>
                    <span className="span2">Eclipse</span>
                </h1>
                <h2>{letters}</h2>
            </AnimationHero>
        </HeroContainer>
    )
}

export default Hero
