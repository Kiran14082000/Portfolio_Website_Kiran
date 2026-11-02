import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Kiran Gobi Manivannan | Data Science & AI/ML', description: 'Portfolio of Kiran Gobi Manivannan — Data Science, Machine Learning, NLP and Generative AI.', metadataBase: new URL('https://example.com'), openGraph: { title: 'Kiran Gobi Manivannan | Data Science & AI/ML', description: 'Building useful systems with data, machine learning and AI.' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
