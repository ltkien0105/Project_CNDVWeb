import { useQuery, useMutation } from '@tanstack/vue-query'
import userService from '../services/user.service'

export default function useUser() {
  function getUser(id) {
    const { data: user, ...rest } = useQuery({
      queryKey: ['user'],
      queryFn: () => userService.getUser(id),
      initialData: [
        {
          username: '',
          email: ''
        }
      ],
      keepPreviousData: true
    })

    return {
      user,
      ...rest
    }
  }

  const changePasswordMutation = useMutation({
    mutationFn: userService.changePassword
  })

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser
  })

  return {
    getUser,
    changePassword: changePasswordMutation.mutate,
    deleteUser: deleteUserMutation.mutate
  }
}
