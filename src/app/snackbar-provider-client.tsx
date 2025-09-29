"use client";

import CustomNotistack from "@/components/notistack";
import { CloseCircleSVG, InfoCircleSVG, TickCircleSVG } from "@/svgs";
import { SnackbarProvider } from "notistack";
import { FC, PropsWithChildren } from "react";

const SnackbarProviderClient: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        success: CustomNotistack,
        error: CustomNotistack,
        warning: CustomNotistack,
        default: CustomNotistack,
        info: CustomNotistack,
      }}
      iconVariant={{
        success: <TickCircleSVG />,
        error: <CloseCircleSVG />,
        warning: <InfoCircleSVG />,
        default: <InfoCircleSVG />,
        info: <InfoCircleSVG />,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarProviderClient;

// import { CloseCircle, TickCircle } from 'iconsax-react';
// import { SnackbarProvider } from 'notistack';
// import { StyledNotistack } from './styled';

// function KNotistack({ children }: { children: React.ReactNode }) {
//   return (
//     <SnackbarProvider
//       maxSnack={3}
//       Components={{
//         success: StyledNotistack,
//         error: StyledNotistack,
//       }}
//       iconVariant={{
//         success: <TickCircle />,
//         error: <CloseCircle />,
//       }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//     >
//       {children}
//     </SnackbarProvider>
//   );
// }

// export default KNotistack;
