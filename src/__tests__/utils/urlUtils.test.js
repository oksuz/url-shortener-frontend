import config from "../../config";
import { getActualShortUrl } from "../../utils/urlUtils";

it('should return actual url', () => {
  let val = getActualShortUrl('http://www.google.com');
  expect(val).toBe('http://www.google.com');

  val = getActualShortUrl('test1234');
  expect(val).toBe('test1234');
});

it('should return path with API_URL', () => {
  let val = getActualShortUrl('/test1234');
  expect(val).toBe(config.API_URL + '/test1234');
})