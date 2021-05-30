import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { REACT_APP_BASE_URL, REACT_APP_VERSION } = process.env;

const GET = async (URL) => {
  try {
    const response = await axios.get(
      REACT_APP_BASE_URL + REACT_APP_VERSION + URL
    );

    // handle success
    if (response.data) {
      return {
        data: response.data,
        error: false,
        errMsg: "",
      };
    } else {
      return {
        data: null,
        error: true,
        errMsg: "",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      errMsg: error,
    };
  }
};

const DELETE = async (URL) => {
  try {
    const response = await axios.delete(
      REACT_APP_BASE_URL + REACT_APP_VERSION + URL
    );

    // handle success
    if (response.data) {
      return {
        data: response.data,
        error: false,
        errMsg: "",
      };
    } else {
      return {
        data: null,
        error: true,
        errMsg: "",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      errMsg: error,
    };
  }
};

const POST = async (URL, data) => {
  try {
    const response = await axios.post(
      REACT_APP_BASE_URL + REACT_APP_VERSION + URL,
      data
    );

    // handle success
    if (response.data) {
      return {
        data: response.data,
        error: false,
        errMsg: "",
      };
    } else {
      return {
        data: null,
        error: true,
        errMsg: "",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      errMsg: error,
    };
  }
};

const PUT = async (URL, data) => {
  try {
    const response = await axios.put(
      REACT_APP_BASE_URL + REACT_APP_VERSION + URL,
      data
    );

    // handle success
    if (response.data) {
      return {
        data: response.data,
        error: false,
        errMsg: "",
      };
    } else {
      return {
        data: null,
        error: true,
        errMsg: "",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      errMsg: error,
    };
  }
};

export default { GET, DELETE, POST, PUT };
