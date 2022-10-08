import React from "react";
// @ts-ignore
import classesUser from './Users.module.css'
import {NavLink} from "react-router-dom";
// @ts-ignore
import catPicture from '../../pictures/cat.webp'
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}
let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
        let el = user;
        return <div className={classesUser.user}>
            <span>
                <div>
                                    <NavLink to={`/profile/` + el.id}>
                                        <img
                                            src={el.photos.small != null ? el.photos.small : catPicture}
                                            className={classesUser.userPhoto} alt=''/>
                                    </NavLink>
                                    </div>
                                </span>
            <span>
                                <div>
                                    {el.followed
                                        ? <button disabled={followingInProgress.some(id => id === el.id)}
                                                  onClick={() => {
                                                      unfollow(el.id);
                                                  }}>Unfollow</button>
                                        : <button disabled={followingInProgress.some(id => id === el.id)}
                                                  onClick={() => {
                                                      follow(el.id);
                                                  }}>Follow</button>}
                                </div>
                            </span>
            <span>
                                <div>{el.name}</div>
                                <div>{el.status}</div>
                            </span>
        </div>
    }
;
export default User;
