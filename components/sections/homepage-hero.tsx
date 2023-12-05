import { Button, Highlight } from "../button";
import { Hero, HeroTitle, HeroSubtitle } from "../hero";
import { HeroImage } from "../hero-image";
import { ChevronIcon } from "../icons/chevron";
import { CommandMenu } from "../command-menu";
import { EnjoyIssueTracking } from "./enjoy-issue-tracking";
import classNames from "classnames";
export const HomepageHero = () => (
  <Hero>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0"
      href="/signup"
      variant="secondary"
      size="small"
    >
      <span>Join us as an expert today</span>{" "}
      <Highlight>→</Highlight>
    </Button>
    <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
    .103<br className="hidden md:block select-none" /> 
    Trusted diligence partner
    <br className="hidden md:block select-none" /> <br className="hidden md:block select-none" />
    </HeroTitle>
    <HeroSubtitle className="translate-y-[-8rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
    End-to-end search platform to find 
      <br className="hidden md:block" /> Companies, Competitors and Experts

    </HeroSubtitle>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
      href="/"
      variant="primary"
      size="large"
    >
      <span>Join us as a client</span>
      <Highlight>
        <ChevronIcon />
      </Highlight>
    </Button>
    <HeroImage/>
    <div
        className={classNames(
          "mask-radial-faded pointer-events-none relative z-[-1] my-[-12.8rem] h-[60rem] overflow-hidden",
          "[--color:#7877C6] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4]",
          "after:absolute after:top-1/2 after:-left-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] after:bg-background"
        )}
      >
      
      </div>
    <EnjoyIssueTracking/>
{/* 
    <div className="flex items-center p-8 justify-center w-full">
    <div className="relative flex min-h-[48rem] w-full shrink-0 snap-center flex-col items-center  overflow-hidden rounded-[4.8rem] border border-transparent-white bg-glass-gradient p-8 text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(66.66%-12px)] md:p-14">
          
        <CommandMenu />
          <div className="transition-opacity md:[.opened+&]:opacity-0">
            <p className="mb-4 text-3xl">Search.103</p>
            <p className="text-md text-primary-text">
            Your fastest way to find companies, similar competitors and the right experts
            </p>
          </div>
          </div>
        </div>*/}
  </Hero>
);
