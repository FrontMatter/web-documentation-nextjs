import * as React from 'react';
import { MendableFloatingButton } from '@mendable/search';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Sidebar } from '../Docs/Sidebar';
import { BetaBanner } from './BetaBanner';
import { Footer } from './Footer';
import { GetStarted } from './GetStarted';
import { Header } from './Header';
import { Home } from './Home';
import { Sponsors } from './Sponsors';
import { AiOutlineRobot } from 'react-icons/ai';

export interface IDocsLayoutProps {
  navItems?: PageFrontMatter[];
}

export const DocsLayout: React.FunctionComponent<React.PropsWithChildren<IDocsLayoutProps>> = ({ navItems, children }: React.PropsWithChildren<IDocsLayoutProps>) => {
  const mendableRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={`lg:ml-72 xl:ml-96`}>

      <aside className={`fixed bg-vulcan-600 inset-y-0 left-0 z-40 contents w-72 overflow-y-auto px-6 pt-4 pb-8 lg:block xl:w-96 lg:pr-8 lg:border-r lg:border-vulcan-300`}>
        <div className='ml-auto'>
          <Header navItems={navItems} />
        </div>

        <Home className={`hidden lg:flex h-16`} />

        <Sidebar className={`hidden lg:mt-8 lg:block space-y-8`} items={navItems || []} />
      </aside>

      <div className='relative flex flex-col pt-20 h-full overflow-y-auto'>
        <BetaBanner />

        <main className={`flex-grow`}>
          {children}
        </main>

        <GetStarted />

        <Sponsors />

        <button
          type='button'
          title='Chat with our documentation bot'
          className={`bottom-4 flex flex-col items-center justify-center gap-2 right-8 p-2 fixed z-[100] bg-teal-900 hover:bg-teal-500 text-whisper-500 rounded`}
          onClick={() => {
            if (mendableRef.current) {
              const mendableButton = mendableRef.current.querySelector(`div[aria-label="Logo"]`) as HTMLButtonElement;

              if (mendableButton) {
                mendableButton.click();
              }
            }
          }}>
          <AiOutlineRobot className={`h-8 w-8`} />
          <span>Ask me</span>
        </button>

        <div ref={mendableRef} className='hidden'>
          <MendableFloatingButton
            style={{
              accentColor: "#15C2CB",
              darkMode: true
            }}
            cmdShortcutKey='j'
            floatingButtonStyle={{
              backgroundColor: "transparent",
              color: "transparent"
            }}
            anon_key={process.env.MENDABLE_ANON_KEY ?? ""} />
        </div>

        <Footer />
      </div>
    </div>
  );
};