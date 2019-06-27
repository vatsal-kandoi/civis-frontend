export class Error {
  message: string;
  code: string;
  graphQLErrors: Array<any>;

  constructor(options) {
    this.graphQLErrors = options.graphQLErrors;
    if (options.networkError) {
      options = options.networkError;
    }
    if (options.networkErr) {
      options = options.networkErr;
    }
    this.code = options ? options.status || 'default' : 'default';
    this.message = this.retrieveMessage(options);

    try {
      this.code = options.srcElement.code.toString();
    } catch (e) {
      if (options && typeof options.status !== 'undefined') {
        this.code = options.status.toString();
      }
    }

    if (this.code === 'custom') {
      this.message = options.message;
    } else if (this.code && this.code !== '422') {
      this.computeMessageFromCode(this.code, this.message);
    } else if (this.code && this.code === '422') {
      this.message = this.getErrorMessage(options);
    }
  }

  private computeMessageFromCode(code: string = 'default', message?) {
    try {
      this.message = this.getErrorMessage(code, message);
    } catch (e) {
      if (e.name === 'TypeError') {
        if (new RegExp(/^4/).test(code)) {
          this.message = this.getErrorMessage('4xx');
        } else if (new RegExp(/^5/).test(code)) {
          this.message = this.getErrorMessage('5xx');
        }
      } else {
        this.message = 'Something went wrong.';
      }
    }
  }

  getErrorMessage(code, message?) {
    switch (code) {
      case '0':
        return 'Looks like we\'re unable to connect to our servers (or) There might be an issue with your Internet Connection.';
      case '400':
        return 'Something Went Wrong.';
      case '401':
        if (message === 'Invalid, missing or expired token') {
          return 'Your session has expired. Please click below to get logged in again.';
        } else {
          return 'Invalid account or you are not authorised to perform this action.';
        }
      case '404':
        return 'Resource not found';
      case '4xx':
        return 'Something went wrong. Please try again or send us a message through the blue bubble in the bottom right of your screen.';
      case '5xx':
        return 'We are currently experiencing a downtime or major problems in our system.' +
          'Our developers are working on it, please check back with us after a couple of hours.';
      default:
        if (this.graphQLErrors && this.graphQLErrors.length) {
          const msg = this.graphQLErrors[0].message;
          return msg;
        }
        return 'Something went wrong';
    }
  }

  retrieveMessage(err) {
    if (!err) {
      return 'Something went wrong';
    }

    if (err.error && err.error.status && err.error.status.message) {
      return err.error.status.message;
    }

    if (err.error && err.error.message) {
      return err.error.message;
    }

    if (err.error && err.error.error) {
      return err.error.error;
    }

    if (err.message) {
      return err.message;
    }

    if (err.error) {
      return err.error;
    }

    return 'Something went wrong';
  }
}
