// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// import { Call } from '@polkadot/types/interfaces';
// import { I18nProps } from '@polkadot/react-components/types';
// import { QueueTxExtrinsicAdd } from '@polkadot/react-components/Status/types';
// import { ApiProps } from '@polkadot/react-api/types';
// import { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import React, { useMemo } from 'react';
// import { Button, Extrinsic, InputAddress, TxButton, TxComponent } from '@polkadot/react-components';
import { Formik } from 'formik';

import { FieldAddress, Extrinsic } from '@polkadot/react-components/experimental';
import { BalanceFree } from '@polkadot/react-query';

import { useTranslation } from './translate';

export default function Selection (): React.ReactElement {
  const { t } = useTranslation();
  const initialValues = useMemo(() => ({
    accountId: '',
    extrinsic: {}
  }), []);

  return (
    <div className='extrinsics--Selection'>
      <Formik
        initialValues={initialValues}
        onSubmit={(): void => {}}
      >
        {({ handleSubmit, values }): React.ReactElement => (
          <form onSubmit={handleSubmit}>
            <FieldAddress
              name='accountId'
              label={t('using the selected account')}
              labelExtra={<BalanceFree label={<label>{t('free balance')}</label>} params={values.accountId} />}
              type='account'
            />
            <Extrinsic
              // defaultValue={apiDefaultTxSudo}
              label={t('submit the following extrinsic')}
              // onChange={this.onChangeExtrinsic}
              // onEnter={this.sendTx}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
// interface Props extends ApiProps, I18nProps {
//   queueExtrinsic: QueueTxExtrinsicAdd;
// }

// interface State {
//   isValid: boolean;
//   isValidUnsigned: boolean;
//   method: Call | null;
//   accountId?: string | null;
// }

// class Selection extends TxComponent<Props, State> {
//   public state: State = {
//     isValid: false,
//     isValidUnsigned: false,
//     method: null
//   };

//   public render (): React.ReactNode {
//     const { apiDefaultTxSudo, t } = this.props;
//     const { isValid, isValidUnsigned, accountId } = this.state;
//     const extrinsic = this.getExtrinsic() || apiDefaultTxSudo;

//     return (
//       <div className='extrinsics--Selection'>
//         <InputAddress
//           label={t('using the selected account')}
//           labelExtra={<BalanceFree label={<label>{t('free balance')}</label>} params={accountId} />}
//           onChange={this.onChangeSender}
//           type='account'
//         />
//         <Extrinsic
//           defaultValue={apiDefaultTxSudo}
//           label={t('submit the following extrinsic')}
//           onChange={this.onChangeExtrinsic}
//           onEnter={this.sendTx}
//         />
//         <Button.Group>
//           <TxButton
//             isBasic
//             isDisabled={!isValidUnsigned}
//             isUnsigned
//             label={t('Submit Unsigned')}
//             icon='sign-in'
//             extrinsic={extrinsic}
//           />
//           <Button.Or />
//           <TxButton
//             accountId={accountId}
//             isDisabled={!isValid}
//             isPrimary
//             label={t('Submit Transaction')}
//             icon='sign-in'
//             extrinsic={extrinsic}
//             ref={this.button}
//           />
//         </Button.Group>
//       </div>
//     );
//   }

//   private nextState (newState: Partial<State>): void {
//     this.setState(
//       (prevState: State): State => {
//         const { method = prevState.method, accountId = prevState.accountId } = newState;
//         const isValid = !!(
//           accountId &&
//           accountId.length &&
//           method
//         );

//         return {
//           method,
//           isValid,
//           isValidUnsigned: !!method,
//           accountId
//         };
//       }
//     );
//   }

//   private onChangeExtrinsic = (method: Call | null = null): void => {
//     this.nextState({ method });
//   }

//   private onChangeSender = (accountId: string | null): void => {
//     this.nextState({ accountId });
//   }

//   private getExtrinsic (): SubmittableExtrinsic | null {
//     const { api } = this.props;
//     const { method } = this.state;

//     if (!method) {
//       return null;
//     }

//     const fn = api.findCall(method.callIndex);

//     return api.tx[fn.section][fn.method](...method.args);
//   }
// }

// export default withMulti(
//   Selection,
//   translate,
//   withApi
// );
