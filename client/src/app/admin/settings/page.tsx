import { inter } from '@/utils/fonts'
import AdminSettings from '@/components/admin/settings/AdminSettings'

const Page = () => {
 
  return (
    <div>
        <div className={` ${inter.className} font-semibold text-lg flex justify-between`}>
             <div>Admin Settings</div>
        </div>
        <div>
          <AdminSettings/>
        </div>
    </div>
  )
}

export default Page
