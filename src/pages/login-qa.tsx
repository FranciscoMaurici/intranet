import { getCsrfToken } from 'next-auth/react'

const SignIn = ({ csrfToken }: { csrfToken: string }) => (
  <form method="post" action="/api/auth/callback/credentials">
    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    <label>
      Username
      <input name="email" type="text" required />
    </label>
    <label>
      Password
      <input name="password" type="password" required />
    </label>
    <button type="submit">Sign in</button>
  </form>
)

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SignIn
