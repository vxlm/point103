"use client";


import { BarChartBig, Search, UsersRound } from "lucide-react";
import { Features } from "../features";
import {
  AutomatedBacklogIcon,
  CustomViewsIcon,
  DiscussionIcon,
  IssuesIcon,
  ParentSubIcon,
  WorkflowsIcon,
} from "../icons/features";
import Empty from "../icons/empty";

export const BuildMomentum = () => {
  return (
    <Features color="40,87,255" colorDark="48,58,117">
      <Features.Main
        title={
          <>
            {/* Build momentum
            <br />
            with Cycles */}
            The .103 Difference:
          </>
        }
        image="/gong.webp"
        imageSize="large"
        text=""
      />
      <Features.Grid
        features={[
          {
            icon: Empty,
            title: "Dedicated teams trained to understand the requirements and rigor of your diligence",
            text: "",
          },
          {
            icon: Empty,
            title: "100% Custom recruitment for every request",
            text: "",
          },
          {
            icon: Empty,
            title: "Building end-to-end technology to turn your history of diligences into a long-term moat",
            text: "",
          },
      
        ]}
      />
    </Features>
  );
};
