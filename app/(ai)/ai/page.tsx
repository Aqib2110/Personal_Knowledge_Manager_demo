import AI from '../../components/AI'
import MobAI from '../../components/MobAI'
import AISession from '../../components/AISession'
const page = () => {
  return (
    <>
     <div className='hidden md:block'>
      <AI />
     </div>
      <div className='h-full w-full'>
        <div className='md:hidden block'>
           <AISession>
             <MobAI />
           </AISession>  
        </div>
      </div>
   

    </>
   
  )
}

export default page
