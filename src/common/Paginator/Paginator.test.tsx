import Paginator from "./Paginator";
import React from "react";
import {create} from 'react-test-renderer'

// @ts-ignore
describe("Paginator test", () => {
    // @ts-ignore
    test("", () => {
        const component = create(<Paginator onPageChanged={undefined} totalUsersCount={11} pageSize={1}
                                            portionCount={10}/>);
        const root = component.root;
        let spans = root.findAllByType("span");
        // @ts-ignore
        expect(spans.length).toBe(0);
    })
});
// @ts-ignore
test("Pages count", () => {
    const component = create(<Paginator onPageChanged={undefined} totalUsersCount={11} pageSize={1}
                                        portionCount={10}/>);
    const root = component.root;
    let button = root.findAllByType("button");
    // @ts-ignore
    expect(button.length).toBe(11);
});