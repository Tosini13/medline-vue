import { eventType } from '@/constants'
import { DocumentType, EventType, LineType } from '@/types'

// Mock data storage
let mockLines: LineType[] = [
  {
    id: '1',
    title: 'Diabetes Management',
    description: 'Type 2 diabetes monitoring and treatment',
    color: '#3B82F6',
    ownerId: 'user1',
  },
  {
    id: '2',
    title: 'Hypertension',
    description: 'Blood pressure management',
    color: '#EF4444',
    ownerId: 'user1',
  },
  {
    id: '3',
    title: 'Chronic Back Pain',
    description: 'Lower back pain treatment',
    color: '#10B981',
    ownerId: 'user1',
  },
]

let mockEvents: Record<string, EventType[]> = {
  '1': [
    {
      id: 'e1',
      title: 'Blood Sugar Check',
      date: '2024-01-15T10:00:00Z',
      description: 'Morning fasting blood sugar reading',
      type: eventType.test,
      documents: [
        { name: 'blood_test.pdf', path: '/docs/e1/blood_test.pdf', type: 'application/pdf' },
      ],
    },
    {
      id: 'e2',
      title: 'Endocrinologist Appointment',
      date: '2024-01-20T14:30:00Z',
      description: 'Quarterly checkup with Dr. Smith',
      type: eventType.appointment,
    },
  ],
  '2': [
    {
      id: 'e3',
      title: 'Blood Pressure Reading',
      date: '2024-01-18T08:00:00Z',
      description: 'Daily morning BP check',
      type: eventType.test,
    },
  ],
  '3': [
    {
      id: 'e4',
      title: 'Physical Therapy Session',
      date: '2024-01-22T16:00:00Z',
      description: 'Lower back strengthening exercises',
      type: eventType.appointment,
    },
  ],
}

// Mock API interface matching the real API structure
export const mockAPI = {
  lines: {
    get: async (): Promise<LineType[]> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return [...mockLines]
    },
    getById: async (lineId: string): Promise<LineType | null> => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return mockLines.find(line => line.id === lineId) || null
    },
    add: async (line: Omit<LineType, 'id' | 'ownerId'>): Promise<LineType> => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newLine: LineType = {
        ...line,
        id: String(Date.now()),
        ownerId: 'user1',
      }
      mockLines.push(newLine)
      return newLine
    },
    update: async (lineId: string, line: Omit<LineType, 'id'>): Promise<LineType> => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const index = mockLines.findIndex(l => l.id === lineId)
      if (index === -1) throw new Error('Line not found')
      mockLines[index] = { ...line, id: lineId }
      return mockLines[index]
    },
    delete: async (lineId: string): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 300))
      mockLines = mockLines.filter(l => l.id !== lineId)
      delete mockEvents[lineId]
    },
  },
  events: {
    get: async (lineId: string): Promise<EventType[]> => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [...(mockEvents[lineId] || [])]
    },
    getById: async (lineId: string, eventId: string): Promise<EventType | null> => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const events = mockEvents[lineId] || []
      return events.find(e => e.id === eventId) || null
    },
    add: async (lineId: string, event: Omit<EventType, 'id'>, newDocuments: File[] = []): Promise<EventType> => {
      await new Promise(resolve => setTimeout(resolve, 400))
      const newEvent: EventType = {
        ...event,
        id: `e${Date.now()}`,
        documents: newDocuments.map((file, idx) => ({
          name: file.name,
          path: `/docs/${lineId}/${file.name}`,
          type: file.type,
        })),
      }
      if (!mockEvents[lineId]) mockEvents[lineId] = []
      mockEvents[lineId].push(newEvent)
      return newEvent
    },
    update: async (
      lineId: string,
      eventId: string,
      event: Omit<EventType, 'id'>,
      documentsToDelete: DocumentType[] = [],
      newDocuments: File[] = []
    ): Promise<EventType> => {
      await new Promise(resolve => setTimeout(resolve, 400))
      const events = mockEvents[lineId] || []
      const index = events.findIndex(e => e.id === eventId)
      if (index === -1) throw new Error('Event not found')
      
      const existingDocs = events[index].documents || []
      const updatedDocs = [
        ...existingDocs.filter(doc => !documentsToDelete.some(d => d.path === doc.path)),
        ...newDocuments.map((file, idx) => ({
          name: file.name,
          path: `/docs/${lineId}/${file.name}`,
          type: file.type,
        })),
      ]
      
      events[index] = { ...event, id: eventId, documents: updatedDocs }
      return events[index]
    },
    delete: async (lineId: string, eventId: string): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (mockEvents[lineId]) {
        mockEvents[lineId] = mockEvents[lineId].filter(e => e.id !== eventId)
      }
    },
    getDocuments: async (lineId: string, eventId: string): Promise<DocumentType[]> => {
      await new Promise(resolve => setTimeout(resolve, 200))
      const event = mockEvents[lineId]?.find(e => e.id === eventId)
      return event?.documents || []
    },
  },
}

// Export a function to switch between mock and real API
export const getAPI = () => {
  // TODO: Replace with real API when ready
  // return API
  return mockAPI
}

