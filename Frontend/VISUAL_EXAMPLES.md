# 📸 Dashboard Visual Examples & Code Snippets

## Component Preview Codes

### 1. Sidebar Component Usage

```jsx
import Sidebar from './features/interview/components/dashboard/Sidebar'

function MyPage() {
  const [activeSection, setActiveSection] = useState('technical')

  return (
    <Sidebar 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    />
  )
}
```

**Visual Output:**
- Left panel with 3 navigation items
- Active item highlighted with pink glow
- Left border indicator on active state
- Icons from lucide-react
- Hover animations on all items
- Help card at bottom with CTA

---

### 2. Question Card with State

```jsx
import QuestionCard from './features/interview/components/dashboard/QuestionCard'

const question = {
  id: 1,
  question: "Explain React Hooks",
  preview: "Hooks are functions that let you use state...",
  fullAnswer: "React Hooks are functions that allow you to...",
  feedback: "Great explanation! Consider mentioning custom hooks...",
  aiScore: 88,
  category: "React"
}

<QuestionCard 
  question={question}
  isExpanded={expandedCard === 1}
  onToggle={() => setExpandedCard(1)}
  index={0}
/>
```

**Visual Output:**
- Numbered card (1)
- Question title with AI score badge (88%)
- Expandable details
- Full answer section
- AI feedback toggle
- Practice & Save buttons
- Smooth animations

---

### 3. Right Panel with Match Score

```jsx
import RightPanel from './features/interview/components/dashboard/RightPanel'

<RightPanel 
  matchScore={87}
  skillGaps={[
    { name: "React Advanced Patterns", level: 72, status: "moderate" },
    { name: "System Design", level: 65, status: "weak" },
    { name: "Web Performance", level: 78, status: "moderate" }
  ]}
/>
```

**Visual Output:**
- Circular progress ring (animated 0 → 87%)
- Score breakdown (Technical, Behavioral, Communication)
- Skill cards with progress bars
- Color-coded skill status
- Download button with gradient
- Quick stats cards
- Improvement metrics

---

### 4. Complete Dashboard Integration

```jsx
import InterviewDashboard from './features/interview/components/InterviewDashboard'
import { useParams } from 'react-router-dom'

function ReportPage() {
  const { interviewId } = useParams()

  return (
    <div>
      <InterviewDashboard />
    </div>
  )
}
```

**Visual Output:**
- Scroll progress bar at top
- 3-column layout
- Sidebar on left
- Main content in center
- Right panel on right
- Full responsiveness

---

## Custom Hook Examples

### useCardExpansion Example

```jsx
import { useCardExpansion } from './hooks/useDashboard'

function QuestionList() {
  const { expandedCard, toggleCard } = useCardExpansion()

  return (
    <div>
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => toggleCard(q.id)}
          className={expandedCard === q.id ? 'expanded' : ''}
        >
          <h3>{q.question}</h3>
          {expandedCard === q.id && <p>{q.answer}</p>}
        </div>
      ))}
    </div>
  )
}
```

### useCountUp Example

```jsx
import { useCountUp } from './hooks/useDashboard'

function ScoreDisplay() {
  const score = useCountUp(87, 2000) // Animate to 87 in 2s

  return <div className="score">{score}%</div>
}
```

### useSearch Example

```jsx
import { useSearch } from './hooks/useDashboard'

function SearchableQuestions() {
  const { query, setQuery, filteredItems } = useSearch(questions, 'question')

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
      />
      {filteredItems.map((q) => (
        <div key={q.id}>{q.question}</div>
      ))}
    </div>
  )
}
```

---

## Utility Function Examples

### Color Management

```jsx
import { getSkillColor, getScoreFeedback } from './utils/dashboardUtils'

function SkillDisplay({ level, score }) {
  const color = getSkillColor(level)
  const feedback = getScoreFeedback(score)

  return (
    <div className={`skill-${color}`}>
      <span>{level}%</span>
      <p>{feedback}</p>
    </div>
  )
}
```

### Score Calculation

```jsx
import { calculateAverageScore, sortByScore } from './utils/dashboardUtils'

function QuestionStats() {
  const average = calculateAverageScore(questions)
  const sorted = sortByScore(questions, 'desc')

  return (
    <div>
      <h3>Average Score: {average}%</h3>
      <ol>
        {sorted.map((q) => (
          <li key={q.id}>{q.question} - {q.aiScore}%</li>
        ))}
      </ol>
    </div>
  )
}
```

---

## Advanced Component Examples

### Using Analytics Card

