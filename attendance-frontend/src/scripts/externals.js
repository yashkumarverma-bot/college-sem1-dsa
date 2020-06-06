import axios from "axios";
import config from "./config";

class Externals {
  static async externalLoadAll() {
    try {
      const response = await axios.get(
        `${config.host}/externals/list/sessions`
      );

      return response.data.payload;
    } catch (err) {
      return err.response.data;
    }
  }
}

export const getAllSessions = Externals.getAllSessions;
