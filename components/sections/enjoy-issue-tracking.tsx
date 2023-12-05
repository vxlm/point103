"use client";

import { Features } from "../features";
import {
  AutomatedBacklogIcon,
  CustomViewsIcon,
  DiscussionIcon,
  IssuesIcon,
  ParentSubIcon,
  WorkflowsIcon,
} from "../icons/features";

export const EnjoyIssueTracking = () => {
  return (
    <Features>
      <Features.Main
        title={
          <>
            Consult .103
            <br />
        
          </>
        }
        image="/issues.webp"
        text="Your partner to meaningful insights."
      />

      <Features.Cards
        features={[
          {
         
            title: "Investors",
            texts: ["Deepen understanding of niche sectors.", "Sectoral trends and company insights" , "Competitive benchmarking" , "Industry key success factors"],
          },
          {
     
            title: "Consultants",
            texts: ["Market trends and key drivers" , "Market and subvertical sizing" , "Key players and competitive benchmark" , "Industry key success factors"],
          },
          {

            title: "Corporations",
            texts: ["B2B customer conversations" , "Test new strategic initiatives" , "Understand a new market or adjacent industry" , "M&A targets and fit"],
          },
        ]}
      />
    </Features>
  );
};
