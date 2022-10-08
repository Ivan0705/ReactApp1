import {create} from 'react-test-renderer'
import React from "react";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("", () => {
        const componet = create(<ProfileStatus status="Hello"/>);
        const instance = componet.getInstance();
        expect(instance.state.status).toBe("Hello");
    });
    test("After creation span ", () => {
        const componet = create(<ProfileStatus status="Hello"/>);
        const root = componet.root;
        let span = root.findByType("span");
        expect(span.length).toBe(undefined);
    });

    test("After creation span ", () => {
        const componet = create(<ProfileStatus status="Hello"/>);
        const root = componet.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("After creation input ", () => {
        const componet = create(<ProfileStatus status="Hello"/>);
        const root = componet.root;

        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });

    test("After creation input ", () => {
        const componet = create(<ProfileStatus status="Hello"/>);
        const root = componet.root;
        let span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("Hello");
    });

    test("Callback should be called ", () => {
        const mockCallback = jest.fn();
        const componet = create(<ProfileStatus status="Hello" updateStatus={mockCallback}/>);
        const instance = componet.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});