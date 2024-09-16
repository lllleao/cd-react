const carrosselAnimation = () => {
    const carrousselItems = document.querySelectorAll('.carroussel a')
    const carrousselContainer = document.querySelector('.carroussel')
    const widthLib = document.querySelector('.public-lb')
    let elementWidth = carrousselItems[0].clientWidth
    const items = [...carrousselItems]
    const mainLib = items.indexOf(document.querySelector('#main'))
    const clonedMainLibLeft = items.indexOf(document.querySelector('#main_cloned_left'))
    const clonedMainRight = items.indexOf(document.querySelector('#main_cloned_right'))
    let count = 0

    function handleTouch(event) {
        const index = items.indexOf(event.currentTarget)
        touchMoves(event, index)
    }

    const widthLibResize = new ResizeObserver((e) => {
        elementWidth = carrousselItems[0].clientWidth
        const currentWidth = e[0].borderBoxSize[0].inlineSize
        if (currentWidth > 706) {
            carrousselItems.forEach(item => {
                item.style.cssText = `transform: none;`
                item.removeEventListener('touchstart', handleTouch)
                item.removeEventListener('touchmove', onMouseMove)
                item.removeEventListener('touchend', onMouseUp)
            })
            window.removeEventListener('scroll', scrollEventWindow)
            isIntersecting.unobserve(carrousselContainer)

        } else {
            carrousselItems.forEach((item) => {
                item.addEventListener('touchstart', handleTouch)
            })
            isIntersecting.observe(carrousselContainer)
        }
    })

    function scrollEventWindow() {
        carrousselItems.forEach(item => {
            item.removeEventListener('touchstart', handleTouch)
            item.removeEventListener('touchmove', onMouseMove)
            item.removeEventListener('touchend', onMouseUp)
        })

        carrousselItems.forEach((item) => {
            item.addEventListener('touchstart', handleTouch)
        })
    }

    const isIntersecting = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            window.addEventListener('scroll', scrollEventWindow)
        } else {
            window.removeEventListener('scroll', scrollEventWindow)

        }
    })


    widthLibResize.observe(widthLib)
    const state = {
        startPoint: 0,
        positionSaved: 0,
        currentPoint: 0,
        moviment: 0,
        indexCurrent: 0,
        positionSavedBefore: 0,
        positionSavedAfter: 0,
        positionSavedTotal: 0,
    }
    let test

    carrousselItems.forEach(item => {
        item.addEventListener('transitionend', (e) => {
            loop(e.currentTarget, test)
        })
    })

    const loop = (e, test) => {
        if (test) {

            e.style.cssText = `transform: translateX(${0}px);`
            e.style.transition = 'none'

            for (let states in state) {
                state[states] = 0
            }
        }
    }

    const setTranslate = (position) => {

        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(${position}px);`
            item.style.transition = `transform 0.3s`
        })
        state.positionSaved = position
    }

    function touchMoves(e, index) {
        const element = e.currentTarget
        state.indexCurrent = index
        if (index === clonedMainRight || index === clonedMainLibLeft) {
            element.removeEventListener('touchmove', onMouseMove)
            element.removeEventListener('touchend', onMouseUp)
        } else {
            state.startPoint = e.targetTouches[0].clientX
            state.currentPoint = state.startPoint - state.positionSaved
            state.positionSavedBefore = state.positionSaved

            element.removeEventListener('touchend', onMouseUp)
            element.addEventListener('touchmove', onMouseMove)
        }
    }

    function onMouseMove(e) {
        state.moviment = e.targetTouches[0].clientX - state.currentPoint
        state.positionSaved = state.moviment
        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(${state.moviment}px);`
            item.addEventListener('touchend', onMouseUp)
        })
    }


    function onMouseUp() {
        state.positionSavedAfter = state.moviment
        state.positionSavedTotal = state.positionSavedAfter - state.positionSavedBefore

        if (state.positionSavedTotal < -100) {
            count = countTheElementsToPass() ? 1 : count + 1
            const position = count * (elementWidth + 16)
            setTranslate(-position)

        } else if (state.positionSavedTotal > 100) {
            count = countTheElementsToPass() ? -1 : count - 1
            const position = count * (elementWidth + 16)
            setTranslate(-position)
        } else {
            // count = count === 4
            const position = (state.indexCurrent - mainLib) * (elementWidth + 16) // talvez o erro seja aqui
            setTranslate(-position)
        }

        test = state.positionSaved === ((elementWidth + 16) * (mainLib - clonedMainLibLeft)) || state.positionSaved === ((elementWidth + 16) * (clonedMainLibLeft - mainLib))

    }

    function countTheElementsToPass() {
        const resetCountTest = state.indexCurrent === mainLib || state.indexCurrent === clonedMainLibLeft || state.indexCurrent === clonedMainRight

        return resetCountTest
    }
}

export default carrosselAnimation
