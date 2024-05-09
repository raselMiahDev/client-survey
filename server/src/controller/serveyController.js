const ServeyModel = require("../models/surveyModel");

exports.CreateServey = async (req, res) => {
  try {
    const {
      full_name,
      factory_name,
      timely_manner,
      expected_timeline,
      customer_service,
      rate_overall,
      suggestion,
    } = req.body;
    const data = await ServeyModel({
      full_name,
      factory_name,
      timely_manner,
      expected_timeline,
      customer_service,
      rate_overall,
      suggestion,
    });
    await data.save();
    res
      .status(201)
      .json({ message: "Survey created successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//read servey
exports.GetServeyResponse = async (req, res) => {
  try {
    const servey = await ServeyModel.find({}).sort({ createdAt: -1 });
    if (servey) {
      res.status(200).json({ message: "Success get servey response", servey });
    }
  } catch (err) {
    res.status(404).json({ error: "Failed to get servey" });
  }
};
