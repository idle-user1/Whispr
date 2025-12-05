
import {Routes,Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage from './pages/ChatPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/Callpage'

import PageLoader from './components/PageLoader.js'

import useAuthUser from './hooks/useAuthUser.js'
import { Toaster } from 'react-hot-toast'

const App = () => {
  
  const {authData, isLoading} = useAuthUser()
  const user = authData?.user
  const isOnboarded = user?.isOnboarded
  console.log("user", user, "isOnboarded:", isOnboarded)
  if (isLoading) {
    return <PageLoader />
  }
  return (
    <div className='min-h-screen' data-theme="dark">
    <Toaster />
    <Routes>
      <Route path="/" element={user && isOnboarded?
      <HomePage />:
      <Navigate to={user?"/onboarding":"/login"} />
       } />

      <Route path="/login" element={user?<Navigate to={!isOnboarded?"/onboarding":"/"} />:<LoginPage />} />
      <Route path="/signup" element={user?<Navigate to={!isOnboarded?"/onboarding":"/"} />:<SignUpPage />} />
      <Route path="/onboarding" element={user? (isOnboarded?<Navigate to="/" />:<OnboardingPage />):<Navigate to="/login" />} />
      <Route path="/chat" element={user?<ChatPage />:<Navigate to="/login" />} />
      <Route path="/notifications" element={user?<NotificationsPage />:<Navigate to="/login" />} />
      <Route path="/calls" element={user?<CallPage />:<Navigate to="/login" />} />
    </Routes>
    </div>
  
   
  )
}

export default App
