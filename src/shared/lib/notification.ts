import {makeAutoObservable} from 'mobx';

import {AlertProps} from 'shared/ui/alert';

export type NotificationReturnValue = {id: number; remove: () => void};

export type NotificationListItem = AlertProps & {id: number};

export type NotificationProps = AlertProps & {
  timeout?: number;
  closable?: boolean;
  onClose?: (n: NotificationReturnValue) => void;
};

export type NotificationTypedProps = Omit<NotificationProps, 'type'>;

export class NotificationsStore {
  list: NotificationListItem[] = [];
  private counter = 1;

  constructor() {
    makeAutoObservable(this);
  }

  private _add(props: AlertProps): NotificationReturnValue {
    const id = this.counter++;

    this.list = [...this.list, {id, ...props}];

    return {id, remove: () => this.remove(id)};
  }

  danger(props: NotificationTypedProps) {
    this.add({...props, type: 'danger'});
  }
  warning(props: NotificationTypedProps) {
    this.add({...props, type: 'warning'});
  }
  success(props: NotificationTypedProps) {
    this.add({...props, type: 'success'});
  }
  info(props: NotificationTypedProps) {
    this.add({...props, type: 'info'});
  }
  error(props: NotificationTypedProps) {
    this.danger(props);
  }

  /**
   * @param timeout time of life, before remove; **default**: 4000;
   * @param type **optional** danger | success | warning | info;
   * @param title alert title;
   * @param content alert body;
   * @param onClose if click close button;
   * @param onClick if click alert;
   * @param closable show close button;
   *
   * @returns `id` and `remove` function;
   *
   * @example
   * ```javascript
   * const notification = notifications.add({
   * 	title: 'Title',
   * 	type: 'danger',
   * 	// ... other props
   *
   * 	onClose: () => notification.remove(),
   * 	// OR
   * 	closable: true
   * })
   * ```
   */
  add({timeout = 4000, closable = false, ...props}: NotificationProps) {
    const notification = this._add({
      ...props,
      onClose: closable || typeof props.onClose === 'function' ? onClose : undefined,
    });
    const timeoutId = timeout && setTimeout(onClose, timeout);

    function onClose() {
      notification.remove();
      props.onClose?.(notification);
      if (timeoutId) clearTimeout(timeoutId);
    }

    return notification;
  }

  remove(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
  }
}

export const notifications = new NotificationsStore();

// @ts-ignore
window.notifications = notifications;
