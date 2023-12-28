import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import {ProductProvider} from './contexts/ProductContext.jsx'
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback.jsx";

export default function Layout(){
    return (
        
            <ProductProvider>
                <Header />
                    <div className="content">
                        <ErrorBoundary FallbackComponent={Fallback}>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                <Footer />
            </ProductProvider>
        
    )
}