// api.js

import axios from "axios";

export const getData = async (url: string) => {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

export const postData = async (url: string, requestBody: any) => {
  try {
    console.log(requestBody);
    const response = await axios.post(`${url}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};


export const postFormData = async (url: string, requestBody: any) => {
  try {
    const formData = new FormData();

    // Iterate over the requestBody object and append each key-value pair to the formData
    for (const key in requestBody) {
      formData.append(key, requestBody[key]);
    }

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting data: ", error);
    throw error;
  }
};

export const putData = async (url: string, requestBody: any) => {
  try {
    const response = await axios.put(`${url}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error updating data: ", error);
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    await axios.delete(`${url}`);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data: ", error);
    throw error;
  }
};

//string cutomerName = SELECT c.firstName FROM Customer c  WHERE c.id=9

