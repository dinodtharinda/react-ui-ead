// api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8081/invento-hub/";

export const getData = async (url:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

export const postData = async (url:string, requestBody :any) => {
  try {
    console.log(requestBody);
    const response = await axios.post(`${API_BASE_URL}${url}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};


export const putData = async (url: string, requestBody: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${url}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error updating data: ", error);
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    await axios.delete(`${API_BASE_URL}${url}`);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data: ", error);
    throw error;
  }
};

//string cutomerName = SELECT c.firstName FROM Customer c  WHERE c.id=9
