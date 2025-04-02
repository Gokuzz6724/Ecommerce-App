import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div className='px-4 md:px-10 lg:px-20 py-10'>
      
      {/* About Us Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>
        
        {/* Image Section */}
        <div className='w-full md:w-1/2'>
          <img 
            className='w-full max-w-[450px] rounded-lg shadow-md object-cover' 
            src={assets.about_img} 
            alt="About Us" 
          />
        </div>

        {/* Text Section */}
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus corrupti enim sint expedita reiciendis maiores quaerat aliquam voluptatibus vitae. Fuga?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rerum, molestias laborum consequuntur officia natus!
          </p>
          <b className='text-gray-800 text-lg'>Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ipsa repellat repudiandae?
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        {/* Quality Assurance */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurance:</b>
          <p className='text-fray-600' >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam labore neque cupiditate, nostrum corrupti et repellat officiis optio ullam vel.
          </p>
        </div>

        {/* Convenience */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className='text-fray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam labore neque cupiditate, nostrum corrupti et repellat officiis optio ullam vel.
          </p>
        </div>

        {/*exceptional customer service */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-fray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam labore neque cupiditate, nostrum corrupti et repellat officiis optio ullam vel.
          </p>
        </div>
      </div>

          <NewsLetterBox />

    </div>
  )
}

export default About
