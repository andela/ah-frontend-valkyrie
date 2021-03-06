import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import Sidebar from "./Sidebar";

describe("Test sidebar component", () => {
  const props = {};
  const wrapper = shallow(<Sidebar {...props} />);
  it("Matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
