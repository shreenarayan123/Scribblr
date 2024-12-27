
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Context } from './context/Context.tsx'
import { RecoilRoot } from 'recoil'
import { SearchBlogContext } from './context/Filter.tsx'
import { Toaster } from 'react-hot-toast'



ReactDOM.createRoot(document.getElementById('root')!).render(
 
     <RecoilRoot>
        <Context>
         <SearchBlogContext>
         <Toaster/>
         <App/>
         </SearchBlogContext>
         </Context>
      </RecoilRoot>
 
)
