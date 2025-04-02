import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Products = () => {
    const { productId } = useParams();
    const { products, Currency, addToCart } = useContext(ShopContext);

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {
        const product = products.find((item) => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.images[0]);
        }
    }, [productId, products]);

    // Memoizing related products for efficiency
    const relatedProducts = useMemo(() => {
        return productData ? (
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        ) : null;
    }, [productData]);

    if (!productData) {
        return <div className='text-center text-gray-500'>Loading...</div>;
    }

    return (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.images.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-75'
                                alt={`Product image ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="Main Product" />
                    </div>
                </div>

                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        {Array(4)
                            .fill(assets.star_icon)
                            .map((icon, idx) => (
                                <img key={idx} src={icon} alt="Star" className="w-3 5" />
                            ))}
                        <img src={assets.star_dull_icon} alt="Star Dull" className="w-3 5" />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 font-medium text-3xl'>{Currency}{productData.price}</p>
                    <p className='mt-r text-gray-500 md:w-4/5'>{productData.description}</p>

                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer hover:scale-105 transition'
                    >
                        Add To Cart
                    </button>

                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original products.</p>
                        <p>Cash on delivery is available for this product.</p>
                        <p>Easy exchange and return policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description and Review */}
            <div className='mt-10'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 sm-text text-gray-500'>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts}
        </div>
    );
};

export default Products;
