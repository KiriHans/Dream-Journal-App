import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/Auth.routes"
import { JournalRoutes } from "../journal/routes/Journal.routes"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={ <AuthRoutes />} />
      <Route path="/*" element={ <JournalRoutes />} />
    </Routes>
  )
}

export default AppRouter