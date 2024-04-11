import React from 'react'
import Img1 from '../../Assets/images/footer/AmericanExpress.png'
import Img2 from '../../Assets/images/footer/amazon.png'
import Img3 from '../../Assets/images/footer/appleStore.png'
import Img4 from '../../Assets/images/footer/googlePlay.png'
import Img5 from '../../Assets/images/footer/masterCard.png'
import Img6 from '../../Assets/images/footer/paypal.png'






export default function Footer() {
  return (
    <div className=' p-5 my-5 bg-main-light  '>
      <h3>Get The FreshCart App</h3>
      <p>we will send you a link open it on your phone to download the app </p>

      <form action="" method="get" className='d-md-flex my-4'>
        <input type="email" className='form-control w-75 my-3 my-md-0 mx-md-5' placeholder='Email'/>
        <button className='bg-main  w-25  text-white btn' type="submit">Share App Link</button>
      </form>

      <div className="d-md-flex justify-content-between py-4 my-3 border-secondary-subtle border-top border-bottom">
        <div className='d-flex mb-4 mb-md-0 '>
          <h6>payment partners</h6>
          <div className='mx-3'>
            <img className='mx-1' width={50} src={Img2} alt="" />
            <img className='mx-1' width={50} src={Img1} alt="" />
            <img className='mx-1' width={50} src={Img5} alt="" />
            <img className='mx-1' width={50} src={Img6} alt="" />
          </div>
        </div>
        <div className='d-flex '>
          <h6>get deliveries with FreshCart</h6>
          <div className='mx-3'>
            <img className='mx-1' width={100} src={Img3} alt="" />
            <img className='mx-1' width={100} src={Img4} alt="" />
          </div>

        </div>
      </div>
    </div>
  )
}

