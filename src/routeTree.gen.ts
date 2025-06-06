/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SignupIndexImport } from './routes/Signup/index'
import { Route as LoginIndexImport } from './routes/Login/index'
import { Route as ChatLayoutImport } from './routes/Chat/_layout'
import { Route as ChatLayoutIndexImport } from './routes/Chat/_layout/index'
import { Route as ChatLayoutChatIdImport } from './routes/Chat/_layout/$chatId'

// Create Virtual Routes

const ChatImport = createFileRoute('/Chat')()

// Create/Update Routes

const ChatRoute = ChatImport.update({
  id: '/Chat',
  path: '/Chat',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SignupIndexRoute = SignupIndexImport.update({
  id: '/Signup/',
  path: '/Signup/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/Login/',
  path: '/Login/',
  getParentRoute: () => rootRoute,
} as any)

const ChatLayoutRoute = ChatLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => ChatRoute,
} as any)

const ChatLayoutIndexRoute = ChatLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ChatLayoutRoute,
} as any)

const ChatLayoutChatIdRoute = ChatLayoutChatIdImport.update({
  id: '/$chatId',
  path: '/$chatId',
  getParentRoute: () => ChatLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/Chat': {
      id: '/Chat'
      path: '/Chat'
      fullPath: '/Chat'
      preLoaderRoute: typeof ChatImport
      parentRoute: typeof rootRoute
    }
    '/Chat/_layout': {
      id: '/Chat/_layout'
      path: '/Chat'
      fullPath: '/Chat'
      preLoaderRoute: typeof ChatLayoutImport
      parentRoute: typeof ChatRoute
    }
    '/Login/': {
      id: '/Login/'
      path: '/Login'
      fullPath: '/Login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/Signup/': {
      id: '/Signup/'
      path: '/Signup'
      fullPath: '/Signup'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/Chat/_layout/$chatId': {
      id: '/Chat/_layout/$chatId'
      path: '/$chatId'
      fullPath: '/Chat/$chatId'
      preLoaderRoute: typeof ChatLayoutChatIdImport
      parentRoute: typeof ChatLayoutImport
    }
    '/Chat/_layout/': {
      id: '/Chat/_layout/'
      path: '/'
      fullPath: '/Chat/'
      preLoaderRoute: typeof ChatLayoutIndexImport
      parentRoute: typeof ChatLayoutImport
    }
  }
}

// Create and export the route tree

interface ChatLayoutRouteChildren {
  ChatLayoutChatIdRoute: typeof ChatLayoutChatIdRoute
  ChatLayoutIndexRoute: typeof ChatLayoutIndexRoute
}

const ChatLayoutRouteChildren: ChatLayoutRouteChildren = {
  ChatLayoutChatIdRoute: ChatLayoutChatIdRoute,
  ChatLayoutIndexRoute: ChatLayoutIndexRoute,
}

const ChatLayoutRouteWithChildren = ChatLayoutRoute._addFileChildren(
  ChatLayoutRouteChildren,
)

interface ChatRouteChildren {
  ChatLayoutRoute: typeof ChatLayoutRouteWithChildren
}

const ChatRouteChildren: ChatRouteChildren = {
  ChatLayoutRoute: ChatLayoutRouteWithChildren,
}

const ChatRouteWithChildren = ChatRoute._addFileChildren(ChatRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/Chat': typeof ChatLayoutRouteWithChildren
  '/Login': typeof LoginIndexRoute
  '/Signup': typeof SignupIndexRoute
  '/Chat/$chatId': typeof ChatLayoutChatIdRoute
  '/Chat/': typeof ChatLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/Chat': typeof ChatLayoutIndexRoute
  '/Login': typeof LoginIndexRoute
  '/Signup': typeof SignupIndexRoute
  '/Chat/$chatId': typeof ChatLayoutChatIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/Chat': typeof ChatRouteWithChildren
  '/Chat/_layout': typeof ChatLayoutRouteWithChildren
  '/Login/': typeof LoginIndexRoute
  '/Signup/': typeof SignupIndexRoute
  '/Chat/_layout/$chatId': typeof ChatLayoutChatIdRoute
  '/Chat/_layout/': typeof ChatLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/Chat' | '/Login' | '/Signup' | '/Chat/$chatId' | '/Chat/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/Chat' | '/Login' | '/Signup' | '/Chat/$chatId'
  id:
    | '__root__'
    | '/'
    | '/Chat'
    | '/Chat/_layout'
    | '/Login/'
    | '/Signup/'
    | '/Chat/_layout/$chatId'
    | '/Chat/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChatRoute: typeof ChatRouteWithChildren
  LoginIndexRoute: typeof LoginIndexRoute
  SignupIndexRoute: typeof SignupIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChatRoute: ChatRouteWithChildren,
  LoginIndexRoute: LoginIndexRoute,
  SignupIndexRoute: SignupIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/Chat",
        "/Login/",
        "/Signup/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/Chat": {
      "filePath": "Chat",
      "children": [
        "/Chat/_layout"
      ]
    },
    "/Chat/_layout": {
      "filePath": "Chat/_layout.tsx",
      "parent": "/Chat",
      "children": [
        "/Chat/_layout/$chatId",
        "/Chat/_layout/"
      ]
    },
    "/Login/": {
      "filePath": "Login/index.tsx"
    },
    "/Signup/": {
      "filePath": "Signup/index.tsx"
    },
    "/Chat/_layout/$chatId": {
      "filePath": "Chat/_layout/$chatId.tsx",
      "parent": "/Chat/_layout"
    },
    "/Chat/_layout/": {
      "filePath": "Chat/_layout/index.tsx",
      "parent": "/Chat/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
