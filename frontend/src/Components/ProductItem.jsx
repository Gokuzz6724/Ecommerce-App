import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
    const { Currency } = useContext(ShopContext);

    // Ensure image is an array or fallback to a default placeholder image
    const imageUrl = Array.isArray(image) ? image[0] : image;

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/Product/${id}`}>
            <div className='overflow-hidden'>
                <img 
                    className='hover:scale-110 transition ease-in-out' 
                    src={imageUrl || '/placeholder.png'}  // Fallback image
                    alt={name} 
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{Currency}{price}</p>
        </Link>
    )
}

export default ProductItem;
