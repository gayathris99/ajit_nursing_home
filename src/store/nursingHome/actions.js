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
