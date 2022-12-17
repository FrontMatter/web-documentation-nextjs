import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { createContext, Fragment, useContext, useState } from 'react';
import { Header } from '../Page/Header';
import create from 'zustand';
import { GlobalNavigation } from './GlobalNavigation';
import { SocialNavigation } from './SocialNavigation';
import { DocsNavigation } from './DocsNavigation';
import { Divider } from './Divider';
import { PageFrontMatter } from '../../models/PageFrontMatter';

export interface IMobileNavigationProps {
  navItems?: PageFrontMatter[];
}

const IsInsideMobileNavigationContext = createContext(false)

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create<{ isOpen: boolean, toggle: () => void, close: () => void}>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state: { isOpen: boolean }) => ({ isOpen: !state.isOpen })),
}))

export const MobileNavigation: React.FunctionComponent<IMobileNavigationProps> = ({ navItems }: React.PropsWithChildren<IMobileNavigationProps>) => {
  let { isOpen, toggle, close } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation();

  let ToggleIcon = isOpen ? XIcon : MenuIcon;

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-teal-500"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <ToggleIcon className="w-full stroke-vulcan-900 dark:stroke-white" />
      </button>

      {!isInsideMobileNavigation && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog onClose={close} className="fixed inset-0 z-50 lg:hidden">
            <Transition.Child
              as={Fragment}
              enter="duration-300 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-200 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 top-16 bg-vulcan-500/20 backdrop-blur-sm" />
            </Transition.Child>

            <Dialog.Panel>
              <Transition.Child
                as={Fragment}
                enter="duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Header />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-500 ease-in-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="duration-500 ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div
                  className="fixed right-0 top-16 bottom-0 w-full overflow-y-auto bg-vulcan-500 px-4 pt-6 pb-4 shadow-lg shadow-vulcan-900/10 ring-1 ring-vulcan-900/7.5 min-[416px]:max-w-sm sm:px-6 sm:pb-10"
                >
                  <GlobalNavigation
                    className='block md:hidden'
                    listClassName='flex flex-col gap-2' />

                  {
                    navItems && navItems.length > 0 && (
                      <>
                        <Divider className={`block md:hidden`} />

                        <DocsNavigation navItems={navItems} />
                      </>
                    )
                  }

                  <Divider className={`block md:hidden`} />

                  <SocialNavigation />
                </div>
              </Transition.Child>
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      )}
    </IsInsideMobileNavigationContext.Provider>
  );
};