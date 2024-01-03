import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import {ProductProvider} from './contexts/ProductContext.jsx'
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./contexts/UserContext.jsx";

export default function Layout(){
    return (
        <UserProvider>
            <ProductProvider>
                <Header />
                    <div className="content">
                        <ErrorBoundary FallbackComponent={Fallback}>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                <Footer />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ProductProvider>
        </UserProvider>
    )
}