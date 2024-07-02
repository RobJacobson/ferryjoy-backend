import axios from "axios";
// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios

const WSF_KEY = "9e61c697-3c2f-490e-af96-72d4e8ecbc7e";
const DATE_START = 6;
const DATE_END = 19;

const toUrl = (endpoint: string) =>
  `https://wsdot.wa.gov/ferries/api/${endpoint}?apiaccesscode=${WSF_KEY}`;

// Axios transformer handler to revive the data using JSON.parse()
const wsfTransformer = (data: string) => JSON.parse(data, wsfReviver);

// Reviver function for JSON.parse() to import WSDOT datestrings
const wsfReviver = (key: string, value: any) => {
  if (typeof value === "string" && value.startsWith("/Date(")) {
    return toDate(value);
  }
  return value;
};

// Parses a WSDOT timestamp from Unix epoch time into a JS Date
export const toDate = (wsfDate: string) => {
  const dateStamp = wsfDate.slice(DATE_START, DATE_END);
  const secondsSinceEpoch = Number(dateStamp);
  return new Date(secondsSinceEpoch);
};

// Fetching function customized for the Wsf API.
export const fetchWsf = async (endpoint: string) => {
  try {
    const url = toUrl(endpoint);
    const results = await axios.get(url, {
      transformResponse: wsfTransformer,
    });
    // console.log(`Fetched ${JSON.stringify(results.data).length} bytes`);
    return results.data;
  } catch (err) {
    console.error(`Fetch error with endpoint: ${endpoint}`);
    console.error(err);
    return [];
  }
};
