import * as React from 'react';
import { PageFrontMatter } from '../../models/PageFrontMatter';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Sidebar } from '../Docs/Sidebar';

export interface IMobileMenuProps {
  navItems?: PageFrontMatter[];
}

export const MobileMenu: React.FunctionComponent<IMobileMenuProps> = ({ navItems }: React.PropsWithChildren<IMobileMenuProps>) => {

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return (
    <Popover className="relative bg-vulcan-200">
      <Popover.Button className="bg-vulcan-200 p-2 inline-flex items-center justify-center text-whisper-500 hover:text-whisper-600 hover:bg-vulcan-300 focus:outline-none">
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="h-full fixed z-30 top-1 right-1 bottom-1 left-1 lg:hidden"
        >
          <div className="relative rounded-lg h-full ring-1 ring-vulcan-900 ring-opacity-5 bg-vulcan-200 overflow-auto">
            <div className="pt-5 pb-6 px-5">
              <div className="fixed left-2 right-2 top-1 z-50">
                <div className="rounded-lg w-full h-full px-4 py-2 bg-vulcan-200">
                  <Popover.Button className="bg-vulcan-200 inline-flex items-center justify-center text-whisper-500 hover:text-whisper-600 hover:bg-vulcan-300 focus:outline-none">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="mt-6">
                <Sidebar items={navItems} />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};