import * as types from '../constants/sample-action-define'

export function callApi(remote: any) {
  return { type: types.CALL_API, remote:remote}
}


export function  user_list_init() {
  const response_action = function(data: any){
    return {type: types.INIT_USER_LIST, data: data}
  }

  const data = {}
  return createRequestData( process.env.REQUEST_URL.USER_LIST_INIT, 'JSON', 'GET',  data,  response_action);
}

function createRequestData(url: string, dataType: string, type: string, data: any, response_action: any){
    return { url: url,
             dataType:dataType,
             type:type,
             data:  data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
}
