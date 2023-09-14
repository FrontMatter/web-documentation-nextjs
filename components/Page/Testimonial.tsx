import * as React from 'react';
import { Review } from '../../models';
import { StarIcon } from '@heroicons/react/24/solid';
import { format, parseISO } from 'date-fns';

export interface ITestimonialProps {
  reviews: Review[];
}

export const Testimonial: React.FunctionComponent<ITestimonialProps> = ({
  reviews
}: React.PropsWithChildren<ITestimonialProps>) => {

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-vulcan-500">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl tracking-tight font-extrabold sm:leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-700">What people are saying</h2>
          <p className="mt-4 text-lg text-whisper-700 space-y-4">
            Explore reviews from Front Matter CMS users
          </p>
        </div>
        <div className="mt-12 grid lg:mb-12 lg:grid-cols-2 bg-vulcan-400">
          {reviews.map((review, index) => (
            <figure key={index} className={`flex flex-col justify-center items-center p-8 text-center border-b border-vulcan-200 md:p-12 ${index % 2 === 0 ? "lg:border-r" : ""} ${index > 3 ? "lg:border-b-0" : ""}`}>
              <div className={`stars mb-4 flex space-x-1`}>
                {
                  review.rating && [...Array(review.rating)].map((_, index) => (
                    <StarIcon key={index} className='w-5 h-5 text-yellow-500' />
                  ))
                }
              </div>

              <blockquote className="mx-auto mb-4 max-w-2xl text-whisper-100">
                <p className="my-4">&quot;{review.text}&quot;</p>
              </blockquote>

              <figcaption className="flex justify-center items-center space-x-3">
                <img className="w-9 h-9 rounded-full" src={`https://marketplace.visualstudio.com/avatar?userid=${review.userId}`} alt="profile picture" />
                <div className="space-y-0.5 font-medium text-whisper-300 text-left">
                  <div>{review.userDisplayName}</div>
                  <div className="text-xs text-whisper-900">{format(parseISO(review.updatedDate), "MM/dd/yyyy")}</div>
                </div>
              </figcaption>
            </figure >
          ))}
        </div >
      </div >
    </section >
  );
};