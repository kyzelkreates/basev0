/**
 * ============================================================
 * 4P3X Learning & Monitoring Base OS™ — Root App Component
 * Participant PWA + Admin Monitoring Dashboard
 * Powered by 4P3X Intelligent AI — Created by Kyzel Kreates
 * ============================================================
 */
import { RouterProvider } from 'react-router-dom'
import { router }         from './app_Router'
import AuthProvider       from './providers_AuthProvider'
import { useEffect }      from 'react'
import { useConfigStore, useDataStore } from './core_storage'
import { participantService } from './services_careerlink_jobseekerService'
import { loadDemoData }   from './services_careerlink_demoData'

function AppCore() {
  const config     = useConfigStore(s => s.config)
  const dataStore  = useDataStore()

  // On mount: if demo mode is enabled, ensure demo data is seeded
  useEffect(() => {
    if (config.demoModeEnabled) {
      loadDemoData(participantService, dataStore)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <RouterProvider router={router} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppCore />
    </AuthProvider>
  )
}
