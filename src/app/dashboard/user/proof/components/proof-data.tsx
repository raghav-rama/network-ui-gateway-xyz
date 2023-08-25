'use client';
import ExternalLink from '@/components/external-link/external-link';
import PdaCard from '@/components/pda-card/pda-card';
import { datamodel } from '@/locale/en/datamodel';
import { proof as proofLocale } from '@/locale/en/proof';

import { Stack, Divider, Typography } from '@mui/material';

type Props = {
  dataModels: any; // TODO: Add type
};

export default function ProofData({ dataModels }: Props) {
  return (
    <>
      <Typography fontWeight={400} fontSize={24} sx={{ mb: 3 }}>
        {proofLocale.share.data_asset_shared}
      </Typography>
      <Stack divider={<Divider sx={{ mb: 3 }} />}>
        {dataModels.map((dataModel: any) => (
          <Stack key={dataModel.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography fontWeight={600} color="text.secondary">
                {dataModel?.title}
              </Typography>
              <ExternalLink
                text={datamodel.data_model_id}
                href="https://www.google.com"
              />
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
              {dataModel.credentials.map((pda: any) => (
                <PdaCard
                  key={pda.id}
                  dashed
                  href="/dashboard/user/proof"
                  {...pda}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
