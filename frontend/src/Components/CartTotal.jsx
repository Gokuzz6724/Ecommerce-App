import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {Currency,Delivery_fee,getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title  text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{Currency}{getCartAmount()}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Shopping Fee</p>
                <p>{Currency}{Delivery_fee}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Total</p>
                <p>{Currency}{getCartAmount() === 0 ? 0 : getCartAmount() + Delivery_fee }.00</p>
            </div>
            <hr/>
        </div>
      
    </div>
  )
}

export default CartTotal
