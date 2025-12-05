import { useQuery } from '@tanstack/react-query'
import { isProtected } from '../lib/api.js'




const useAuthUser = () => {
 const {data:authData, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: isProtected,
    retry: false,
  })
  return {authData, isLoading}
}
export default useAuthUser
 