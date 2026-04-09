import './globals.css';
import { StateProvider } from '@/context/StateContext';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: 'Medicare | Smart Patient Adherence System',
  description: 'AI-powered medication adherence and health monitoring platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </StateProvider>
      </body>
    </html>
  );
}
