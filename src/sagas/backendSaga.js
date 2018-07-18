// import {call, put, takeEvery} from '../node_modules/redux-saga/effects'
import axios from 'axios'
//
// function* fetchData(action) {
//     try {
//         const data = yield call(getData, action.payload.url)
//         yield put({type: "FETCH_SUCCEEDED", data})
//     } catch (error) {
//         yield put({type: "FETCH_FAILED", error})
//     }
// }
//
//
export function getData(url){
    return axios.get(url).then(function (response){
        alert(response)
        return response;
    }).catch((errorResponse) => {
        debugger;
        alert(errorResponse +' from getData')
        throw errorResponse.response;
    })
}

export function postData(url, data){
    return axios.post(url, data, {headers: {'Content-Type': 'application/json',}}).then(function (response){
        alert(response)
        return response;
    }).catch((errorResponse) => {
        alert(errorResponse +' from postData: ' + url + ' body: ' + data)
        throw errorResponse;
    })
}