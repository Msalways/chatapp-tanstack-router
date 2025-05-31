import { createContext, useCallback, useContext, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useValidationUserSession } from '../hooks/auth/useValidateUserSession'
import { useLoginMutation } from '../hooks/auth/useLoginMutation'
import useLogoutMutation from '../hooks/auth/useLogoutMutation'
import useSignupMutation from '../hooks/auth/useSignupMutation'

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string) => Promise<any>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
  children,
  validateSession = true,
}: {
  children: React.ReactNode
  validateSession?: boolean
}) => {
  const navigate = useNavigate()
  const {
    data: userData,
    isLoading,
    refetch,
  } = useValidationUserSession(validateSession)
  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()
  const signUpMutation = useSignupMutation()

  // // Navigate to login if no user and not loading
  // useEffect(() => {
  //   if (!isLoading && !userData) {
  //     navigate({ to: '/Login', params: {} })
  //   }
  // }, [userData, isLoading, navigate])

  // Derive user from session data safely
  const user = userData ?? null

  const signUp = useCallback(
    async (email: string) => {
      const { data } = await signUpMutation.mutateAsync({ email })

      return data
    },
    [signUpMutation],
  )

  // Add memoized login handler to avoid recreating function on every render
  const login = useCallback(
    async (email: string, password: string) => {
      console.log(email, password)

      const data = await loginMutation.mutateAsync({ email, password })
      console.log(data)

      await refetch()

      navigate({ to: '/Chat', params: { chatId: 'default' } })
    },
    [loginMutation, refetch, navigate],
  )

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync()

    navigate({ to: '/Login' })
  }, [logoutMutation, refetch, navigate])

  useEffect(() => {
    if (!isLoading && user) {
      navigate({ to: '/Chat' })
    }
  }, [user, isLoading, navigate])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        logout,
        signUp,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
