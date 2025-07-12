import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem('email') || 'user@example.com'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border shadow-sm bg-card/70 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            StackIt
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/explore"
            className="text-sm font-medium text-foreground hover:underline underline-offset-4 transition-colors"
          >
            Explore Questions
          </Link>
          <Link
            to="/ask"
            className="text-sm font-medium text-foreground hover:underline underline-offset-4 transition-colors"
          >
            Ask Question
          </Link>
          <img
            src="https://api.dicebear.com/7.x/thumbs/svg?seed=Ayush"
            alt="Profile"
            className="w-10 h-10 rounded-full shadow-md"
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center p-6">
        <Card className="w-full max-w-lg shadow-xl border border-border glass">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-lg text-muted-foreground text-center">
              You’re logged in as <strong>{email}</strong>
            </p>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
