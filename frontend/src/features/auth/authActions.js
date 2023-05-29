// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const backendURL = "https://grip.test.gen-tec.net";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { email, password },
        config
      );
      localStorage.setItem("token", data.payload.token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(jwt_decode(data.payload.token)["user"])
      );
      // console.log(localStorage.getItem("token"));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
