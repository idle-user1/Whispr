
import {Routes,Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage from './pages/ChatPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/Callpage'
import Layout from './components/Layout'

import PageLoader from './components/PageLoader.js'
import { useThemeStore} from './store/useThemeStore.js'
import useAuthUser from './hooks/useAuthUser.js'
import { Toaster } from 'react-hot-toast'

const App = () => {
  
  const {authData, isLoading} = useAuthUser()
  const user = authData?.user
  const isOnboarded = user?.isOnboarded
  const {theme} = useThemeStore()
  
  if (isLoading) {
    return <PageLoader />
  }
  
  return (
    <div className='min-h-screen' data-theme={theme}>
    <Toaster />
    <Routes>
    \
      <Route path="/login" element={user?<Navigate to={!isOnboarded?"/onboarding":"/"} />:<LoginPage />} />
      <Route path="/signup" element={user?<Navigate to={!isOnboarded?"/onboarding":"/"} />:<SignUpPage />} />
      <Route path="/onboarding" element={user? (isOnboarded?<Navigate to="/" />:<OnboardingPage />):<Navigate to="/login" />} />
      
      {/* Protected routes - With Layout (Sidebar + Navbar) */}
      <Route element={user && isOnboarded ? <Layout /> : <Navigate to={user ? "/onboarding" : "/login"} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/calls" element={<CallPage />} />
      </Route>
    </Routes>
    </div>
  
   
  )
}

export default App
