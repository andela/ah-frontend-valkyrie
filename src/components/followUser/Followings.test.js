import React from "react";
import { mount, shallow } from "enzyme";
import { Following, mapStateToProps, imageShow } from "./Followings";
import avatar from "../../assets/images/img_avatar.png";

const props = {
  getFollowing: jest.fn(),
  Username: "",
  Email: "",
  Bio: ""
};

const initialState = {
  follow: {
    data: [
      {
        username: "farooq",
        email: "",
        bio: "",
        image: ""
      }
    ]
  },
  followingData: []
};

describe("test following view", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Following {...props} />);
    wrapper.instance().componentDidMount;
  });
  console.log(wrapper);
  it("renders following page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("receives props", () => {
    wrapper.setProps({ followingData: [] });
    expect(initialState.followingData).toEqual([]);
  });
  it("maps state to props", () => {
    expect(mapStateToProps(initialState).following[0].username).toEqual(
      "farooq"
    );
  });
  it("test image display", () => {
    expect(imageShow("")).toEqual(avatar);
    expect(imageShow("image_url")).toEqual("image_url");
  });
});
