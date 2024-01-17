import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ANIME } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const AddToMyList = ({ animeId, favorite }) => {
    const [isClicked, setIsClicked] = useState(false);

    const [addAnime] = useMutation(ADD_ANIME, {
        refetchQueries: [
            QUERY_ME,
            'Me'
        ],
    });
    const handleClick = async (event) => {
        setTimeout(() => {
            setIsClicked(!isClicked);
        }, 500)

        try {
            await addAnime({
                variables: { animeId: animeId }
            })
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            {(favorite) ? ('') : (<a className={`btn-floating waves-effect waves-light light-blue accent-1 top-left mylist ${isClicked ? 'hidden' : ''}`} onClick={handleClick}><i className="material-icons">bookmark_border</i></a>)}
        </>
    )
};

export default AddToMyList;