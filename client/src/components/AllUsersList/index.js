import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../../utils/queries';
import AnimeCard from '../AnimeCard';

const AllUsersList = ({ users, title }) => {
    if (!users.length) {
        return <h3>No users Yet</h3>;
    }

    return (
        <div>
            {users &&
                users.map(user => (
                    <div key={user._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${user.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {user.username}
                            </Link>
                        </p>
                        <div className="card-body">
                            <ul className='row'>
                                
                            </ul>

                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default AllUsersList;
