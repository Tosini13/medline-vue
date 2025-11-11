import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },

  // Profile
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/ProfileView.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'ProfilePersonal' },
      },
      {
        path: 'personal',
        name: 'ProfilePersonal',
        component: () => import('@/views/Profile/PersonalInfo.vue'),
      },
      {
        path: 'health',
        name: 'ProfileHealth',
        component: () => import('@/views/Profile/HealthInfo.vue'),
      },
      {
        path: 'preferences',
        name: 'ProfilePreferences',
        component: () => import('@/views/Profile/Preferences.vue'),
      },
    ],
  },

  // Health Issues
  {
    path: '/issues',
    name: 'Issues',
    component: () => import('@/views/Issues/IssuesListView.vue'),
  },
  {
    path: '/issues/new',
    name: 'IssueNew',
    component: () => import('@/views/Issues/IssueFormNew.vue'),
  },
  {
    path: '/issues/:issueId',
    name: 'IssueDetail',
    component: () => import('@/views/Issues/IssueDetailView.vue'),
    props: true,
    children: [
      {
        path: '',
        redirect: (to) => ({ name: 'IssueOverview', params: to.params }),
      },
      {
        path: 'overview',
        name: 'IssueOverview',
        component: () => import('@/views/Issues/IssueOverview.vue'),
      },
      {
        path: 'timeline',
        name: 'IssueTimeline',
        component: () => import('@/views/Issues/IssueTimeline.vue'),
      },
      {
        path: 'documents',
        name: 'IssueDocuments',
        component: () => import('@/views/Issues/IssueDocuments.vue'),
      },
      {
        path: 'notes',
        name: 'IssueNotes',
        component: () => import('@/views/Issues/IssueNotes.vue'),
      },
      {
        path: 'events',
        name: 'EventsList',
        component: () => import('@/views/Issues/Events/EventsListView.vue'),
      },
      {
        path: 'events/new',
        name: 'EventNew',
        component: () => import('@/views/Issues/Events/EventFormNew.vue'),
      },
      {
        path: 'events/:eventId',
        name: 'EventDetail',
        component: () => import('@/views/Issues/Events/EventDetailView.vue'),
        props: true,
      },
      {
        path: 'events/:eventId/edit',
        name: 'EventEdit',
        component: () => import('@/views/Issues/Events/EventFormEdit.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/issues/:issueId/edit',
    name: 'IssueEdit',
    component: () => import('@/views/Issues/IssueFormEdit.vue'),
    props: true,
  },

  // Contacts
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('@/views/Contacts/ContactsListView.vue'),
  },
  {
    path: '/contacts/:contactId',
    name: 'ContactDetail',
    component: () => import('@/views/Contacts/ContactDetailView.vue'),
    props: true,
  },

  // Settings
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings/SettingsView.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'SettingsAccount' },
      },
      {
        path: 'account',
        name: 'SettingsAccount',
        component: () => import('@/views/Settings/AccountSettings.vue'),
      },
      {
        path: 'privacy',
        name: 'SettingsPrivacy',
        component: () => import('@/views/Settings/PrivacySettings.vue'),
      },
      {
        path: 'theme',
        name: 'SettingsTheme',
        component: () => import('@/views/Settings/ThemeSettings.vue'),
      },
    ],
  },

  // About
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },

  // Optional routes
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/AnalyticsView.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
  },

  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
