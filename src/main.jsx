import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./component/style/theme.css"
import "./index.css"
import App from './App.jsx'
import CartProvider from './component/Context/cartContext/cartContext.jsx'
import { AuthProvider } from './component/Context/authContext/authContext.jsx'
import { ThemProvider } from './component/Context/themContext/them.jsx'
import { HelmetProvider } from 'react-helmet-async'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider >
      <CartProvider>
        <ThemProvider >
          <HelmetProvider >
            <App />
          </HelmetProvider>
        </ThemProvider>
      </CartProvider>
    </AuthProvider>

  </BrowserRouter>
)
