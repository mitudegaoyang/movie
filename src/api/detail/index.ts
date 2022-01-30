import request from "../../utils/request";

/**
 * @description 获取电影详情
 */
export function getMovieDetails(query: any) {
  return request({
    url: "/mock/movie_info",
    method: "get",
    params: query,
  });
}
