
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import {
  MessageSquare,
  Users,
  Trophy,
  Search,
  TrendingUp,
  Star,
  ArrowRight,
  Code,
  Database,
  Zap
} from 'lucide-react'

export default function Index() {
  const featuredQuestions = [
    {
      id: 1,
      title: "How to optimize React component re-renders?",
      author: "johndoe",
      answers: 15,
      votes: 42,
      tags: ["react", "performance", "optimization"],
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for database indexing in PostgreSQL",
      author: "dbexpert",
      answers: 8,
      votes: 28,
      tags: ["postgresql", "database", "indexing"],
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      title: "Understanding TypeScript generics with practical examples",
      author: "typescript_ninja",
      answers: 12,
      votes: 35,
      tags: ["typescript", "generics", "javascript"],
      timeAgo: "6 hours ago"
    }
  ]

  const stats = [
    { icon: MessageSquare, label: "Questions", value: "10.2K" },
    { icon: Users, label: "Developers", value: "5.8K" },
    { icon: Trophy, label: "Solutions", value: "8.9K" },
    { icon: Star, label: "Upvotes", value: "45.2K" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <Header />

      { }
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Where Developers
              <br />
              Find Answers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers sharing knowledge, solving problems, and building the future together.
              Get answers fast, contribute your expertise, and grow your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-white transition-all duration-200 hover:scale-105 hover:shadow-xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="transition-all duration-200 hover:scale-105">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Questions
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="glass text-center transition-all duration-200 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 rounded-full gradient-primary">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Questions</h2>
            <p className="text-muted-foreground text-lg">
              Discover the most popular questions from our community
            </p>
          </div>

          <div className="space-y-6">
            {featuredQuestions.map((question, index) => (
              <Card key={question.id} className="glass transition-all duration-200 hover:scale-[1.02] hover:shadow-xl animate-in slide-in-from-left-4" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors duration-200">
                        {question.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        by <span className="font-medium">{question.author}</span> • {question.timeAgo}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{question.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{question.answers}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="transition-colors duration-200 hover:bg-primary hover:text-white cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StackIt?</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to learn, share, and grow as a developer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Expert Community",
                description: "Connect with experienced developers and get answers from industry professionals."
              },
              {
                icon: Zap,
                title: "Fast Responses",
                description: "Get quick, accurate answers to your technical questions from our active community."
              },
              {
                icon: Database,
                title: "Rich Knowledge Base",
                description: "Access thousands of solved problems and build your expertise with comprehensive answers."
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="glass text-center transition-all duration-200 hover:scale-105 hover:shadow-xl animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-full gradient-primary w-fit">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <Card className="glass border-0 shadow-2xl">
            <CardContent className="py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join the Community?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Start asking questions, sharing knowledge, and connecting with developers worldwide.
                It's free to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary text-white transition-all duration-200 hover:scale-105 hover:shadow-xl">
                    Create Your Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button variant="outline" size="lg" className="transition-all duration-200 hover:scale-105">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
