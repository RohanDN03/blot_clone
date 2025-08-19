import React, { useContext, useEffect, useState } from 'react'
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { UserDetailContext } from '@/app/context/UserDetailsContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

function PricingModel() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const UpdateToken=useMutation(api.users.UpdateToken)
    console.log(userDetail);
    const [selectedOption,setSelectedOption]=useState();
    const onPaymentSuccess=async()=>{
        const token=userDetail?.token+Number(selectedOption?.value)
        console.log(token);
        await UpdateToken({
            token:token,
            userId:userDetail?._id
        })
    }
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div key={index} className="p-6 border rounded-xl shadow hover:shadow-lg transition flex flex-col"
          onClick={()=>{setSelectedOption(pricing)
                                   console.log(pricing.value)}}>
          <h2 className='font-bold text-2xl mb-2'>{pricing.name}</h2>
          <h2 className="text-lg mt-2">Tokens: {pricing.tokens}</h2>
          <p className="text-gray-600">{pricing.desc}</p>
          <h2 className="text-4xl font-bold text-center mt-6 p-5">${pricing.price}</h2>
          {/* <Button>Upgrade to {pricing.name}</Button> */}
          <PayPalButtons 
            disabled={!userDetail}
            style={{layout:"horizontal"}}
            onApprove={()=>onPaymentSuccess()}
            onCancel={()=>console.log("Payment Cancelled")}
            createOrder={(data,actions)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            amount:{
                                value:pricing.price,
                                currency_code:'USD'
                            }
                        }
                    ]
                })
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default PricingModel