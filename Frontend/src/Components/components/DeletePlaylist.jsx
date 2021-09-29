import React from 'react'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constants/apiContants'
import axios from 'axios'


function DeletePlaylist(onDelete) {

function removePlaylist() {

    //let id = id

    axios.delete(
        API_BASE_URL + `playlist`,

        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
                withCredentials: true 
              }
        },
        {data: { id: 67 }}
    )
    
       
    .then(function(response) {
        let id = response.data
        console.log('response', response)
        console.log("Deleted: "+ response.data);
        onDelete(id)
    })
    .catch(function (error) {
        console.log("Deletion failed with error:" + error);
    });
    console.log('deleted')
}

    return (
        <button className="btn btn-sm btn-danger" onClick={removePlaylist}>
                            <i className="fa fa-trash"></i>
                          </button>
    )
}

export default DeletePlaylist
