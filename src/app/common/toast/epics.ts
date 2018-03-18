import { Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import * as PaymentsActionNames from '../../payments/action-names'
import { PaymentsActions } from '../../payments/types'
import * as ToastActionNames from './action-names'
import { FAILED, SEND_FAIL, SEND_SUCCESS, SUCCESS } from './toast-messages'
import { ToastActions } from './types'

const MAX_DELAY: number = 5000

export function hideToastMessageAndBadge(action$: ActionsObservable<ToastActions>, store: Store<any>):
  Observable<any> {
  return action$.ofType(ToastActionNames.SET_MESSAGE_AND_BADGE)
    .switchMap(() => Observable.of({
      type: ToastActionNames.HIDE_MESSAGE_AND_BADGE
    }).delay(MAX_DELAY))
}

export function setToastMessageAndBadgeOnSendSuccess(
  action$: ActionsObservable<PaymentsActions | ToastActions>, store: Store<any>):
  Observable<any> {
  return action$.ofType(PaymentsActionNames.SEND_ECA_SUCCESS)
    .mapTo({
      payload: {
        badge: SUCCESS,
        message: SEND_SUCCESS
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE
    })
}

export function setToastMessageAndBadgeOnSendFail(
  action$: ActionsObservable<PaymentsActions | ToastActions>, store: Store<any>):
  Observable<any> {
  return action$.ofType(PaymentsActionNames.SEND_ECA_FAIL)
    .mapTo({
      payload: {
        badge: FAILED,
        message: SEND_FAIL
      },
      type: ToastActionNames.SET_MESSAGE_AND_BADGE
    })
}