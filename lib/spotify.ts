import querystring from "querystring";

// const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_id = "ece9a0b860ed40238b8284e455de2d32";
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const client_secret = "ed1132dc52e74ce0b7b3847a05f35453";
// const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const refresh_token =
  "AQC26VuI0l6mYRyXnEBEjzBjkbFXhqSrTOOkAzK3rYOYP4PpKMs2qKorV6Hx8gr3067lhwlVm3FH6DeYOu3l5UW6dufPcFAwHUZAGnxBagKRLpIGHGT_zyDeqhOfIMDYuJU";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
