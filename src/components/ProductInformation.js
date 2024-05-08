// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react';

// function ProductInformation() {

//     const { id } = useParams();
//     // const [product, setProducts] = useState([])

//     useEffect(() => {
//         fetch(`http://localhost:3000/products/${id}`)
//            .then(res => res.json())
//            .then(data => setProducts(data))
//     }, [id])

//     if (!product) {
//         return <h1>Loading...</h1>
//     }

//     return (
//         <div className='product-information-container'>
//             {products.map(({}))}
//             <div>
//                 <img src={product.image} alt={product.name} />
//                 <strong>{product.description}</strong>
//                 <p>${product.price}</p>
//             </div>
//         </div>
//     )
// }

// export default ProductInformation
