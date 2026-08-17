import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../layouts/AppShell'
import { AdviceDetailsPage } from '../pages/AdviceDetailsPage'
import { AdvicePage } from '../pages/AdvicePage'
import { ApplicationDetailsPage } from '../pages/ApplicationDetailsPage'
import { ApplicationsPage } from '../pages/ApplicationsPage'
import { CataloguePage } from '../pages/CataloguePage'
import { CatalogueProductPage } from '../pages/CatalogueProductPage'
import { CropDetailsPage } from '../pages/CropDetailsPage'
import { FarmPage } from '../pages/FarmPage'
import { HomePage } from '../pages/HomePage'
import { MorePage } from '../pages/MorePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { NotificationsPage } from '../pages/NotificationsPage'
import { ProductDetailsPage } from '../pages/ProductDetailsPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProfilePage } from '../pages/ProfilePage'
import { PurchaseDetailsPage } from '../pages/PurchaseDetailsPage'
import { PurchasesPage } from '../pages/PurchasesPage'
import { SearchPage } from '../pages/SearchPage'
import { SettingsPage } from '../pages/SettingsPage'
import { SoilReportDetailsPage } from '../pages/SoilReportDetailsPage'
import { SoilReportsPage } from '../pages/SoilReportsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/farm" element={<FarmPage />} />
        <Route path="/farm/crops/:id" element={<CropDetailsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/purchases/:id" element={<PurchaseDetailsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="/soil-reports" element={<SoilReportsPage />} />
        <Route path="/soil-reports/:id" element={<SoilReportDetailsPage />} />
        <Route path="/advice" element={<AdvicePage />} />
        <Route path="/advice/:id" element={<AdviceDetailsPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/catalogue/:id" element={<CatalogueProductPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
