import { useQueryClient, useMutation } from '@tanstack/vue-query'
import authService from '../services/auth.service'

export default function useAuth() {
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.setQueryData('user', data)
    }
  })

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('email', data.user.email)
      }
      queryClient.setQueryData('user', data)
    }
  })
  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      queryClient.setQueryData('user', data)
    }
  })

  return {
    register: registerMutation.mutate,
    signIn: signInMutation.mutate,
    resetPassword: resetPasswordMutation.mutate
  }
}
