import React, { type ReactNode } from "react";

interface Props {
  title: string;
  subTitle?: string | ReactNode | JSX.Element;
}

const PageTitle = ({ title, subTitle }: Props) => {
  return (
    <div className="mb-6 flex flex-col">
      <h3 className="text-2xl">{title}</h3>
      {typeof subTitle === "string" ? (
        <>
          <h6 className="text-muted-foreground">{subTitle}</h6>
        </>
      ) : (
        <>{subTitle}</>
      )}
    </div>
  );
};

export default PageTitle;
