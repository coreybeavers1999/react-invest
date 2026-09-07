import './App.css'
import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router'
import AppSidebar from './layouts/Sidebar'
import { PurchaseProvider } from './features/purchase/PurchaseProvider'

function App() {
  return (
    <AppShell
      padding="md"
      navbar={{
        width: { base: 300, sm: 250, md: 300 },
        breakpoint: 'sm',
        collapsed: { desktop: false, mobile: false }
      }}
    >
      <AppShell.Navbar p="sm">
        <AppSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <PurchaseProvider>
          <Outlet />
        </PurchaseProvider>
      </AppShell.Main>

    </AppShell>
  )
}

export default App