```jsx
import { AnalyticsCard } from './components/AdvancedComponents'

const analyticsData = [
  { label: "Technical", value: 90 },
  { label: "Behavioral", value: 85 },
  { label: "Communication", value: 82 }
]

<AnalyticsCard data={analyticsData} title="Performance Breakdown" />
```

### Using Filter Component

```jsx
import { DashboardFilter } from './components/AdvancedComponents'

function FilteredDashboard() {
  const [filters, setFilters] = useState([])

  const handleFilter = (value, activeFilters) => {
    // Update filter logic
  }

  return (
    <>
      <DashboardFilter 
        onFilterChange={handleFilter}
        activeFilters={filters}
      />
    </>
  )
}
```

### Using Score Gauge

```jsx
import { ScoreGauge } from './components/AdvancedComponents'

<div className="gauge-grid">
  <ScoreGauge score={90} label="Technical" size={140} />
  <ScoreGauge score={85} label="Behavioral" size={140} />
  <ScoreGauge score={82} label="Communication" size={140} />
</div>
```

---

## CSS Animation Examples

### Glow Effect

```scss
.glowing-element {
  box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
  animation: pulse-glow 2s ease-in-out infinite;
  
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
    }
    50% {
      opacity: 0.7;
      box-shadow: 0 0 40px rgba(255, 0, 110, 0.5);
    }
  }
}
```

### Hover Elevation

```scss
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(255, 0, 110, 0.15);
  }
}
```

### Smooth Expand/Collapse

```scss
.expandable {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  
  &.expanded {
    max-height: 1000px;
    transition: max-height 0.3s ease-in;
  }
}
```

---

## Responsive Design Examples

### Mobile-First Stacking

```scss
.dashboard-container {
  // Mobile
  grid-template-columns: 1fr;
  
  // Tablet
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  // Desktop
  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr 380px;
  }
}
```

### Responsive Font Sizes

```scss
h1 {
  font-size: 24px;
  
  @media (min-width: 768px) {
    font-size: 28px;
  }
  
  @media (min-width: 1024px) {
    font-size: 32px;
  }
}
```

---

## Form Integration Example

```jsx
function InterviewForm() {
  const [formData, setFormData] = useState({
    answer: '',
    rating: 0
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className="interview-form">
      <textarea
        name="answer"
        value={formData.answer}
        onChange={handleChange}
        placeholder="Type your answer here..."
      />
      <button type="submit" className="btn-primary">
        Submit Answer
      </button>
    </form>
  )
}
```

---

## Data Fetching Example

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function InterviewDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/interview/1')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  return (
    <div>
      {/* Dashboard content */}
    </div>
  )
}
```

---

## Theme Customization Example

```jsx
// Create a theme context
import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  const theme = {
    isDark,
    toggleTheme: () => setIsDark(!isDark),
    colors: isDark ? darkColors : lightColors
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
```

---

## Accessibility Example

```jsx
// Keyboard accessible component
function AccessibleCard({ children, onAction }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onAction()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onAction}
      aria-label="Interactive card"
    >
      {children}
    </div>
  )
}
```

---

## Testing Example

```jsx
import { render, screen, userEvent } from '@testing-library/react'
import QuestionCard from './QuestionCard'

describe('QuestionCard', () => {
  const mockQuestion = {
    id: 1,
    question: "Test question",
    aiScore: 88
  }

  test('renders question title', () => {
    render(
      <QuestionCard 
        question={mockQuestion} 
        onToggle={() => {}}
        isExpanded={false}
        index={0}
      />
    )
    expect(screen.getByText("Test question")).toBeInTheDocument()
  })

  test('toggles expansion on click', async () => {
    const handleToggle = jest.fn()
    render(
      <QuestionCard 
        question={mockQuestion}
        onToggle={handleToggle}
        isExpanded={false}
        index={0}
      />
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handleToggle).toHaveBeenCalled()
  })
})
```

---

## Performance Optimization Example

```jsx
import { memo, useMemo } from 'react'

// Memoized component (prevents unnecessary re-renders)
const QuestionCardMemo = memo(QuestionCard)

function QuestionList({ questions }) {
  // Memoized sorted list
  const sortedQuestions = useMemo(
    () => [...questions].sort((a, b) => b.aiScore - a.aiScore),
    [questions]
  )

  return (
    <div>
      {sortedQuestions.map((q) => (
        <QuestionCardMemo key={q.id} question={q} />
      ))}
    </div>
  )
}
```

---

These examples should help you understand and customize every aspect of the interview dashboard! 🚀
