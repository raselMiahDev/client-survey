const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    full_name: { type: String, required: true },
    factory_name: { type: String, required: true },
    timely_manner: { type: String, required: true },
    expected_timeline: { type: String, required: true },
    customer_service: { type: String, required: true },
    rate_overall: { type: String, required: true },
    suggestion: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const SurveyModel = mongoose.model("survey-response", DataSchema);
module.exports = SurveyModel;
