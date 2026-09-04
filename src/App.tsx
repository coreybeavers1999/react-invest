import { Outlet } from 'react-router'
import AppSidebar from './components/AppSidebar'
import './App.css'

function App() {
  return (
    <>
      <AppSidebar />

      <section>
        <Outlet />
      </section>
    </>
  )
}

export default App
