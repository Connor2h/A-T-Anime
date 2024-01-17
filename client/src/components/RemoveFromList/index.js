import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_ANIME } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const RemoveFromList = ({ animeId }) => {
    const [isClicked, setIsClicked] = useState(false);

    const [removeAnime] = useMutation(REMOVE_ANIME, {
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
            await removeAnime({
                variables: { animeId: animeId }
            })
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <a className={`btn-floating waves-effect waves-light red accent-4 top-right mylist ${isClicked ? 'hidden' : ''}`} onClick={handleClick}><i className="material-icons text-align-center">delete_forever</i></a>
        </>
    )
};

export default RemoveFromList;