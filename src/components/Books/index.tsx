import { useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useEffect, useState } from 'react'
const Book = () => {
    const [data, setData] = useState<Books>()
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9001/store-books/${id}`, {
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
                <BookImg>
                    <img src={data?.photo} alt='' />
                </BookImg>
                <AboutBook>
                    <h3>
                        {data?.title}
                    </h3>
                </AboutBook>
            </div>
        </BooksPurchase>
    )
}

export default Book
