//next js sends the children prop to root layout.
// to access session in frontend we use useSession()
// to use usesession children must be wrapped by SessionProvider.
// we cant directly wrap the children by SessionProvider in layout.tsx because session provider only works in client component and layout.tsx is a sever component.
// so we need to create a clientcomponent  where we can use session provider and  import it to layout.tsx and wrap by that component.
// hence we solve the problem and obtain the session data.
"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";
const Sessionproviderwrapper: FC<{ children: ReactNode }> = ({ children }) => {
  //FC: Stands for FunctionComponent — a TypeScript type for defining components.
  //and{ children: ReactNode } is The shape of the props this component will receive.
  // ReactNode: A type that represents anything React can render — JSX elements, strings, numbers, arrays, fragments, etc.
  return <SessionProvider>{children}</SessionProvider>;
};
export default Sessionproviderwrapper;
