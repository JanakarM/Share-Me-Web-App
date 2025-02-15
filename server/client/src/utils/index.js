import jwt_decode from 'jwt-decode'

export const setAuthToken = (token) => {
    document.cookie = `image_share_token=${token}`
}
export const getAuthToken = () => {
    const cookie = document.cookie
    const val = cookie.split("; ").find(val => {
        return val.indexOf("image_share_token=") !== -1
    })?.split("=")[1]
    return val === "undefined" ? undefined : val
}
export const getCsrfToken = () => {
    const cookie = document.cookie
    const val = cookie.split("; ").find(val => {
        return val.indexOf("XSRF-TOKEN=") !== -1
    })?.split("=")[1]
    return val === "undefined" ? undefined : val
}
export const getUserFromToken = (token) => {
    return jwt_decode(token)
}
export const checkObjectExistenceByKey= (arr, obj, key)=> {

}
export const distinctUnionOfObjects= (arr_of_objects_1, arr_of_objects_2)=> {
    const result_arr= []
    arr_of_objects_1.forEach(e=> {
        if(result_arr.filter(o=> o.id == e.id).length == 0){
            result_arr.push(e)
        }
    })
    arr_of_objects_2.forEach(e=> {
        if(result_arr.filter(o=> o.id == e.id).length == 0){
            result_arr.push(e)
        }
    })
    return result_arr;
}