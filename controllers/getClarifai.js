const needle = require("needle");
// @desc GET / GET Response (bounding-box) From Clarifai
// @route /clarifai
// @access Public

exports.handleGetClarifaiResponse = async (req, res) => {
  try {
    const { input } = req.body;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      headers: {
        Accept: "application/json",
        Authorization: process.env.API_KEY,
      },
      body: raw,
    };

    needle(
      "post",
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
      requestOptions,
      (err, resp) => {
        console.log(resp.body);
        if (resp.statusCode === 200) {
          res.status(200).json(resp.body);
        } else {
          res.status(resp.statusCode).json(resp.statusMessage);
        }
        if (err) throw err;
      }
    );
    // .then((response) => {
    //   console.log(response);
    //   res.json(response);
    // })
    // .catch((err) => {
    //   res.status(400).json(err);
    //   console.error(err);
    // });
  } catch (err) {
    res.status(400).json("Something Went Wrong");
    console.error(err);
  }
};
