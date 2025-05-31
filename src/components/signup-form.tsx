import React from 'react'
import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { cn } from '@/lib/utils'
import useSignupMutation from '@/lib/hooks/auth/useSignupMutation'
import Swal from 'sweetalert2'
import { toast } from 'sonner'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const mutate = useSignupMutation()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await mutate.mutateAsync({ email: value.email })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User created successfully & password was copied to clipboard',
          confirmButtonText: 'Login',
          backdrop: false,
        }).then((response) => {
          if (response.isConfirmed) {
            navigator.clipboard.writeText(data.password)
            navigate({ to: '/Login' })
          }
        })
      } catch (err: any) {
        console.error('SignUp failed:', err)
        // Handle login error (e.g., show error toast)
        toast.error(err?.response?.data?.message ?? 'SignUp failed')
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your email below to SignUp</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="flex flex-col gap-6">
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/Login" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
