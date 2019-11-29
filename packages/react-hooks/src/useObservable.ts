import { useEffect, useState } from 'react';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import echoTransform from '@polkadot/react-api/transform/echo';
import { CallState } from '@polkadot/react-api/types';
import { intervalObservableWithoutComponent, isEqual, triggerChange } from '@polkadot/react-api/util';
import { Options } from '@polkadot/react-api/with/types';

export default function <P, T = {}> (
  observable: Observable<T>,
  {
    callOnResult,
    propName = 'value',
    transform = echoTransform
  }: Pick<Options, 'callOnResult' | 'propName' | 'transform'> = {}
): CallState & {
    [key: string]: P;
  } {
  const [callResult, setCallResult] = useState<P>();
  const [callUpdated, setCallUpdated] = useState<CallState['callUpdated']>(false);
  const [callUpdatedAt, setCallUpdatedAt] = useState<CallState['callUpdatedAt']>(0);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  function triggerUpdate (newCallResult?: P): void {
    try {
      if (isEqual(newCallResult, callResult)) {
        return;
      }

      triggerChange(newCallResult, callOnResult);

      setCallResult(newCallResult);
      setCallUpdated(true);
      setCallUpdatedAt(Date.now());
    } catch (error) {
      console.error({ callOnResult, propName, transform }, error);
    }
  }

  useEffect(() => {
    setSubscriptions([
      observable
        .pipe(
          map(transform),
          catchError((): Observable<any> =>
            of(undefined)
          )
        )
        .subscribe(triggerUpdate),
      intervalObservableWithoutComponent(callUpdated, setCallUpdated, callUpdatedAt)
    ]);

    return (): void => {
      subscriptions.forEach((subscription): void => {
        subscription.unsubscribe();
      });
    };
  }, []);

  return {
    callUpdated,
    callUpdatedAt,
    [propName]: callResult
  };
}
