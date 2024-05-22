import { Dialog } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Modal } from "../components/modal/Modal";
import { Extension } from "./extension";
import { FaXTwitter } from "react-icons/fa6";
import { SiDiscord, SiVisualstudiocode } from "react-icons/si";

export const navigation = {
  main: [
    { name: 'Docs', title: 'Documentation', href: '/docs' },
    { name: 'Community', title: 'Community', href: '/community' },
    { name: 'Changelog', title: 'Changelog', href: '/updates' },
    // { name: 'SWAG', href: '/swag' },
  ],
  footer: [
    { name: 'Showcase', title: 'Showcase', href: '/showcase' },
  ],
  sponsor: {
    name: 'Become a sponsor',
    title: 'Become a sponsor, and get mentioned',
    href: Extension.sponsorLink,
    icon: ({ btnClassName, className, title, ...rest }: any) => {
      const [open, setOpen] = useState(false);

      const onSponsorClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setOpen(true);
      };

      return (
        <>
          <button type="button" className={`${btnClassName || "group flex items-center"}`} onClick={onSponsorClick}>
            <span className="mr-2 group-hover:text-rose-500">{title || "Sponsor"}</span>
            <HeartIcon className={`${className} group-hover:text-rose-500 group-hover:fill-current`} {...rest} />
          </button>

          {
            open && (
              <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="relative">
                  <div className="hidden sm:block absolute top-0 right-0">
                    <button
                      type="button"
                      className="bg-vulcan-50 rounded-md text-whisper-900 hover:text-whisper-300 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-vulcan-300 bg-opacity-60">
                    <HeartIcon className="h-6 w-6 text-rose-900 fill-current" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-whisper-900">
                      Become a sponsor
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-whisper-500">
                        It is great to see you want to sponsor us. We have a couple of ways to do this. Please select the one you prefer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 space-y-4">
                  <a
                    className="inline-flex justify-center w-full px-4 py-2 bg-whisper-600 text-base font-medium text-vulcan-500 hover:bg-rose-900 hover:text-whisper-500  focus:outline-none sm:text-sm rounded"
                    onClick={() => setOpen(false)}
                    href={Extension.sponsorLink}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                  >
                    GitHub Sponsor
                  </a>
                  <a
                    className="inline-flex justify-center w-full px-4 py-2 bg-whisper-600 text-base font-medium text-vulcan-500 hover:bg-rose-900 hover:text-whisper-500 focus:outline-none sm:text-sm rounded"
                    onClick={() => setOpen(false)}
                    href={Extension.sponsorOpenCollective}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                  >
                    Open Collective
                  </a>
                  <a
                    className="inline-flex justify-center w-full px-4 py-2 bg-whisper-600 text-base font-medium text-vulcan-500 hover:bg-rose-900 hover:text-whisper-500 focus:outline-none sm:text-sm rounded"
                    onClick={() => setOpen(false)}
                    href={Extension.sponsorCoffee}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                  >
                    Buy us a coffee or LEGO
                  </a>
                </div>
              </Modal>
            )
          }
        </>
      );
    }
  },
  social: [
    {
      name: 'GitHub',
      title: 'Check out our GitHub repository',
      href: Extension.githubLink,
      blank: true,
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'Visual Studio Marketplace',
      title: 'Checkout the extension on Visual Studio Marketplace',
      href: Extension.reviewLink,
      blank: true,
      icon: ({ className, ...rest }: any) => (
        <SiVisualstudiocode className={`${className} group-hover:fill-current`} {...rest} />
      )
    },
    {
      name: 'Twitter',
      title: 'Follow us on Twitter',
      href: Extension.twitter,
      blank: true,
      icon: ({ className, ...rest }: any) => (
        <FaXTwitter className={`${className} group-hover:fill-current`} {...rest} />
      )
    },
    {
      name: 'Discord',
      title: 'Join us on Discord',
      href: Extension.discord,
      blank: true,
      icon: ({ className, ...rest }: any) => (
        <SiDiscord className={`${className} group-hover:fill-current`} {...rest} />
      )
    }
  ]
};
