"use strict";
const MoodServices = use("App/Services/MoodServices");
const CustomException = use("App/Exceptions/CustomException");

class MoodController {
  constructor() {
    this.moodServices = new MoodServices();
  }

  async getAllMoods({ response }) {
    try {
      const data = await this.moodServices.getAllMoods();

      response.status(200).json({
        message: "Successfuly Get All Moods",
        data: data,
      });
    } catch (err) {
      const { message } = err;
      throw new CustomException(message, "Internal Server Error", 500);
    }
  }

  async createMood({ request, response }) {
    try {
      const req = request.post();
      const data = await this.moodServices.createMood({ data: req.data });

      response.status(201).json({
        message: "Successfuly Created Mood",
        dat: data,
      });
    } catch (err) {
      const { message } = err;
      throw new CustomException(message, "Internal Server Error", 500);
    }
  }

  async updateMood({ request, response, params: { id } }) {
    try {
      const req = request.post();
      const data = await this.moodServices.updateMood({
        id: id,
        data: req.data,
      });

      response.status(200).json({
        message: "Successfuly Updated Mood",
        data: data,
      });
    } catch (err) {
      const { message } = err;
      throw new CustomException(message, "Internal Server Error", 500);
    }
  }
}

module.exports = MoodController;
