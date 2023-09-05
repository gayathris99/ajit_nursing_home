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
export async function getAllBlogs({ commit, dispatch }) {
  try {
    const data = await axios.get(
     'https://anh.foxgloveteam.com/api/v2/pages/?type=cms_dashboard.BlogPage&fields=tag%2Cdate%2Cintro%2Cimage&site=anh-cms.foxgloveteam'
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getAllNews({ commit, dispatch }) {
  try {
    const data = await axios.get(
     'https://anh.foxgloveteam.com/api/v2/pages/?type=cms_dashboard.NewsArticlePage&fields=date%2Cintro%2Cimage&site=anh-cms.foxgloveteam'
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
export async function getBlog({ commit, dispatch }, { blogId }) {
  try {
    const data = await axios.get(
      `https://anh.foxgloveteam.com/api/v2/pages/${blogId}/`
    );
    return data;
  } catch (error) {
    throw (error)
  }
}
