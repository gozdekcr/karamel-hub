import { useTranslation } from 'react-i18next'

// Placeholder until the Home cards arrive (P1-12, Phase 2).
export function HomePage() {
  const { t } = useTranslation('home')
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </main>
  )
}
