import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './pages/themeContext.jsx'
import "./component/style/theme.css"
import "./index.css"
import App from './App.jsx'
import CartProvider from './component/Context/cartContext/cartContext.jsx'
import AuthProvider from './component/Context/authContext/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider >
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>

  </BrowserRouter>
)
