import { CodeIcon, DesktopComputerIcon, DocumentTextIcon, LockClosedIcon, PhotographIcon, SearchIcon } from "@heroicons/react/outline";


export const features =  [
  {
    icon: () => <LockClosedIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_1`,
    description: `feature_description_1`,
  },
  {
    icon: () => <DocumentTextIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_2`,
    description: `feature_description_2`,
  },
  {
    icon: () => <DesktopComputerIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_3`,
    description: `feature_description_3`,
  },
  {
    icon: () => <PhotographIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_4`,
    description: `feature_description_4`,
  },
  {
    icon: () => <SearchIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_5`,
    description: `feature_description_5`,
  },
  {
    icon: () => <CodeIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_6`,
    description: `feature_description_6`,
  }
];