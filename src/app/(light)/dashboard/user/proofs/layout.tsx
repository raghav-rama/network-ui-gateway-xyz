import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { proofs, helperContent } from '@/locale/en/proof';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/system';

import SandboxAlert from '../../components/alerts/sandbox-alert';

export default function DataProofsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <TitleLayout
        title={proofs.data_proofs}
        subtitle={proofs.data_proofs_subtitle}
        titleId="title-proofs"
      />

      <HelpContentCard
        title={helperContent.title}
        desc={helperContent.desc}
        btnText={helperContent.btnText}
        btnLink={helperContent.btnLink}
      />

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <GTWTabs>
          <GTWTab
            label={common.general.received}
            href={routes.dashboardUserReceivedProofs}
          />
          <GTWTab
            label={common.general.sent}
            href={routes.dashboardUserSentProofs}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
