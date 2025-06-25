import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description, imageSrc }) => {
  return (
    <div className="bg-white border-8 border-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 lg:h-52">
        <Image
          src={imageSrc}
          alt={`Step ${stepNumber}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[#3499FF] font-extrabold text-xl lg:text-2xl mb-3">
          Step {stepNumber}
        </h3>
        <h4 className="text-black font-semibold text-lg lg:text-xl mb-2">
          {title}
        </h4>
        <p className="text-gray-500 text-sm lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      title: "Choose a training program",
      description: "Find services adapted to your needs",
      imageSrc: "/images/step1.png"
    },
    {
      stepNumber: 2,
      title: "Register and attend classes",
      description: "Find services adapted to your needs",
      imageSrc: "/images/step2.png"
    }
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-72 bottom-0 w-[656px] h-[382px] bg-gradient-to-br from-[rgba(44,131,202,0.35)] to-[rgba(0,80,114,0.35)] blur-[58px]" />
        <div className="absolute -right-40 top-32 w-[540px] h-[292px] bg-gradient-to-br from-[rgba(44,131,202,0.35)] to-[rgba(0,80,114,0.35)] blur-[58px] rotate-[168deg]" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-6rem)] py-12 lg:py-20">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00425E] leading-tight">
                Estimate your Loan eligibility instantly
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#597489] font-medium leading-relaxed">
                Get a personalized loan estimate based on your income and expenses — 
                in under 2 minutes, without any commitment
              </p>
            </div>
            
            <Link
              href="/start"
              className="inline-flex bg-[#8FC920] text-white font-bold text-lg lg:text-xl px-8 lg:px-10 py-3 lg:py-3.5 rounded-lg hover:bg-[#7FB519] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start now
            </Link>
          </div>

          {/* Right Content - Steps */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {steps.map((step) => (
              <StepCard key={step.stepNumber} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};