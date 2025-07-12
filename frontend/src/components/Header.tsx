
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { MessageSquare, LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            StackIt
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/signin">
            <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-primary text-white transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
