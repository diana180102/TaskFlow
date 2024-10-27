import { auth } from "@/auth"
 
export default async function Dashboard() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
        <h1>Dashboard</h1>
      <pre>{session}</pre>
    </div>
  )
}