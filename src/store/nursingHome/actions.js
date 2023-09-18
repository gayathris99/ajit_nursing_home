import axios from "axios";
export async function makeAppointment({ commit, dispatch }, payload) {
  try {
    const data = await axios.post(
      `${process.env.BASE_URL}/customer/appointments`,
      payload
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getReviews({ commit, dispatch }) {
  try {
    const data = await axios.get(
      `${process.env.BASE_URL}/customer/reviews`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getFAQs({ commit, dispatch }) {
  try {
    const data = await axios.get(
      `${process.env.BASE_URL}/faq`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getDoctors({ commit, dispatch }) {
  try {
    const data = await axios.get(
      `${process.env.BASE_URL}/doctors`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getAllTabs({ commit, dispatch }) {
  try {
    const data = await axios.get(
     `${process.env.BASE_URL}/popularblogs`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getBlog({ commit, dispatch }, { blogId }) {
  try {
    const data = await axios.get(
      `https://anh.foxgloveteam.com/api/v2/pages/${blogId}/?site=anh-cms.foxgloveteam`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getBlogFAQ({ commit, dispatch }, { blogId }) {
  try {
    const data = await axios.get(
      `${process.env.BASE_URL}/faq/${blogId}`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getUserDetails({ commit, dispatch }, { accessToken }) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    const data = await axios.get(
      'https://anh.foxgloveteam.com/self/userdetails',
      config
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function registerUser({ commit, dispatch }, payload) {
  try {
    const data = await axios.post(
      'https://anh.foxgloveteam.com/self/register',
      payload
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
