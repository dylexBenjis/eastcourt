import type { Metadata } from 'next'
import '../globals.css'
import ThemeModeProvider from '../../components/theme-provider'
import ActiveTab_Provider from '../../components/activeTab-provider'
import { Toaster } from '../../components/ui/toaster'
import AuthState_Provider from '../../lib/auth_state'
import NavBar from '../../components/nav_bar'
import Footer from '../../components/footer'
import Edit_listing_Provider from '@/src/components/edit-listing-provider'

export const metadata: Metadata = {
  title: 'eastcourt',
  description: 'A realestate website',
  generator: 'dylexbenji.vercel.app',
}

export default function Eastcourt_admin_Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section>
          <AuthState_Provider>
            <Edit_listing_Provider>
              {children}
            </Edit_listing_Provider>
        </AuthState_Provider>
    </section>
  )
}
