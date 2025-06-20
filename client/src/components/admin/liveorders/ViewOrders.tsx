import React from 'react'
import { inter } from '@/utils/fonts'
const ViewOrders = (props:any) => {
  return (
    <div className='bg-white z-50 inset-x-72 inset-y-20 absolute rounded-lg'>
        <div className={` ${inter.className} justify-between mx-4 my-2 flex font-semibold `}>
            <div>kader Ismail</div>
            <div>#0012</div>
        </div>
        <div>
            <div className='rounded-lg bg-gray-100 shadow-lg p-2 m-2'>
                        <div className={`${inter.className} mt-2`}>
                          <table className='border-collapse w-full'>
                              <thead>
                                  <tr className='opacity-75 text-sm'>
                                      <th className='text-left'>S.no</th>
                                      <th className='text-left'>Food Name</th>
                                      <th className='text-left'>Price</th>
                                      <th className='text-left'>Quantity</th>
                                      <th className='text-left'>Total</th>
                                  </tr>
                              </thead>
                              <tbody className='text-sm'>
                                  <tr className='h-10'>
                                      <td className=''>1</td>
                                      <td>Chicken</td>
                                      <td>&#8377; 100</td>
                                      <td>1</td>
                                      <td>&#8377; 100</td>
                                  </tr>
                                  <tr className='h-10'>
                                      <td className='py-2'>2</td>
                                      <td>Burger</td>
                                      <td>&#8377; 12</td>
                                      <td>12</td>
                                      <td>&#8377; 160</td>
                                  </tr>
                                  <tr className='h-10'>
                                      <td className='py-2'>3</td>
                                      <td>Pizza</td>
                                      <td>&#8377; 12</td>
                                      <td>1</td>
                                      <td>&#8377; 260</td>
                                  </tr>
                                  <tr className='h-8 border-t-2 border-gray-200'>
                                        <td></td>
                                        <td></td>
                                        <td className='font-semibold opacity-75' >Total</td>
                                        <td>10</td>
                                        <td>&#8377; 10000</td>
                                  </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
        </div>
        <div className='flex w-full absolute bottom-2 justify-between text-sm'>
            <button className='bg-red-500 text-white px-3 py-1 rounded-xl mx-3'
            onClick={props.close}
            ><i className="fas fa-times"></i> cancel</button>
            <div className='mx-3'>
                
                <button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'><i className="fas fa-trash"></i></button>
                {
                    !props.isNotLive && 
                    <button className='bg-green-400 text-white px-3 py-1 rounded-lg'><i className="fas fa-money-check-alt "></i>  check out</button>
                }
            </div>
        </div>
    </div>
  )
}

export default ViewOrders
