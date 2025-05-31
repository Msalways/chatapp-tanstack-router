import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import logo from '../logo.svg'
import { useValidationUserSession } from '@/lib/hooks/auth/useValidateUserSession'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ params, context }) => {
    const { queryClient } = context
    queryClient.ensureQueryData({
      queryKey: ['validate-user-session'],
    })
  },
})

function App() {
  const navigate = useNavigate()
  const { data, error, isLoading } = useValidationUserSession()
  useEffect(() => {
    if (data) {
      navigate({ to: '/Chat' })
    }
  }, [data])
  return (
    <div className="text-center">
      {/* <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header> */}
    </div>
  )
}
