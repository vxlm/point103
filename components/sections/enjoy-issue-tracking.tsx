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
            The .103 Difference
            <br />
        
          </>
        }
        image="/issues.webp"
        text=""
      />

      <Features.Pricing
        features={[
          {
         
            title: "",
            button_txt : "",
            texts: ["Dedicated teams trained to understand the requirements and rigor of your diligence"],
          },
          {
     
            title: "",
            button_txt : "",
            texts: ["100% Custom recruitment for every request"],
          },
          {

            title: "",
            button_txt : "",
            texts: ["Building end-to-end technology to turn your history of diligences into a long-term moat"],
          },
        ]}
      />
    </Features>
  );
};
