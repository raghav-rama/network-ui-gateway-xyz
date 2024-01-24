'use client';

import { useRouter } from 'next-nprogress-bar';
import { FC } from 'react';

import { GenerateIssueBody } from '@/app/api/generate-issue-session-educational/route';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import BenefitsIcon from '@/components/icons/benefits';
import JoinClickIcon from '@/components/icons/join-click';
import PoolTogetherIcon from '@/components/icons/pool-together';
import { mutations } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { instructionGuide } from '@/locale/en/educational';
import { AuthType, Chain } from '@/services/protocol/types';
import { getWalletFromAuthenticationsByChain } from '@/utils/wallet';
import { useMutation } from '@tanstack/react-query';

import { Stack, SvgIconProps, Typography } from '@mui/material';

import EducationalModalCards from './educational-modal-cards';

type Props = {
  onClose: () => void;
};

export default function EducationalModalContent({ onClose }: Props) {
  const { session } = useGtwSession();
  const router = useRouter();

  const sessionProps: GenerateIssueBody = {
    claim: {
      avatar: session.user.profilePicture ?? '',
      name: session.user.displayName ?? '',
      username: session.user.gatewayId ?? '',
      email: session.user.email ?? '',
      evmWallet: getWalletFromAuthenticationsByChain(
        session?.user?.authentications,
        Chain.Evm
      ),
      solanaWallet: getWalletFromAuthenticationsByChain(
        session?.user?.authentications,
        Chain.Sol
      ),
    },
  };

  const { mutateAsync: onGenerateSession, isLoading } = useMutation({
    mutationKey: [
      mutations.generate_issue_session_educational,
      session.user.id,
    ],
    mutationFn: async () => {
      const response = await fetch('/api/generate-issue-session-educational', {
        method: 'POST',
        body: JSON.stringify(sessionProps),
      });
      const data = await response.json();
      if (data.error || !data.session) {
        console.error('Error to issue PDA', data.error);
        throw new Error('Failed to issue PDA');
      }
      return data;
    },
  });

  const generateSession = async () => {
    const { session } = await onGenerateSession();
    localStorage.setItem('widget-educational-session', session.sessionId);
    onClose();
    router.push(session.url);
  };

  const cards: { title: string; icon: FC<SvgIconProps> }[] = [
    {
      title: instructionGuide.claim_your_first_pda.cards.unlock_benefits,
      icon: BenefitsIcon,
    },
    {
      title: instructionGuide.claim_your_first_pda.cards.join_other_platforms,
      icon: JoinClickIcon,
    },
    {
      title:
        instructionGuide.claim_your_first_pda.cards
          .win_prizes_with_pool_together,
      icon: PoolTogetherIcon,
    },
  ];

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack mt={3} mb={5}>
        <Typography variant="h4" mb={1}>
          {instructionGuide.claim_your_first_pda.title}
        </Typography>
        <Typography variant="body1">
          {instructionGuide.claim_your_first_pda.description}
        </Typography>
      </Stack>
      <Typography mb={3}>
        {instructionGuide.claim_your_first_pda.cards.title}
      </Typography>
      <Stack direction="row" gap={1} mb={5}>
        <EducationalModalCards cards={cards} />
      </Stack>
      <LoadingButton
        variant="contained"
        isLoading={isLoading}
        onClick={generateSession}
      >
        {instructionGuide.claim_your_first_pda.btn_text}
      </LoadingButton>
    </Stack>
  );
}
