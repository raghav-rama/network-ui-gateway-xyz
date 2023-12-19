import { Metadata } from 'next';

import { pageWithBackgroundColor } from '@/components/page-with-full-background';

import { Stack } from '@mui/material';

import WalletHero from '../../features/wallet/hero/hero';
import TransactionsSection from '../../features/wallet/transactions-section/transactions-section';

export const metadata: Metadata = {
  title: 'User Wallet - Gateway Network',
};

export default function UserWallet() {
  return (
    <Stack
      sx={{
        ...pageWithBackgroundColor,
      }}
    >
      <WalletHero />
      <TransactionsSection />
    </Stack>
  );
}
