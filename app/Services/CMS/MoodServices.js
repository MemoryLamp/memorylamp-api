const Mood = use("App/Models/Mood");

class MoodServices {
  async getAllMoods() {
    return await Mood.all();
  }

  async createMood({ data }) {
    const { name, description } = data;
    const mood = new Mood();
    mood.name = name;
    mood.description = description;

    return await mood.save();
  }

  async updateMood({ id, data }) {
    return await Mood.query().where("id", id).update(data);
  }
}

module.exports = MoodServices;
