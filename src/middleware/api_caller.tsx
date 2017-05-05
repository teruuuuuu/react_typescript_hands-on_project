import * as Redux from 'redux';
import {CALL_API} from '../constants/sample-action-define';
import * as jQuery      from 'jquery';

function remoteService(next: Redux.Dispatch<any>, remote: any){
  jQuery.ajax({
    url: remote.url,
    dataType: remote.dataType,
    type: remote.type,
    data: remote.data,
    cache: false,
    scriptCharset: 'utf-8',
  }).done(function(data){
    const new_action = remote.response_action(data)
    if(new_action.type == CALL_API){
      remoteService(next, new_action.remote)
    }else{
      next(new_action)
    }
  }).fail(function(data){
    console.info(data)
  })
}

export const api_caller = ({dispatch}: Redux.MiddlewareAPI<any>) =>
  (next: Redux.Dispatch<any>) =>
    (action: any) => {
      if(action.type == CALL_API){
        remoteService(next, action.remote)
      }else{
        next(action)
      }
    }
export default api_caller
