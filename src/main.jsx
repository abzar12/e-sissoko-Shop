import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './pages/themeContext.jsx'
import "./component/style/theme.css"
import "./index.css"
import App from './App.jsx'
import cartProvider from './component/Context/cartContext/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
        <App />
    </ThemeProvider>
  </BrowserRouter>
)
