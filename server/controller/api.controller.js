import {
  getApiDataService,
  postApiDataService,
} from "../service/api.service.js";

const getApiData = async (req, res) => {
  const getResponse = await getApiDataService();
  res.status(200).send(getResponse);
};

const postApiData = async (req, res) => {
  const postResponse = await postApiDataService(req.body);
  res.status(201).send(postResponse);
};

export { getApiData, postApiData };
