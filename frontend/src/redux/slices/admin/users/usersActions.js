import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

export const fetchUsers = createAsyncThunk("users/fetchData", async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  const response = await axiosInstance.get(`user`, config);

  return response.data.payload;
});

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id,
      },
    };
    const response = await axiosInstance.get(`user`, config);

    return response.data.payload.data[0];
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (
    { id, firstName, lastName, gender, phone, location },
    { getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id,
      },
    };
    const response = await axiosInstance.put(
      `user`,
      {
        first_name: firstName,
        last_name: lastName,
        gender: gender[0].toLowerCase(),
        phone,
        location,
      },
      config
    );

    return response.data.payload;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { getState, dispatch }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id,
      },
    };
    const response = await axiosInstance.delete(`user`, config);

    // Dispatch the fetchUsers action after deleteUser is successful
    dispatch(fetchUsers(token));

    return response.data.payload;
  }
);
