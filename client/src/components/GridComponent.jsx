import React from "react";

export const GridComponent = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-2">
      {children}
    </div>
  );
};
