import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  MessageSquare,
  TrendingUp,
  Plus,
  Search,
  Code,
  FlaskConical,
  Globe2,
  BrainCircuit,
  Rocket,
  ChevronRight,
  BookOpen,
  Lightbulb,
  User2,
} from 'lucide-react'
import { Header } from '@/components/Header'
import clsx from 'clsx'

const TAGS = [
  { name: 'Coding', icon: Code, sub: ['JavaScript', 'Python', 'C++', 'Java'] },
  { name: 'Science', icon: FlaskConical },
  { name: 'Technology', icon: BrainCircuit },
  { name: 'AI/ML', icon: Rocket },
  { name: 'Geography', icon: Globe2 },
  { name: 'Literature', icon: BookOpen },
  { name: 'Philosophy', icon: Lightbulb },
  { name: 'Sociology', icon: User2 },
]

const PAGE_SIZE = 5

export default function ExploreQuestions() {
  const [search, setSearch] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [showMoreTags, setShowMoreTags] = useState(false)
  const [activeTab, setActiveTab] = useState<'newest' | 'popular'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  // Check sign in status
  useEffect(() => {
    setSignedIn(!!localStorage.getItem('token'))
  }, [])

  // Fetch questions from backend API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get('http://localhost:5000/api/questions')
        setQuestions(res.data)
      } catch (err) {
        console.error('Error fetching questions:', err)
      }
    }
    fetchQuestions()
  }, [])

  const handleAsk = () => {
    if (signedIn) navigate('/ask')
    else navigate('/signin')
  }

  const toggleTopic = (topicName: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicName) ? prev.filter(t => t !== topicName) : [...prev, topicName]
    )
    setCurrentPage(1)
  }

  const matchesSelectedTopics = (qTags: string[]) => {
    if (selectedTopics.length === 0) return true
    return selectedTopics.some(topic => {
      const tagObj = TAGS.find(t => t.name === topic)
      if (!tagObj) return false
      if (qTags.includes(topic)) return true
      if (tagObj.sub) {
        return tagObj.sub.some(subtag => qTags.includes(subtag))
      }
      return false
    })
  }

  const filteredBySearchAndTopic = questions.filter(q => {
    const matchesSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesTopic = matchesSelectedTopics(q.tags || [])
    return matchesSearch && matchesTopic
  })

  // Parse timeAgo as minutes for sorting
  const parseTime = (dateStr: string) => {
    return new Date(dateStr).getTime()
  }

  const sortedNewestDesc = [...filteredBySearchAndTopic].sort(
    (a, b) => parseTime(b.createdAt) - parseTime(a.createdAt)
  )

  const sortedPopular = [...filteredBySearchAndTopic].sort(
    (a, b) => (b.votes?.length || 0) - (a.votes?.length || 0)
  )

  const activeList = activeTab === 'newest' ? sortedNewestDesc : sortedPopular

  const totalPages = Math.ceil(activeList.length / PAGE_SIZE)

  const pagedQuestions = activeList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-7xl mx-auto py-10 px-4 flex gap-6">
        <div className="w-1/4 hidden md:block">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ask a Question</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAsk} className="w-full gradient-primary text-white hover:scale-105">
                <Plus className="mr-2 h-4 w-4" /> Ask Now
              </Button>
              {!signedIn && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  You must{' '}
                  <Link to="/signin" className="text-primary underline">
                    sign in
                  </Link>{' '}
                  to ask.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search questions..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center overflow-x-auto gap-3 pb-2 relative z-0">
              {TAGS.slice(0, 5).map((tag, i) => (
                <div
                  key={i}
                  onClick={() => toggleTopic(tag.name)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-full text-sm cursor-pointer transition-all select-none',
                    selectedTopics.includes(tag.name)
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-primary hover:text-white'
                  )}
                >
                  <tag.icon className="h-4 w-4" />
                  {tag.name}
                </div>
              ))}
              <div className="relative">
                <div
                  className="flex items-center gap-1 px-3 py-2 border rounded-full cursor-pointer hover:bg-muted-foreground hover:text-white transition-all select-none"
                  onClick={() => setShowMoreTags(!showMoreTags)}
                >
                  More <ChevronRight className="h-4 w-4" />
                </div>
                {showMoreTags && (
                  <div className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-3 z-50 min-w-max whitespace-nowrap">
                    {TAGS.slice(5).map((tag, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          toggleTopic(tag.name)
                          setShowMoreTags(false)
                        }}
                        className={clsx(
                          'flex items-center gap-2 px-3 py-1 text-sm rounded cursor-pointer select-none hover:bg-muted hover:text-black',
                          selectedTopics.includes(tag.name)
                            ? 'bg-primary text-white'
                            : 'text-muted-foreground'
                        )}
                      >
                        <tag.icon className="h-4 w-4" />
                        {tag.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 flex gap-4 border-b border-muted-foreground">
            <button
              className={clsx(
                'px-4 py-2 font-semibold',
                activeTab === 'newest' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-primary'
              )}
              onClick={() => {
                setActiveTab('newest')
                setCurrentPage(1)
              }}
            >
              Newest
            </button>
            <button
              className={clsx(
                'px-4 py-2 font-semibold',
                activeTab === 'popular' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-primary'
              )}
              onClick={() => {
                setActiveTab('popular')
                setCurrentPage(1)
              }}
            >
              Popular
            </button>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">{activeTab === 'newest' ? 'Newest Questions' : 'Popular Questions'}</h2>
            <div className="space-y-4">
              {pagedQuestions.length === 0 && <p className="text-muted-foreground">No questions found.</p>}

              {pagedQuestions.map(q => (
                <Card key={q._id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/questions/${q._id}`} className="font-semibold text-lg hover:text-primary">
                          {q.title}
                        </Link>
                        <p className="text-muted-foreground text-sm">
                          by {q.user?.username || 'Anonymous'} • {new Date(q.createdAt).toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {q.tags?.map((tag: string, idx: number) => (
                            <Badge key={idx} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-muted-foreground text-sm">
                        <TrendingUp className="inline-block h-4 w-4 mr-1" />
                        {q.votes?.length || 0} upvotes
                      </div>
                    </div>

                    {/* Answer Button */}
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (signedIn ? navigate(`/questions/${q._id}/answer`) : navigate('/signin'))}
                      >
                        Answer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-3">
                <Button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
                  Next
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
