import AppRouter from "./router/app.router"
import { AppTheme } from "./theme"


const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}

export default JournalApp