import { CodeBracketIcon, ComputerDesktopIcon, DocumentTextIcon, LockClosedIcon, PhoneIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export const features = [
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
    icon: () => <ComputerDesktopIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_3`,
    description: `feature_description_3`,
  },
  {
    icon: () => <PhoneIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_4`,
    description: `feature_description_4`,
  },
  {
    icon: () => <MagnifyingGlassIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_5`,
    description: `feature_description_5`,
  },
  {
    icon: () => <CodeBracketIcon className="absolute h-6 w-6 text-teal-800" aria-hidden="true" />,
    name: `feature_title_6`,
    description: `feature_description_6`,
  }
];