import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
  test("Status loaded in component", () => {
    const component = create(<ProfileStatus status='ToTo'/>);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('ToTo');
  });
});

