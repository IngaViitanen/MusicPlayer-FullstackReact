import React, { useState, useEffect } from 'react'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constants/apiContants'
import axios from 'axios'


function DeletePlaylist({id}) {
    //const [playlistId, setDelete] = useState([0]);

    // useEffect(() => {
    //     removePlaylist()
    // }, [0])

function removePlaylist() {

    axios({
        method: "DELETE",
        url: API_BASE_URL + "playlist",
        data: { playlistId: id },
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN_NAME),
        },
      }).then((response) => { console.log(response,'playlist response');
    //    onDelete(id)
    });
}
    //render()
    return (
        <button className="btn btn-sm btn-danger alert alert-info" role="alert" aria-pressed="false" autoComplete="off" onClick={removePlaylist}>
        <i className="fa fa-trash"></i>
        </button>
    )
}

// onChange={() => setDelete(playlist - 1)}

export default DeletePlaylist