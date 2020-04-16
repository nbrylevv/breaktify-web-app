export class Notifications {

  constructor() {
    this.currentNotification = null;
  }

  get hasBrowserSupport() {
    return "Notification" in window;
  }

  get hasPermission() {
    return Notification.permission === 'granted';
  }

  get permissionStatus() {
    return Notification.permission;
  }

  requestPermission(callback) {
    Notification.requestPermission().then((permission) => {
      if (callback && typeof callback === 'function') {
        callback(permission);
      }
    });
  }

  create(text, options) {
    console.log('create', text);
    if (this.hasPermission) {
      this.close();
      this.currentNotification = new Notification(text, options || void 0);
      this.currentNotification.onclick = () => {
        this.close();
      };
    }
  }

  close() {
    if (this.currentNotification) {
      this.currentNotification.close();
      this.currentNotification = null;
    }
  }
}
