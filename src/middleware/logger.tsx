import * as Redux from 'redux'

export const loggerMiddleware = ({dispatch}: Redux.MiddlewareAPI<any>) =>
  (next: Redux.Dispatch<any>) =>
    (action: any) => {
      console.info(action.type, action);
      return next(action)
    }

export default loggerMiddleware
