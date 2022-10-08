import React, {useState} from "react";
// @ts-ignore
import classesUser from "../../Components/Users/Users.module.css"
// @ts-ignore
import pageClass from "./Paginator.module.css"

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage?: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number,
    portionCount: number
}

let Paginator: React.FC<PropsType> = (props) => {
        let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
        let pages: Array<number> = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        let portionSize = 10;
        let portionCount = Math.ceil(pagesCount / portionSize);
        let [portionNumber, setPortionNumber] = useState<number | null>(null);

        if (portionNumber === null) {
            portionNumber = 1;
        }


        let leftPositionNumber = (portionNumber - 1) * portionSize + 1;
        let rightPositionNumber = portionNumber * portionSize;
        return <div>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}className={pageClass.button}>PREV</button>}
            {pages.filter(p => p >= leftPositionNumber && p <= rightPositionNumber).map(p => {
                return <button className={classesUser.selectedPage}
                               key={p}
                               onClick={(e) => {
                                   props.onPageChanged(p)
                               }}>{p}</button>
            })}
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }} className={pageClass.button}>NEXT</button>}
        </div>


    }
;
export default Paginator;
