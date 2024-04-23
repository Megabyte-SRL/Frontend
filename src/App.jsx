import ReservaLayout from "./reservas/layout/ReservaLayout"
import AppRouter from "./router/AppRouter"
import AppTheme from "./theme/AppTheme"


function App() {
  return (
    <AppTheme>
      <ReservaLayout>
        <AppRouter/>
      </ReservaLayout>
    </AppTheme>
  )
}

export default App;
