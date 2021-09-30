import React, { useState } from 'react'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constants/apiContants'
import axios from 'axios'
//import ShowPlaylist from './ShowPlaylist'


function DeletePlaylist({id}) {
//const [playlistId, setPlaylistId] = useState();

function removePlaylist() {

    // let queryPl = {
    //     playlistId: playlistId.id
    // }

    // axios.delete(
    //     API_BASE_URL + `playlist`,

    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
    //             withCredentials: true 
    //           }
    //     },
    //      { id: playlistId }
    // )

    axios({
        method: "DELETE",
        url: API_BASE_URL + "playlist",
        data: { playlistId: id },
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN_NAME),
        },
      }).then((response) => {
        console.log(response,'playlist response');
      });
  
    
       
    // .then(function(response) {
    //     //let id = response.data
    //     console.log(playlistId)
    //     console.log('response', response)
    //     console.log("Deleted: ", response.data);
        
    // })
    // .catch(function (error) {
    //     console.log("Deletion failed with error:" + error);
    // });
}

    return (
        <button className="btn btn-sm btn-danger" onClick={removePlaylist} >
        <i className="fa fa-trash"></i>
        </button>
    )
}

export default DeletePlaylist
