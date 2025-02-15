import axios from 'axios'
import * as Util from '../utils'

const getMethod= (url, config)=> {
    return axios.get(url, config).catch(err=> {
        return { error_code: err.response.status }
    })
}
const deleteMethod= (url, config)=> {
    return axios.delete(url, config).catch(err=> {
        return { error_code: err.response.status }
    })
}
const postMethod= (url, data, config)=> {
    return axios.post(url, data, config).catch(err=> {
        return { error_code: err.response.status }
    })
}

export const getAllPosts= ({ pageNumber, countPerPage })=> {
    return getMethod(`/feed?pageNumber=${pageNumber}&countPerPage=${countPerPage}`)
}
export const getSavedPostIds= ()=> {
    return getMethod('/feed/saved')
}

export const getPost= (id)=> {
    return getMethod(`/feed/${id}`)
}

export const getCategories= ()=> {
    return getMethod('/feed/categories')
}

export const createPost= (feed)=> {
    return postMethod('/feed/add', feed)
}
export const savePost= (feedId)=> {
    return postMethod('/feed/save', {feedId})
}
export const removeSavedPost= (feedId)=> {
    return deleteMethod(`/feed/saved/remove?feedId=${feedId}`, {
        headers: {
            "X-XSRF-TOKEN": Util.getCsrfToken()
        }
    })
}
export const deletePost= (feedId)=> {
    return deleteMethod(`/feed/${feedId}`)
}

export const getLoggedInUser= ()=> {
    return getMethod('/user/me')
}

export const getUser= (id)=> {
    return getMethod(`/user/${id}`)
}

export const login= (token)=> {
    return getMethod('/user/login', {
        headers: {
            Authorization: "Bearer " + JSON.parse(JSON.stringify(token))
        }
    })
}

export const downloadImage= (fileName)=> {
    let config = {
        headers: {
            Accept: 'image/**'
        },
        responseType: 'blob'
      }
    return getMethod('/file/download?fileName='+fileName, config)
}