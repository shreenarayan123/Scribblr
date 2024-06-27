import React  from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.tsx'; // Adjust the path as needed
import SignIn from './pages/SignIn'; // Adjust the path as needed
import SingleBlog from './pages/SingleBlog.tsx'; // Adjust the path as needed
import Blogs from './pages/Blogs.tsx';
import { GetStarted } from './pages/GetStarted.tsx';
import { NewStory } from './pages/NewStory.tsx';
import {Blog} from '../src/context/Context.tsx'
import { Profile } from './pages/Profile.tsx';


const App: React.FC = () => {
  const {user} = Blog();
  
  return (
   
    <BrowserRouter>
    <Routes>
      {/* { user  ? <Route path='/blogs' element={<Blogs/>} /> :<Route path='/' element={<GetStarted/>} />} */}

    
     <Route path='/' element={user ? <Navigate to={"blogs"} /> : <GetStarted/>} />
      <Route
        path='/signup'
        element={<SignUp />}
      />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/blogs' element={ user ?   <Blogs/> :<Navigate to={"/"}/> } />
      <Route path='/blog/:id' element={<SingleBlog />} />
      
      <Route path='/new-story' element={<NewStory
      />} />
    </Routes>
  </BrowserRouter>
      
  );
};

export default App;

