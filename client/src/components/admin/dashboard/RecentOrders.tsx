import React from 'react'
import { inter } from '@/utils/fonts'


const RecentOrders = () => {
  return (
    <div className='pt-2'>
        <div className={`${inter.className} font-semibold`}>
            Recent Orders
        </div>
      <div className={`${inter.className} mt-4`}>
        <table className='border-collapse w-full'>
            <thead>
                <tr className='opacity-75'>
                    <th className='text-left'>Order ID</th>
                    <th className='text-left'>Customer Name</th>
                    <th className='text-left'>Date</th>
                    <th className='text-left'>Time</th>
                    <th className='text-left'>Total Amount</th>
                    <th className='text-left'>Order Method</th>
                    <th className=''>View Order</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                <tr className='h-10'>
                    <td className=''>#02302</td>
                    <td>Kader ismail</td>
                    <td>12-12-12</td>
                    <td>12:12 am</td>
                    <td>&#8377; 360</td>
                    <td className=''>Online</td>
                    <td className='flex justify-center h-10 items-center'><i className="fas fa-eye"></i></td>
                </tr>
                <tr className='h-10'>
                    <td className='py-2'>#02303</td>
                    <td>Azeem</td>
                    <td>12-12-12</td>
                    <td>12:12 am</td>
                    <td>&#8377; 160</td>
                    <td>Online</td>
                    <td className='flex justify-center h-10 items-center'><i className="fas fa-eye"></i></td>
                </tr>
                <tr className='h-10'>
                    <td className='py-2'>#02304</td>
                    <td>Ibrahim</td>
                    <td>12-12-12</td>
                    <td>12:12 am</td>
                    <td>&#8377; 260</td>
                    <td>Offline</td>
                    <td className='flex justify-center h-10 items-center'><i className="fas fa-eye"></i></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders
