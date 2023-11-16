import { transaction_actions } from '@/locale/en/transaction';
import { FinancialTransactionAction } from '@/services/protocol/types';

export default function ActionDetail({
  action,
}: {
  action: FinancialTransactionAction;
}) {
  const getDetail = (): string => {
    switch (action) {
      case FinancialTransactionAction.IssuerEarnings:
        return transaction_actions.in.pda_revenue;
      case FinancialTransactionAction.MoneyDeposit:
        return transaction_actions.in.deposit;
      case FinancialTransactionAction.MoneyWithdraw:
        return transaction_actions.out.withdraw;
      case FinancialTransactionAction.ProofCreate:
        return transaction_actions.out.proof_share;
      case FinancialTransactionAction.PdaIssuance:
        return transaction_actions.out.pda_issuance;
      case FinancialTransactionAction.PdaUpdate:
        return transaction_actions.out.pda_update;
      case FinancialTransactionAction.PdaStatusChange:
        return transaction_actions.out.pda_status_change;
      case FinancialTransactionAction.DatamodelCreate:
        return transaction_actions.out.data_model;
      case FinancialTransactionAction.RequestTemplateCreate:
        return transaction_actions.out.data_request;
      default:
        return action;
    }
  };
  return <>{getDetail()}</>;
}
