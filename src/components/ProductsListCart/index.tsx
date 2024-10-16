import { ButtonCart, ProductsListCartContainer, OverLay } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { RootReducer } from "../../store"
import { close } from "../../store/reducers/cart"

const ProductsListCart = () => {
    const { items, isOpen } = useSelector((state: RootReducer) => state.cart)
    const dispatch = useDispatch()

    return (
        <>
            <OverLay onClick={() => dispatch(close())} className={isOpen ? '' : 'closed'} />
            <ProductsListCartContainer className={isOpen ? '' : 'closed'}>
            <div className="close">
                <i onClick={() => dispatch(close())} className="fa-solid fa-x" />
            </div>
            <ul>
                {
                    items.map(({ id, photo, price, title }) => (
                        <li key={id}>
                            <header>
                                <i className="fa-solid fa-trash" />
                            </header>
                            <img src={photo} alt="item cart" />
                            <div>{title}</div>
                            <div className="price">
                                R$ {price},00
                            </div>
                            <div className="total-price">
                                Valor total: R$ {price},00
                            </div>
                            <ButtonCart>Comprar agora</ButtonCart>
                        </li>
                    ))
                }
            </ul>
        </ProductsListCartContainer>
        </>
    )
}

export default ProductsListCart
