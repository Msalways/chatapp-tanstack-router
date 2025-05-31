import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { AuthProvider } from '@/lib/context/AuthContext'
import { ChatProvider } from '@/lib/context/ChatContext'

interface ReactContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<ReactContext>()({
  component: () => {
    const location = useRouterState({ select: (s) => s.location.pathname })

    const isAuthPage = /^\/(login|signup)/i.test(location)

    const validateSession = !isAuthPage

    return (
      <>
        <AuthProvider validateSession={validateSession}>
          <ChatProvider>
            <Outlet />
          </ChatProvider>
          <TanStackRouterDevtools />
        </AuthProvider>
      </>
    )
  },
})
