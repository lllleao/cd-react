import { useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useEffect, useState } from 'react'
import ButtonPurchase from '../ButtonPurchase'

const Book = () => {
    const [data, setData] = useState<Books>()
    const { id } = useParams()

    useEffect(() => {
        fetch(`https://backend-cidadeclipse.vercel.app/store-books/${id}`, {
            method: 'GET'
        }).then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(err => console.error('There was a problem with the fetch operation:', err))
    }, [])


    return (
        <BooksPurchase>
            <div className="container">
                <div className="book">
                <BookImg>
                    <img src={data?.photo} alt='' />
                </BookImg>
                <AboutBook>
                    <h3>
                        {data?.title.slice(0, -8)}
                    </h3>
                    <p className='sinopse'>
                        <span>Sinopse: </span>
                        a
                    </p>
                    <div className="others-informations">
                        <ul>
                            a
                            <li>
                                <span>Tamanho: </span> a
                            </li>
                            <li>
                                <span>Número de Páginas: </span> a
                            </li>
                        </ul>
                    </div>
                    <div className="tags">
                        a
                    </div>
                </AboutBook>
                </div>
                <ButtonPurchase />
            </div>
        </BooksPurchase>
    )
}

export default Book
